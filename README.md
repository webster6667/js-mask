<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# MYLIBNAME

> description

[![npm version](https://badge.fury.io/js/MYLIBNAME.svg)](https://www.npmjs.com/package/MYLIBNAME)
[![](https://data.jsdelivr.com/v1/package/npm/MYLIBNAME/badge)](https://www.jsdelivr.com/package/npm/MYLIBNAME)


## Table of Contents

- [Quick start](#quick-start)
  - [Install](#install)
  - [Initialization](#initialization)
- [Methods](#methods)
  - [myFunc](#myFunc)

## Quick start

### Install

We support all platforms.

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i MYLIBNAME
```

#### Include with &lt;script&gt;

1. <a href="https://cdn.jsdelivr.net/npm/date-helper-js/dist/lib/MYLIBNAME.js" target="_blank">Download lib</a>
2. Add script to html

```html
<script src="MYLIBNAME.js"></script>
```

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/MYLIBNAME/dist/lib/MYLIBNAME.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/MYLIBNAME@0.0.0/dist/lib/MYLIBNAME.js"></script>
```

### Initialization

#### ES6

MYLIBNAME as an ES6 module.

```js
import { myFunc } from 'MYLIBNAME';

myFunc()

```

#### Node

MYLIBNAME as a Node.js module

```js
const { myFunc } = require('MYLIBNAME');

myFunc()
```

#### Browser

Exports a global variable called `GLOBALMYLIBNAME`. Use it like this

Connect to html file ```<script src="https://cdn.jsdelivr.net/npm/MYLIBNAME/dist/lib/MYLIBNAME.js" ></script>```

```html
<script>
    GLOBALMYLIBNAME.myFunc();
    or
    GLOBALMYLIBNAME();
</script>
```

#### AMD

MYLIBNAME as an AMD module. Use with Require.js, System.js, and so on.

1. <a href="https://cdn.jsdelivr.net/npm/MYLIBNAME/dist/lib/MYLIBNAME.js" target="_blank">Download lib</a>
2. Connect to your module loader

```js
requirejs(['MYLIBNAME'], function(GLOBALMYLIBNAME) {
    GLOBALMYLIBNAME.myFunc()
});
```

## Methods

### myFunc

Func description


#### Params
- `firstParam`
  - Type: `number`
  
- `secondParam`
  - Type: `Array.&lt;string&gt;`
  

#### Returns
- `boolean`

#### Example
```JS
myFunc(1,'example')
// => true
```



## Author

webster6667
