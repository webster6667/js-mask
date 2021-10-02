<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# js-mask

> mask on clear js, which you can use on frontend and backend, on string or dom element

[![npm version](https://badge.fury.io/js/js-mask.svg)](https://www.npmjs.com/package/js-mask)
[![](https://data.jsdelivr.com/v1/package/npm/js-mask/badge)](https://www.jsdelivr.com/package/npm/js-mask)


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
npm i js-mask
```

#### Include with &lt;script&gt;

1. <a href="https://cdn.jsdelivr.net/npm/js-mask/dist/lib/js-mask.js" target="_blank">Download lib</a>
2. Add script to html

```html
<script src="js-mask.js"></script>
```

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/js-mask/dist/lib/js-mask.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/js-mask@0.0.0/dist/lib/js-mask.js"></script>
```

### Example

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
