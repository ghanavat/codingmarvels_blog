---
layout: post
title:  "About Mono! An implementation of .Net Framework"
date:   2019-03-02 15:00:00
categories: Mono
tags: [WASM, WebAssembly, Mono, .Net Framework]
---

What is Mono?

Mono is an implementation of .Net Framework, sponsored by Microsoft, and yes it is open source in case you were wondering! It is a solution which allows developers to make cross platform applications. The main C# compiler of the Mono is MCS. 

-- About MCS:
According to <u><a href='https://www.mono-project.com/docs/about-mono/languages/csharp/' target='_blank'>Mono Project</a></u> documentatio page, MCS it written in C# and uses heavily the .Net APIs. It covers all the features for majority versions of C#, but only partial support for C# 7.0:

- Tuples
- Discards
- Out variables declaration
- Ref returns and locals
- Expression-bodied constructors, finalizers and accessors
- Throw expression
- Binary Literals
- Digit Separators
- Generalized async return types
- Default literal expressions
- Non-trailing named arguments
- ref struct
- Readonly struct
- Pattern matching (limited to simple usage)

As Scott Hanselman mentioned it too, there is more than one .Net instance today. It is not the same as what it was in the past anymore when you would only install .Net on your Windows. We have .Net Core in Docker, Mac, it's even on my Raspberry Pi where I run my own mail server, and as well as Mono.

It is good to know that this project wasn't supported by Microsoft itself from the beginning. It was previously supported by Xamarin and later by Microsoft and now the advocate of open source .Net, <u><a href='https://www.dotnetfoundation.org/' target='_blank'>.Net Foundation</a><u> too. It is also good to know that Xamarin founded in May 2011 by the creators of Mono, so it wasn't Microsoft baby at the first place. 

I'm sure you are aware that as a developer, you can use Xamarin tools to write Android (Xamarin.Android, previously <b>Mono for Android</b>), iOS (Xamarin.iOS, formerly <b>MonoTouch</b>) and OF COURSE Windows apps. Microsoft noticed that it is time to acquire this ambition project. It was Feb 2016 when Microsoft announced that Xamarin has been acquired. At the time, Xamarin had 15,000 customers in 120 countries, as well as top enterprised such as Coca-Cola, JetBlue been using Xamarin. I don't know the exact figure, but the purchase price was between $400 and $500 million. They (Xamarin people) have raised $82 million in investment capital, and this is for sure one of the main reasons Microsoft wanted to acquire this project. Microsoft and Xamarin been working alongside each other for a long time before the acquisition took place.

- How to use it?

You can download Mono from their official website <u><a href='https://www.mono-project.com/download/stable/' target='_blank'>here</a></u>. Please note that this project doesn't directly provide an IDE as such. You should choose from the toold that best suited for you. 

One way to experience Mono and write code using it is through the MonoDevelop IDE. It's a free GNOME IDE. You can find it here, <u><a href='https://www.monodevelop.com/' target='_blank'>MonoDevelop</a></u>, an IDE for Windows, Linux and macOS, and provides development environment for Mono.

For the sake of the re-usability, please navigate to the <u><a href='https://www.monodevelop.com/' target='_blank'>MonoDevelop</a></u> website. And then navigate to the download page where you will find a link to the 'building guide'. You will notice that MonoDevelop for Windows is only available through the source! It very easy, clone the GitHub project into a directory on your Windows machine, then navigate to main folder and open Main.sln and build the solution. Remember, you MUST have the prerequisites ready and installed on your machine first.

Once the solution is built successfully, rund the monodevelop.exe from \main\build\bin directory. This is how MonoDevelop can be used for Windows, directly from the source. Below is the main screen of MonoDevelop IDE:

![MonoDevelop startup page](/assets/imgs/MonoDevelop.jpg)

Using this IDE you can take full advantage of the framework. I leave you guys alone with this IDE. If you are having issues building the solution, make sure you're doing so through the 'winbuild.bat' file located in \main directory. Leave comments below if you are experiencing issues and need help.

Another way to experience Mono is very basic and through Command Prompt. Mono-project website has plenty example on how to write code using Mono. You can find more <u><a href='https://www.mono-project.com/docs/getting-started/mono-basics/' target='_blank'>here</a></u>

- Relationship with Blazor

Being written...