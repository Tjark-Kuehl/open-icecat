import { IIcecatProduct } from './icecatApi/IIcecatProduct';
import { IIcecatProductRelatedProducts } from './icecatApi/IIcecatProductRelatedProducts';
import { IIcecatProductReviews } from './icecatApi/IIcecatProductReviews';

export interface IIcecatResponse
    extends IIcecatProduct,
        IIcecatProductReviews,
        IIcecatProductRelatedProducts {
    ProductStory?: [];
    DemoAccount?: boolean;
    ContentErrors?: [string];
}
