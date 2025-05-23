---
title: "Formal Methods vs. Plain Text Descriptions in Software Engineering"
description: "In software engineering, how we define system behavior can make the difference between a reliable application and one riddled with bugs."
---

## Introduction

In software engineering, how we define system behavior can make the difference between a reliable application and one
riddled with bugs. Two common approaches are:

1. Plain text descriptions (natural language, user stories).
2. Formal methods (mathematical modeling, logic-based specifications).

This post compares them and shows which one results in LLMs generating a better code when we input these descriptions.

## Plain Text Descriptions: The Agile Standard

Plain text descriptions use natural language to define requirements. Examples:

- User stories ("As a user, I want to log in to a service").
- Acceptance criteria ("The authorizations service must be able to handle 10,000 concurrent requests").

> [!note] Text Description Example
> User click on "add to cart" for a product.
> If user is logged in:
> - If there isn't any of the product type that the user has chosen, a new entry is added to the cart.
> - If the product type is already in the cart, the quantity gets incremented by one.
>
> If user is not logged in:
> - Show the user that they are not logged in, and they have to be logged in to continue.

```go
package main

import (
	"errors"
	"fmt"
)

type User struct {
	ID       string
	Username string
	LoggedIn bool
}

type Product struct {
	ID    string
	Name  string
	Price float64
}

type CartItem struct {
	Product  Product
	Quantity int
}

type Cart struct {
	userID string
	items  map[string]CartItem
}

type CartManager struct {
	carts map[string]*Cart
}

func NewCartManager() *CartManager {
	return &CartManager{
		carts: make(map[string]*Cart),
	}
}

func (cm *CartManager) GetCart(userID string) *Cart {
	if cart, exists := cm.carts[userID]; exists {
		return cart
	}

	cart := &Cart{
		userID: userID,
		items:  make(map[string]CartItem),
	}
	cm.carts[userID] = cart
	return cart
}

func (c *Cart) AddToCart(product Product) error {
	if item, exists := c.items[product.ID]; exists {
		item.Quantity++
		c.items[product.ID] = item
	} else {
		c.items[product.ID] = CartItem{
			Product:  product,
			Quantity: 1,
		}
	}
	return nil
}

func (c *Cart) GetItems() []CartItem {
	items := make([]CartItem, 0, len(c.items))
	for _, item := range c.items {
		items = append(items, item)
	}
	return items
}

func handleAddToCart(user *User, product Product, cartManager *CartManager) error {
	if !user.LoggedIn {
		return errors.New("please log in to add items to your cart")
	}

	cart := cartManager.GetCart(user.ID)
	return cart.AddToCart(product)
}
```

:::

This code is generated by `DeepSeek` (AI-generated, for reference only).

:::

## Formal Methods: Precision Through Math

Formal methods use mathematical logic to specify and verify systems.

> [!note] Formal Method Example
> Activity diagram (though UML is not exactly formal) for the textual description mentioned above:
> <img src="/images/formal-methods-activity-diagram.webp" alt="activity diagram" />

```go
package main

import (
	"errors"
	"fmt"
	"sync"
)

type User struct {
	ID       string
	Username string
	LoggedIn bool
}

type Product struct {
	ID    string
	Name  string
	Price float64
}

type CartItem struct {
	Product  Product
	Quantity int
}

type Cart struct {
	userID string
	items  map[string]CartItem
	mu     sync.Mutex // [!code ++]
}

type CartManager struct {
	carts map[string]*Cart
	mu    sync.Mutex // [!code ++]
}

func NewCartManager() *CartManager {
	return &CartManager{
		carts: make(map[string]*Cart),
	}
}

func (cm *CartManager) GetCart(userID string) *Cart {
	cm.mu.Lock() // [!code ++]
	defer cm.mu.Unlock() // [!code ++]

	if cart, exists := cm.carts[userID]; exists {
		return cart
	}

	cart := &Cart{
		userID: userID,
		items:  make(map[string]CartItem),
	}
	cm.carts[userID] = cart
	return cart
}

func (c *Cart) AddToCart(product Product) error {
	c.mu.Lock() // [!code ++]
	defer c.mu.Unlock() // [!code ++]

	if item, exists := c.items[product.ID]; exists {
		item.Quantity++
		c.items[product.ID] = item
	} else {
		c.items[product.ID] = CartItem{
			Product:  product,
			Quantity: 1,
		}
	}
	return nil
}

func (c *Cart) GetItems() []CartItem {
	c.mu.Lock() // [!code ++]
	defer c.mu.Unlock() // [!code ++]

	items := make([]CartItem, 0, len(c.items))
	for _, item := range c.items {
		items = append(items, item)
	}
	return items
}

func handleAddToCart(user *User, product Product, cartManager *CartManager) error {
	if !user.LoggedIn {
		return errors.New("please log in to add items to your cart")
	}

	cart := cartManager.GetCart(user.ID)
	return cart.AddToCart(product)
}
```

:::

This code is generated by `DeepSeek` (AI-generated, for reference only).

:::

## Key Differences at a Glance

| Aspect       | Plain Text                         | Formal Methods       |  
|--------------|------------------------------------|----------------------|  
| Precision    | Low (words vary)                   | High (logic)         |  
| Verification | Manual testing                     | Automated proofs     |  
| Best For     | Early requirements and prototyping | Safety-critical code |  
| Speed        | Fast                               | Slow but rigorous    |  
| LOC          | 81                                 | 93                   |
| Functions    | 5                                  | 5                    |
