import { IIcecatProduct } from '@/interfaces/icecatApi/IIcecatProduct';
import { IIcecatProductRelatedProducts } from '@/interfaces/icecatApi/IIcecatProductRelatedProducts';
import { IIcecatProductReviews } from '@/interfaces/icecatApi/IIcecatProductReviews';

export interface IIcecatResponse
    extends IIcecatProduct,
        IIcecatProductReviews,
        IIcecatProductRelatedProducts {
    ProductStory?: [];
    DemoAccount?: boolean;
    ContentErrors?: [string];
}
