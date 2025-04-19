---
title: "Formal Methods vs. Plain Text Descriptions in Software Engineering"
description: "In software engineering, how we define system behavior can make the difference between a reliable application and one riddled with bugs."
---

:::
stuff
:::

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

An example would be:

> [!caution] Text Description 
> When the `switch` is pressed:
> - If the light is off, it turns on.
> - If the light is on, it turns off.
> ```js
> const name = 12;
> ```
> > [!note] A note
> > haha
> 
> Initial state: off.


## Formal Methods: Precision Through Math

### What Are They?

Formal methods use mathematical logic to specify and verify systems. Examples:

- **Alloy** (lightweight modeling)
- **TLA+** (for distributed systems)
- **Z notation** (rigorous specs)

<div class="sidebar">
    Formal methods use mathematical logic to specify and verify systems. Examples:
</div>

### Example: Light Switch in Alloy

```
abstract sig State {}
one sig On, Off extends State {}

sig Light { state: State }

pred Init[l: Light] { l.state = Off }

pred Toggle[l, l': Light] {
  (l.state = On => l'.state = Off) and
  (l.state = Off => l'.state = On)
}

// Verify that toggling works
assert CorrectToggle {
  all l, l': Light | Init[l] and Toggle[l, l'] implies l'.state = On
}
check CorrectToggle
```  

### Pros & Cons

| ✅ **Advantages**                        | ❌ **Disadvantages**          |  
|-----------------------------------------|------------------------------|  
| No ambiguity (exact meaning)            | Steep learning curve         |  
| Automated verification (model checkers) | Overkill for simple features |  
| Catches design flaws early              | Slower to write initially    |  

## Key Differences at a Glance

| **Aspect**       | **Plain Text**     | **Formal Methods**   |  
|------------------|--------------------|----------------------|  
| **Precision**    | Low (words vary)   | High (logic)         |  
| **Verification** | Manual testing     | Automated proofs     |  
| **Best For**     | Early requirements | Safety-critical code |  
| **Speed**        | Fast               | Slow but rigorous    |  



## Conclusion

