---
layout: post
title:  "An introduction to WebAssembly"
author: "Saeed Ghanavat"
date:   2019-02-03
categories: [WASM, Mono]
tags: [WASM, WebAssembly, Mono, .Net Framework]
commenting: open
excerpt_separator: <!--more-->
---

I think everyone or every beginner to WASM would be struggling a little bit to understand or make sense of it at the first place. This is including myself by the way.

<img class="post-image" src='\assets\imgs\wasm\wasm-1.jpg' alt='Saeed Ghanavat - Introduction to WASM' />

 <!--more-->

There are plenty different websites with similar topic as mine here. My goal is to give you guys very brief introduction to WASM. By all means you can refer to the <a href='https://webassembly.org/' target='_blank'>WebAssembly</a> website and learn more. If you like to delve into more technical discussion, refer to the <a href='https://developer.mozilla.org' target='_blank'>MDN</a> site and navigate to the WebAssembly topic.

If you've noticed anything wrong with this post, please leave a comment for me. I would be delighted to read your comments and reply to them.

# What is WASM?

WASM is a new type of code. It can be run in any modern browsers. You don't need to actually write WASM code, instead it's a compilation target for low-level source languages (WHAT???). On the other hand you compile your code to it. It has a small size, and therefore it's fast to load and run.

It's all about running native code in the browser. In all browsers, the code is interpreted by JavaScript engine which ONLY runs / executes JavaScript (I'm talking about the virtual machine that runs the Web app's code. OK?). So your browser doesn't execute any other languages. Right? For those of you who absolutely love JavaScript, WASM isn't intended as a replacement. Instead, it is designed to work alongside JavaScript. This will allow us developers to take advantages of both languages' powerful aspects.

As you know, every programming language gets translated to machine code in order to be executed by the processor. WASM however, has got nothing to do with that, despite its name. It's only designed for the browser.

Take a look at the below simple diagram. It's a high level picture of how WASM works:

![WASM high level diagram](/assets/imgs/wasm/WASM_HighLevel_Diagram.jpg)

Now with the WASM within the browsers, the virtual machine I have mentioned earlier, can now load and run two types of code, JavaScript and WASM. How cool is that!

# Why do we need it?

Simple answer, to bring more into the web. If you're implementing a web solution that would need to do a lot of calculations outside of the web, such as gaming, how easy is it to get that kind of performance from JavaScript? Not easy at all. JavaScript is meant to bring some interactivity to the web, while it's easy to learn and code. But, after years and years the list of stuff you could bring into the web started to expand. More rich web applications stepped into the web environment. That's the goal of WASM in my opinion. To allow you to bring more heavy stuff into the web. Such as video games, 3D rendering etc, by allowing you to execute native code in the browser.
