<p align="center" style="text-align: center;">
  <img src="https://github.com/Tjark-Kuehl/open-icecat/blob/master/open-icecat-logo.svg?raw=true" alt="Open Icecat Logo" width="128" height="128">
</p>
<h1 align="center">open-icecat</h1>
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
interface IRequestOptions {
    body?: object;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: any;
}

class OpenIcecat {
    constructor(baseOptions: IApiClientOptions, debug?: boolean);
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
    body: {
        username: 'your-username',
        lang: 'de'
    }
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
