# Typescript Framework-Consumer Recipe

This is a recipe creating a distributable library in NodeJS and use it in another NodeJS application.

[![Demo](https://i.vimeocdn.com/video/576178701_640x480.jpg)](https://vimeo.com/170933391)

## Motivation

I come from C#, Java and modern PHP. I was trying to use the CommonJS module system within TypeScript in a way
that I could have both typed classes and functions and be able to distribute a bunch of
classes (I like to call this a library) to be used in another project.

I usually am a fast learner but it took me quite an effort to understand this by, doing many stackverflow
conversations, hassling the Typescript team and reading the [Modules manual](https://www.typescriptlang.org/docs/handbook/modules.html) over and over to finally understand how to achieve this;

## What is in this repository

This repository contains two typescript projects:

- A project that is called `demo-framework`. This project will be packaged and distributed as a `npm` package.

- A project that is called `consumer`. This project will install the `demo-framework` with `npm install`
and use its functionality

## The Demo Framework

The demo framework exposes:

- A class called `Application`. This class is namespaced as `System.Application` and it does not do much really :)

- A class called `Package`. This class in namespaced as `npm.Package` and it has a shamefull implemnatation of reading
a `package.json`.

- Bunch of global members which can be found in `demo-framework.ts`

### How is the namespacing done

To have classes exposed in a C#-ish like namespaces. I used a file that has the same name as the desired namespace,
in this case `npm.ts` for the `npm` namespace and `system.ts` for the `System` (upper case S) namespace.
In the so called namespace file I re-exported classes that needed to go into that namespace.

```
/**
 * npm.ts acts as a namespace
 */

export { Package } from "./Package";
```

### Brining all namespaces togather.

In the framework project you can find a file called `demo-framework.ts`. This file is the main, or the enty-point
of our framework, **please not that this file has the same name as the npm package**

In imports the "namespace" files and re-exports them again.
```
// expose the Npm "namespace"
import * as npm from "./npm/npm";
export { npm };

// expose the System "namespace"
import * as System from "./system/system";
export { System };

```
The netto result of this can be seen in the `consumer` project.

### Package and Publish The Framework

Here the most important point to remember is to have the entry-point file of your framework be the same name as your
npm package. This is because Typescript emits `require('demo-framework)` when you use the `import` statement in the
consumer whcih results NodeJS to look for the `node_modules/demo-framework/dist/demo-framework.js`
**Then these names don't match, then your libarary will be load at runtime!!**

```
{
  "name": "demo-framework",
  "version": "1.0.23",
  "main": "dist/demo-framework.js",
  ......
  }
}
```

## The Consumer

In order to consume our demo-framework in an application first we need to publish it as a NodeJS package.

To do this I have used [Sinopia](https://github.com/rlidwka/sinopia). It is a private NPM repository that you can use to
host your own "private" packages. I did this because I did not want to pollute the "real" npm repository since the
rules of unpublishing packages are changed at npmreg.org.

```
npm install --save demo-framework
```

Next we need to tell the typescript compiler that we want to use the typings distributed with the `demo-framework` npm
package.

If I read the typescript manual correctly, [then you don't need to do much](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html), but since
I use other third-party packages in my consumer I like to use `typings` [Check it out here](https://github.com/typings/typings)

You can install the typings of the `demo-framework` like this:
```
cd consumer
typings install --save file:node_modules/demo-framework/dist/demo-framework.d.ts
```

And that should be it!.
