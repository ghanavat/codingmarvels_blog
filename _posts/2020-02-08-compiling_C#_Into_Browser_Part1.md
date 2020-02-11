---
layout: post
title:  "Compiling C# into browser - Part 1"
date:   2020-02-12 09:00:00 +0000
categories: [Mono, .Net]
tags: [Mono, .Net, WebAssembly]
commenting: open
excerpt_separator: <!--more-->
---
<br>
It has been quite a while since Grace Hopper and her team developed the first compiler back in 1952. She was the one who conceived an idea of developing a new programming language close to English words, which was led to the implementation of COBOL. Her work was continued on developing the compiler as a part of COBOL programme which was able to translate codes written in COBOL (as English statement) into machine code. Before, it was all done by symbol manipulators, and not many people could do that at that time. 

Why did I put this here? Just to appreciate how far we have come since first compiler was coined.

![Compiling C# into browser - Part 1 - codingmarvels.com](/assets/imgs/compilingCsharpPart1/compiler_post_part1.jpg "Compiling C# into browser - Part 1")
<!--more-->

I have started a series of articles focusing on something I have never focused before! the mechanism of compiling C# into the browser, as per the title here. I wanted to learn how it works and I wanted to learn the details of how it works. It all started when I learnt about Blazor. There is a lot to cover and talk about, so I decided to break the topics into a few different parts. Each part will focus on a different aspect of the main topic.

This part will be about the over view of the compilation milestone. To do this accurately, I would need to start from the beginning, I mean the history and where things began. I hope you will enjoy reading it, I certainly did! I will try to explain all new terminologies as soon as they have been mentioned in a short paragraph.

Blazor compiles C# code via something. There should be something, right? WebAssembly, I have talked about it here, please make sure you are familiar with it before continue reading this article.

As mentioned on my previous post about [Blazor introduction]({% post_url 2019-03-02-blazorIntro %}), there are two type of hosting models for Blazor, client-side application, known as Blazor WebAssembly these days and server-side application, known as Blazor Server. We are talking about Blazor WebAssembly in these series of articles. This means, hosting your application on the client-side. If you are not sure what I am talking about, this is it; this is the moment that you have realised that you are going to struggle a bit to understand the context going further! Please visit my previous post as mentioned, [Blazor introduction]({%post_url 2019-03-02-blazorIntro%}) and read every word, and then come back.

# The beginning

Everything started with an experimental project to bring Mono to the WebAssembly platform. The aim was to build C# applications into WebAssembly, by using Mono and to compile the whole application into one <ins>.wasm</ins> file. This was one of the prototypes, which had produced one large statically compiled .wasm file. When I say large I mean around 10MB for a very small or a sample application. If we were to use this method for a larger web application, the size would be much larger.

>#### What the heck is static compilation?
>
>Static compilation is the traditional compilation mode of Mono which compiles both Mono C runtime and its class libraries into WebAssembly. I will talk more about static compilation, throughout this article, as it is an important part of the story.

The second prototype compiled only Mono C runtime without its class libraries into WebAssembly and then used IL (Intermediate Language) interpreter to run managed code. Although the download size of .wasm file for the browser was much smaller (still not fully optimised though), there was another big challenge ahead, the performance. How did this actually happen? You may also wonder what IL interpreter is too. Alright, bit by bit!

IL interpreter appears to be in between step when your code is being compiled into machine code (assembly language). Basically its job is the same as a compiler; translates high-level code into machine code ***DURING*** the run time of the application; however a compiler does it before the application is executed.

# Bootstrapping

The main target was still bringing Mono to the WebAssembly. It began when Mono developers wrote their own interpreter for .Net, called mint. This interpreter meant to be a temporary solution until a Just-in-Time (JIT) compiler they were working on was ready.

If you are familiar with bootstrapping, then you are fine, you know what I mean. But if you are not, bootstrapping is self-starting process. In this scenario, when Mono developers were developing Just-in-Time (JIT) compiler, it obviously needed to be compiled too, but there was nothing to compile it (on the other hand, it needed to compile itself). So, they wrote mint in order to compile JIT that they were writing.

The interpreter, mint, remained active and continued to exist alongside JIT as it was being written, until the day JIT engine was fully functional. As mint only written to serve one purpose, it never evolved or upgraded, which had brought new challenges onto the field.

They (Mono engineers and developers obviously) could not cope with the engineering cost, especially when <em>generics</em> were introduced by Microsoft. The interpreter, mint, could not deal with generics, because it was not up-to-date and did not have what was necessary to understand and emit code for generic methods and classes. This had led to the birth of their full static compiler of .Net code.

I have mentioned generics; I hope it did move something in you by mentioning it abruptly! Something like:

<em>What the hell is ‘generics’? Or <br></em>
<em>What???? ‘generics’? Let us google it!</em>

>Parametric polymorphism, also known as ***generics*** is an important feature of the C# programming language and also the .Net Common Language Runtime (CLR) that underpin C# and other languages. I personally cannot imagine C# language without generics. This feature introduces type parameters to .Net. To simplify it, you can design classes and methods that have different specification until they are instantiated. Still not clear? Take a look at the code below:
>
>>
```c#
public class Generic<T>
{
    public T Field;
}
```

I confess that I did not understand why Mono interpreter, mint, failed to compile generics, which had led to its end of duty. I was genuinely reluctant to continue writing this article until I was satisfied and it was clear to me first before I put it here.

For a compiler or interpreter, being able to translate generic methods and classes, it must change a lot to make room for generics. This is because they touch so many parts of the code we write. The interpreter, mint was written for bootstrapping, definitely not a capable interpreter to be able to easily adapt to the new changes, yet! Even for the JIT, tremendous amount of extra work was needed, because additional IL Instructions were necessary to be implemented, in order to enable JIT to access the extra information it needed to produce code for generic methods.

# Static compilation

Mono continued contriving, and was trying to find a solution to handle absence of generics, and a stronger compilation technology, in my opinion.
In 2017 they have introduced another compilation package of .Net code, static compilation. Rings the bell? I have briefly touched static compilation at the beginning of this article when I was talking about the experimental projects of bringing Mono to the WebAssembly. This was to target platforms without dynamic code generation. It is a great piece of technology especially for gaming consoles; however, it had/has issues. Because it is a static compilation, new executables has to be re-created every time the code was getting updated. 

This was an impractical compilation tactic for gaming consoles and perhaps many other platforms. Why? Because, static compilation does not have the ability to support dynamic code generation. It compiles the whole source code into the machine code at once before the application is executed.

The lack of dynamic support still was a bummer. Frankly, Mono was missing many interesting uses of .Net. This was another small sub-topic that I could not understand properly. Bringing Mono into WebAssembly was not the only project at that time. It was being used in many other projects; Such as, for the first time programmers were able to develop games for Xbox and PlayStation. The issue with the absence of dynamic capabilities was preventing game developers to adjust and tweak their code without having to re-compile the whole project.

If you have heard of Continues IDE (Link), you know exactly how important the support of dynamic programming was for Mono. When Frank Krueger was building his Continues IDE he wanted to have the ability of dynamic support, Mono was not going to be an option as per the lack of dynamic support. So, he had to write his own interpreter using F# to compile the code.

There is something popped into my head as I was writing the above paragraph, I think it is important to mention it here. In relation to Mono, the interpreter was playing a big role. Why?

The interpreter translates the code line by line during the execution. This means, the debugging would be much easier as you are able to make changes while the code is being translated. This is the main reason that they have decided to re-visit the issues they have faced at the beginning. The static compiler was not going to play the game as well alone.

# New Interpreter

In late 2017, the old interpreter was given a new life. Its lack of .Net support was upgraded and the support for generics which was a challenge for the developers back in 2001 was added. The new Mono interpreter is now one of the ways that it runs on WebAssembly.

With the interpreter in a good shape, and JIT ready to be plugged in, Mono started introducing their Mixed Mode Execution. With this technique, interpreter will either be mixed with statically compiled code (AOT), or Just-in-Time (JIT) compiled code. The issue with the lack of dynamic support was solved.

To be continued …