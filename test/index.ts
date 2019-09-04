import { OpenIcecat } from '../index';

const oc = new OpenIcecat({
    body: {
        username: 'icecat',
        lang: 'de'
    }
});

(async () => {
    /** Get a Product by Brand & Product Code */
    const res = await oc.getProduct({ Brand: 'hp', ProductCode: 'RJ459AV' });
    if (res.GeneralInfo.Title === 'HP Compaq 6710b Base Model Notebook PC') {
        console.log('Get a Product by Brand & Product Code - success');
    } else {
        console.log('Get a Product by Brand & Product Code - failure');
    }

    /** Get a Product by GTIN/EAN/UPC/JAN */
    const res2 = await oc.getProduct({ GTIN: '0882780751682' });
    if (res2.GeneralInfo.Title === 'HP Compaq 6710b Base Model Notebook PC') {
        console.log('Get a Product by GTIN - success');
    } else {
        console.log('Get a Product by GTIN - failure');
    }

    /** Get a Product by icecat_id */
    const res3 = await oc.getProduct({ icecat_id: 1198270 });
    if (res3.GeneralInfo.IcecatId === '1198270') {
        console.log('Get a Product by icecat_id - success');
    } else {
        console.log('Get a Product by icecat_id - failure');
    }

    /** Change the language for a single request */
    const res4 = await oc.getProduct({ lang: 'en', Brand: 'hp', ProductCode: 'RJ459AV' });
    if (
        res4.GeneralInfo.Description.WarrantyInfo ===
        'HP Services offers limited 3-year and 1-year standard parts and laborpick-up or carry-in, and toll-free 7 x 24 hardware technical phone support (depending on model); 1-year limitedon primary battery. On-site service andupgrades are also available.'
    ) {
        console.log('Change the language for a single request - success');
    } else {
        console.log('Change the language for a single request - failure');
    }
})();
