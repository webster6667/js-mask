<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# js-text-mask

> mask on clear js, which you can use on frontend and backend, on string or dom element

[![npm version](https://badge.fury.io/js/js-text-mask.svg)](https://www.npmjs.com/package/js-text-mask)
[![](https://data.jsdelivr.com/v1/package/npm/js-text-mask/badge)](https://www.jsdelivr.com/package/npm/js-text-mask)


## Table of Contents

- [Quick start](#quick-start)
  - [Install](#install)
  - [Initialization](#initialization)
- [Methods](#methods)
  - [unmask](#unmask)
  - [mask](#mask)

## Quick start

### Install

We support all platforms.

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i js-text-mask
```

#### Include with &lt;script&gt;

1. <a href="https://cdn.jsdelivr.net/npm/js-text-mask/dist/lib/js-text-mask.js" target="_blank">Download lib</a>
2. Add script to html

```html
<script src="js-text-mask.js"></script>
```

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/js-text-mask/dist/lib/js-text-mask.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/js-text-mask@0.0.0/dist/lib/js-text-mask.js"></script>
```

### Demo

<a href="https://codesandbox.io/s/pedantic-drake-07hym?file=/src/App.js" target="_blank">see demo</a>

## Methods

### unmask

will clean text from mask, and return clear value


#### Params
- `maskedText`
  - Type: `string`
  - Description: text for mask
- `maskSettings`
  - Type: `maskSettingsProps`
  - Description: setting for covering mask

#### Returns
- `string`



### mask

covering value to mask, relative settings


#### Params
- `textForMaskInput`
  - Type: `string`
  - Description: text for mask
- `maskSettings`
  - Type: `maskSettingsProps`
  - Description: setting for covering mask

#### Returns
- `string`




## Author

webster6667
