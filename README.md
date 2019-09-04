# open-icecat

A simple tool to access the open icecat product information api

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i open-icecat
```

## Declaration & Methods

```js
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

// You have the option to completely modify the request.
// OpenIcecat accepts the following options and
// will set them as the default for any following request.
interface IApiClientOptions {
    body?: {};
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

Copyright © 2019, [Tjark Kuehl](https://github.com/Tjark-Kuehl)
Released under the [MIT License](LICENSE).
