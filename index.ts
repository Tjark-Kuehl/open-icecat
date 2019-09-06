import { ApiClient } from './classes/ApiClient';
import { IRequestOptions } from './interfaces/IRequestOptions';
import { GetProductOptions } from './types/GetProductOptions';

/**
 * Open Icecat API - Find product description with EAN, UPC or GTIN-13 with full typescript support
 */
export class OpenIcecat {
    private apiClient: ApiClient;

    public constructor(baseOptions: IRequestOptions, private debug: boolean = false) {
        this.apiClient = new ApiClient(
            'https://live.icecat.biz/api/?Content=GeneralInfo,Image,Multimedia,Gallery,FeatureLogos,Descriptions',
            baseOptions,
            debug || false
        );
    }

    /**
     * Gets icecat product data
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<any>} Api response
     * @memberof OpenIcecat
     */
    public async getProduct(options: GetProductOptions): Promise<any> {
        return this.formatResponse(await this.apiClient.get('', { body: options }));
    }

    /**
     * Gets only the icecat product reviews
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<any>} Api response
     * @memberof OpenIcecat
     */
    public async getProductReviews(options: GetProductOptions): Promise<any> {
        return this.formatResponse(
            await this.apiClient.get('?Content=ReasonsToBuy,Reviews', {
                body: JSON.stringify(options)
            })
        );
    }

    /**
     * Gets only the icecat products related products
     *
     * @param {GetProductOptions} options Brand + ProductCode, GTIN, icecat_id
     * @returns {Promise<any>} Api response
     * @memberof OpenIcecat
     */
    public async getProductRelatedProducts(options: GetProductOptions): Promise<any> {
        return this.formatResponse(
            await this.apiClient.get('?Content=Related', { body: JSON.stringify(options) })
        );
    }

    /**
     * Formats the response ands checks if needed data is present
     *
     * @private
     * @param {*} response Icecat api response
     * @returns {Promise<any>} Unpacked data or empty object
     * @memberof OpenIcecat
     */
    private async formatResponse(response: any): Promise<any> {
        if (response) {
            if (this.debug && 'statusCode' in response && 'message' in response) {
                console.log(response.message);
            }
            if ('msg' in response && 'data' in response) {
                if (response.msg === 'OK') {
                    return response.data;
                }
            }
        }
        return {};
    }
}
