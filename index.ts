import { ApiClient } from './classes/ApiClient';
import { IApiClientOptions } from './interfaces/IApiClientOptions';
import { GetProductOptions } from './types/GetProductOptions';

export class OpenIcecat {
    private apiClient: ApiClient;

    public constructor(baseOptions: IApiClientOptions, private debug: boolean = false) {
        this.apiClient = new ApiClient(
            'https://live.icecat.biz/api/?Content=GeneralInfo,Image,Multimedia,Gallery,FeatureLogos,Descriptions',
            baseOptions,
            debug || false
        );
    }

    public async getProduct(options: GetProductOptions) {
        return this.formatResponse(await this.apiClient.get('', { body: options }));
    }

    public async getProductReviews(options: GetProductOptions) {
        return this.formatResponse(
            await this.apiClient.get('?Content=ReasonsToBuy,Reviews', { body: options })
        );
    }

    public async getProductRelatedProducts(options: GetProductOptions) {
        return this.formatResponse(await this.apiClient.get('?Content=Related', { body: options }));
    }

    private async formatResponse(response: any) {
        if (response) {
            if ('statusCode' in response && 'message' in response && this.debug) {
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
