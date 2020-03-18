import { IIcecatProduct } from './icecatApi/IIcecatProduct';
import { IIcecatRelatedProducts } from './icecatApi/IIcecatRelatedProducts';
import { IIcecatProductReviews } from './icecatApi/IIcecatProductReviews';

export interface IIcecatResponse
    extends IIcecatProduct,
        IIcecatProductReviews,
        IIcecatRelatedProducts {
    ProductStory?: [];
    DemoAccount?: boolean;
    ContentErrors?: [string];
}
