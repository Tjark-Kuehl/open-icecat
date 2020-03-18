![Open Icecat Logo](./open-icecat-logo.svg)
<h1 align="center">&nbsp;</h1>

<p align="center">
<img src="https://img.shields.io/github/issues/Tjark-Kuehl/open-icecat" alt="Issues">
<img src="https://img.shields.io/github/last-commit/Tjark-Kuehl/open-icecat" alt="Last Commit">
<img src="https://img.shields.io/github/license/Tjark-Kuehl/open-icecat" alt="License">
</p>

<p align="center">A simple tool to access the open icecat product information API. The Package is build with modern web technologies like fetch to have a small footprint and native performance. It also has some nice features like retrying when the request fails and some interfaces to make typescript development easier.</p>

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i open-icecat
```

## Declaration & Methods

```js
class OpenIcecat {
    constructor(baseParams: {});
    getProduct(options: GetProductOptions);
    getProductReviews(options: GetProductOptions);
    getProductRelatedProducts(options: GetProductOptions);
}
```

## Usage

### 1. Setup

```js
import { OpenIcecat } from 'open-icecat';

const oc = new OpenIcecat({
    username: 'your-username',
    lang: 'en'
});
```

### 2. Get a Product by Brand & Product Code

```js
(async () => {
    const res = await oc.getProduct({ Brand: 'hp', ProductCode: 'RJ459AV' });
    console.log(res);
})();
```

### 3. Get a Product by GTIN/EAN/UPC/JAN

```js
(async () => {
    const res = await oc.getProduct({ GTIN: '0882780751682' });
    console.log(res);
})();
```

### 4. Get a Product by icecat_id

```js
(async () => {
    const res = await oc.getProduct({ icecat_id: 1198270 });
    console.log(res);
})();
```

### 5. Change the language for a single request

```js
(async () => {
    const res = await oc.getProduct({ lang: 'en', Brand: 'hp', ProductCode: 'RJ459AV' });
    console.log(res);
})();
```

### License

Copyright © 2020, [Tjark Kuehl](https://github.com/Tjark-Kuehl)
Released under the [MIT License](LICENSE).
