import { objectToQueryString, parseQueryString } from './queryString';

const testObject = { abc: 'test', bcd: '123' };
const testQuery = '?abc=test&bcd=123';

describe('queryString methods', () => {
    describe('objectToQueryString', () => {
        it('should build a parameter query correctly', () => {
            expect(objectToQueryString(testObject)).toEqual(testQuery);
        });
        it('should not modify the object key names', () => {
            const objectKeys = Object.keys(testObject);
            const query = objectToQueryString(testObject);
            expect(objectKeys.every(itm => query.includes(itm))).toBeTruthy();
        });
        it('should not modify the object key values', () => {
            const objectKeys = Object.values(testObject);
            const query = objectToQueryString(testObject);
            expect(objectKeys.every(itm => query.includes(itm.toString()))).toBeTruthy();
        });
        it('should begin with a question mark', () => {
            expect(objectToQueryString(testObject).charAt(0) === '?').toBeTruthy();
        });
        it('should contain an ampersand sign once', () => {
            expect((objectToQueryString(testObject).match(/&/g) || []).length).toEqual(1);
        });
        it('should not end with a ampersand', () => {
            expect(objectToQueryString(testObject).slice(-1) !== '&').toBeTruthy();
        });
    });
    describe('parseQueryString', () => {
        it('should parse the query string correctly', () => {
            expect(parseQueryString(testQuery)).toEqual(testObject);
        });
    });
});
