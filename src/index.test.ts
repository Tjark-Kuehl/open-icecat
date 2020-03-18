import { OpenIcecat } from './index';

const baseBody = {
    username: 'icecat',
    lang: 'de'
};

describe('OpenIcecat class', () => {
    describe('Initialize OpenIcecat class', () => {
        it('Should initialize the class correctly', () => {
            const oi = new OpenIcecat(baseBody);
            expect(typeof oi).toBe('object');
        });
    });

    describe('Get a product by brand and productCode', () => {
        it('Should receive product informations', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProduct({ Brand: 'hp', ProductCode: 'RJ459AV' });
            expect(res.GeneralInfo).toBeDefined();
        });
    });

    describe('Get only product reviews by brand and productCode', () => {
        it('Should only receive product reviews', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProductReviews({ Brand: 'hp', ProductCode: 'RJ459AV' });
            const objectKeys = Object.keys(res);
            expect(objectKeys).toHaveLength(3);
            expect(objectKeys).toContain('ReasonsToBuy');
            expect(objectKeys).toContain('Reviews');
            expect(objectKeys).toContain('DemoAccount');
        });
    });

    describe('Get only product related products by brand and productCode', () => {
        it('Should only receive related products', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProductRelatedProducts({ Brand: 'hp', ProductCode: 'RJ459AV' });
            const objectKeys = Object.keys(res);
            expect(objectKeys).toHaveLength(2);
            expect(objectKeys).toContain('ProductRelated');
            expect(objectKeys).toContain('DemoAccount');
        });
    });

    describe('Receive empty object when requested product doesnt exist', () => {
        it('Should return an empty object', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProductRelatedProducts({
                ProductCode: 'doesnt-exist'
            });
            expect(res).toEqual({});
        });
    });

    describe('Get a product by GTIN', () => {
        it('Should receive product informations', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProduct({ GTIN: '0882780751682' });
            expect(res.GeneralInfo).toBeDefined();
        });
    });

    describe('Get a product by icecatId', () => {
        it('Should receive product informations', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProduct({ icecat_id: 1198270 });
            expect(res.GeneralInfo).toBeDefined();
        });
    });

    describe('Access inaccessible full icecat product', () => {
        it('Should throw an error', async () => {
            let error;
            try {
                const oi = new OpenIcecat(baseBody);
                await oi.getProduct({ lang: 'en', icecat_id: 69847267123 });
            } catch (e) {
                error = e;
            }

            expect(error).toEqual(
                new Error(`accessing 'full icecat' products that can't be accessed`)
            );
        });
    });

    describe('Switching languages between requests', () => {
        it('Should correctly switch languages 2 times', async () => {
            const oi = new OpenIcecat(baseBody);
            const res = await oi.getProduct({ lang: 'en', icecat_id: 13818141 });
            expect(res.GeneralInfo?.Title).toEqual('Acer 4GB DDR3 memory module');

            const res2 = await oi.getProduct({ lang: 'de', icecat_id: 13818141 });
            expect(res2.GeneralInfo?.Title).toEqual('Acer 4GB DDR3 Speichermodul');
        });
    });
});
