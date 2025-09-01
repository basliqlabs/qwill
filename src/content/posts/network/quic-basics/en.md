---
title: 'Why Did Google Build QUIC?'
description: 'The story of how Google hacked around the limits of TCP—and ended up reshaping the internet.'
publishDate: '2025-09-01'
coverImage:
  src: '/images/cover-quic-basics-en.webp'
  alt: 'Photo by Gidon Wessner on Unsplash'
category: 'network'
collections: ['network', 'protocols', 'web', 'google']
authors: ['atareversei']
draft: false
outdated: false
external: false
fire: false
---

> [!WARNING] Quick note:
> This post is meant to be simple and digestible, not 100% textbook-accurate.

## TCP Just Couldn’t Keep Up

About **15 years ago**, Google ran into a wall. Search and YouTube were exploding, but TCP — the backbone of the web — was slowing them down.

Now, TCP _is_ the internet standard. Messing with it isn’t exactly like changing your code editor. Even the tiniest tweak means updating routers, switches, firewalls, servers… basically the entire backbone of the web. Not realistic.

So what do you do when the foundation of the web itself is too rigid? You get creative.

## Google’s Hack: Build a Protocol on UDP

You can’t touch the lower layers of the network, but you _can_ innovate higher up. That’s where Google played its card.

Enter **QUIC** — built on top of UDP. UDP is insanely fast, but it’s also “dumb.” It doesn’t care if packets arrive, get lost, or arrive out of order. QUIC had to build all the reliability features itself.

At this point, you might ask: _“Wait, if QUIC is just TCP rebuilt on UDP, why not call it TCP 2.0?”_

Because TCP is far from perfect. It was designed in the **1980s**, in a world that had no YouTube, no Netflix, no Zoom calls. QUIC gave Google a clean slate to design for today’s internet.

And here’s the kicker: since TCP lives deep in the operating system, evolving it is slow and painful. QUIC, however, lives at the software level. That means Google can ship updates, experiment, and innovate at software speed.

## What Makes QUIC Different

### Independent Streams, No More Freezing

TCP has a single queue. If one packet gets stuck, the whole connection freezes.

QUIC? Multiple parallel streams. One packet gets lost? No problem — the rest of the data keeps flowing.

### Faster Handshakes

Setting up a TCP + TLS connection can take up to **7** round trips. Imagine your request bouncing across the planet seven times before anything happens.

QUIC collapses that whole mess into **3** round trips. Less waiting, less lag.

![Seven back-and-forths across the globe quickly turn into painful delays.](/images/tcp-tls-handshake-rtt.webp)

### Smart Design Tricks

QUIC also sneaks in clever details:

- **Connection IDs instead of IP + Port.** Switch from Wi-Fi to mobile data mid-stream? Your connection stays alive.
- **Session resumption.** If you’ve connected before, QUIC can skip the handshake entirely — down to _zero_ round trips.

## From Google’s Hack to Internet Standard

Google poured billions into QUIC, rolled it out in Chrome, Search, and YouTube, and saw huge performance wins. Then they open-sourced it, paving the way for standardization.

Fast forward: HTTP/3 is now built on QUIC. And today, around **25% of all internet traffic** runs on it.

## Coming Up Next

Google hits internet-scale problems before anyone else — and often ends up inventing solutions that later become industry standards.

In the next post, I’ll zoom in on QUIC’s origin story: how exactly Google decided, “Yeah, let’s build our own transport protocol.”
