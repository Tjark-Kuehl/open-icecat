import { IIcecatRelatedProducts } from './interfaces/icecatApi/IIcecatRelatedProducts';
import { IIcecatProductReviews } from './interfaces/icecatApi/IIcecatProductReviews';
import { IIcecatResponse } from './interfaces/IIcecatResponse';
import { GetProductOptions } from './types/GetProductOptions';

import { objectToQueryString } from './inc/queryString';
const ky = require('ky-universal');

/**
 * Open Icecat API - Find product description with EAN, UPC or GTIN-13 with full typescript support
 */
export class OpenIcecat {
    private api: typeof ky;

    public constructor(private baseParams: {}) {
        this.api = ky.create({
            prefixUrl: 'https://live.icecat.biz/api/',
            throwHttpErrors: false
        });
    }

    /**
     * Combines the get parameters with the base searchParams
     * @param params Get parameters
     */
    private combineParams(params: {}, additionalParams: {} = {}): {} {
        return {
            ...this.baseParams,
            ...params,
            ...additionalParams
        };
    }

    /**
     * Gets icecat product data
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<IIcecatResponse>} Api response
     * @memberof OpenIcecat
     */
    public async getProduct(options: GetProductOptions): Promise<IIcecatResponse> {
        return this.parse(this.api.get(objectToQueryString(this.combineParams(options))));
    }

    /**
     * Gets only the icecat product reviews
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<IIcecatProductReviews>} Api response
     * @memberof OpenIcecat
     */
    public async getProductReviews(options: GetProductOptions): Promise<IIcecatProductReviews> {
        return this.parse(
            this.api.get(
                objectToQueryString(
                    this.combineParams(options, { Content: 'ReasonsToBuy,Reviews' })
                )
            )
        );
    }

    /**
     * Gets only the icecat products related products
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<IIcecatRelatedProducts>} Api response
     * @memberof OpenIcecat
     */
    public async getProductRelatedProducts(
        options: GetProductOptions
    ): Promise<IIcecatRelatedProducts> {
        return this.parse(
            this.api.get(objectToQueryString(this.combineParams(options, { Content: 'Related' })))
        );
    }

    /**
     * Parses the response ands checks if needed data is present
     *
     * @private
     * @param {*} response Icecat api response
     * @returns {Promise<{}>} Unpacked data or empty object
     * @memberof OpenIcecat
     */
    private async parse(response: any): Promise<any> {
        const res = await response.json();
        if (res?.data && res?.msg === 'OK') {
            return res.data;
        }

        // Catch error
        if (res.statusCode && res.statusCode === 8) {
            throw new Error(`cannot access 'full icecat' products`);
        }

        return {};
    }
}
