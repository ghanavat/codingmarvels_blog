---
layout: post
title:  "About Blazor, a game changer platform"
author: "Saeed Ghanavat"
date:   2019-03-02 16:00:00
categories: [Mono, Blazor, WASM]
tags: [Blazor, WASM, WebAssembly, Mono, .Net Framework]
excerpt_separator: <!--more-->
commenting: open
---

If you are landing on this post from the previous one(s), you are familiar with WASM and Mono, hopefully! In the previous post where I have introduced Mono, [About Mono! An implementation of .Net Framework]({% post_url 2019-03-02-monoIntro %}), you have noticed that I didn’t take it any further than ‘How to Use it’. Well, this is because I thought that this topic deserves its own accommodation. So here we are!
<!--more-->
# What is Blazor?

It’s a new awesome SPA framework that enables you to run .Net code in web browsers, as simple as that. You are not limited to JavaScript anymore!

When I first heard of it, like any other smart developer I used the power of google to find out more. No hang on a minute, I promised myself to use other search engines as well. Only to see how good they are and to appreciate Google more! So I used _Bing_ instead. Anyways

I went straight to the Docs page, I didn’t want to start programming with it; I wanted to learn what it was first. I landed on a page where it was introducing Blazor and what are the benefits etc. Then I bumped into Mono there. I remember that the description was something like this: _‘Blazor uses WebAssembly and Mono to bring the .Net into the browsers’_. Might not be exactly the same as that, but something like that more or less. Yet, the work Mono has now been removed and the entire page has been reworded. That was when I decided to look into this and had to investigate and find out more about Mono and WASM. And that’s why I have decided to write two separate posts for each of them. In case you want to review them:

- [An introduction to WebAssembly]({% post_url 2018-12-26-wasmIntro%})

- [About Mono! An implementation of .Net Framework]({% post_url 2019-03-02-monoIntro %})

Blazor is running under WASM. It’s a framework that we have all probably been waiting for. Something that could bring the power of the .Net straight to the browsers as a Single Page Application framework. I have mentioned in my previous post that there is more than one instance of the .Net these days (Scott Hanselman said it first by the way). When Steven Sanderson first conceived of the idea of Blazor, he sliced through _DNA_, <a href="https://github.com/chrisdunelm/DotNetAnywhere?WT.mc_id=-blog-scottha"  target="_blank">DotNetAnywhere</a> project. It's another instance of .Net Framework, written by Chris Dunelm many years ago! I don’t know why he didn’t take it more seriously, as it could be more sophisticated and famous than Mono. But that’s out of the scope of this article here. 

So yes, Blazor built upon DNA at the first place. But, as I mentioned earlier, it was first written years before Blazor was founded. Its features are outdated a not been updated often and it has some known bugs. Blazor had to find a robust solution, as the DNA limitations started to become an issue. It was time for Blazor project to migrate into another platform, in order to have a higher chance of success. Blazor now has migrated to Mono which is a fully up to date .Net runtime, based on the current .Net ecosystem.

If you were following my other posts, [About Mono! An implementation of .Net Framework]({% post_url 2019-03-02-monoIntro %}), you have surely read that Mono has partial support of C# 7.0. And it supports all features of previous versions.

In the past, it was impossible to run the .Net code inside web browsers. If your plan was to implement a SPA web application, you would use one of the platforms such as _React,_ or _Angular_. Today, Blazor enables us to write SPA along with Razor. It’s not as easy though, if you think about it, to be able to achieve that we need a lot of other dependencies. That’s why DNA wasn’t a good approach anymore. The runtime should be solid and up to date with the current .Net ecosystem. It’s great that Blazor is now part of ASP.Net project. Because all significant modules such as Unit Testing, UI stuff and many more can be provided.

# How does it work?

Again it’s very easy on the paper. Take a look at the image below:
 
![Client-Side Blazor diagram](/assets/imgs/BlazorIntro/Blazor_ClientSideModel.jpg)

Did you understand what it is saying? I didn’t. In my view, this image is rather vague and unclear. Let me open it up a bit for you guys. First, let me remind you of this, Blazor is powered by C# (I hope it’ll support other programming languages) and Razor.

Remember Mono? Cool. Mono engineers and developer are busy working on bringing the .Net runtime to the web using WASM. <a href="https://www.mono-project.com/news/2018/01/16/mono-static-webassembly-compilation/" target="_blank">You can read more about it here</a>. Blazor builds on their work to create a rich client-side (and server-side!) SPA using .Net.

### Client-Side Blazor

The image above shows one way you can host Blazor app in a browser, client-side hosting model. Using this model, Blazor runs under Mono WASM. In other word, client-side Blazor, builds a _render-tree_ using Mono runtime. It is then sent to JavaScript to update the DOM.

Using this hosting model, the whole .Net runtime (Mono runtime), the app and all its dependencies will be downloaded in a browser. This model has its own pros and cons. From my perspective, one of the greatest benefits of this model is its offline ability. This means that you can consider service workers. 

![Different Blazor Apps](/assets/imgs/BlazorIntro/BlazorHostingModelsApps.jpg)

### Server-Side Blazor

There is also another way of hosting your Blazor app. On 7th of August 2018, Daniel Roth has introduced a new execution model for Blazor. It's called server-side Blazor. This model runs under a native .Net Core process. Your app is hosted on ASP.Net Core. All UI updates, event handling, and JavaScript calls are handled via SignalR connection. In this model, _render-tree_ gets built on the server-side. And then it's get serialised to the browser using SignalR communication. The benefit of this is almost obvious. Smaller app size than the client-side model, thus it’s faster. This is because your application does not need to download _mono.wasm_ anymore.

But, there is no offline support. This is sad for me because I love the idea of offline support. Developers can run scheduled tasks and perform synchronisation. But unfortunately, there is no offline support. Although the benefits are great, i.e. existing .Net tooling, like debugging works as normal.

Take a look at the image below. I hope it would wrap up how server-side hosting model would work:

![Server-Side Blazor diagram](/assets/imgs/BlazorIntro/ServerSide_Blazor.png)

Please also take a look at the image below. This is how your _Startup.cs_ class looks like. The highlighted rectangular is how server-side Blazor is added to the service collection.

![Server-Side Startup.cs](/assets/imgs/BlazorIntro/ServerSide_Startup.jpg)

To register the server-side Blazor, you must _UseServerSideBlazor_, in the _Configure_ method. Take a look at the image below:

![Registering Server-Side Blazor](/assets/imgs/BlazorIntro/Registering_ServerSide_Blazor.jpg)

I am working on another article which would explain how Mono runtime compilation works. It’s amazing, trust me.

My goal by writing this article was to give you a high-level view of what Blazor is. Also to clarify where it’s come from and what it is intended to do. I hope that you have learned about client-side and server-side Blazor and know the pros and cons of each. There are plenty of websites and blogs where you can read and learn about this new technology. You can also visit ASP.NET website as I mentioned, Blazor is now part of the ASP.NET project.

If there is anything wrong with this post, and if you need more information, please leave comments below. It’ll be my pleasure to have a conversation here with you guys.
