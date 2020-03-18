export function objectToQueryString(obj: {} | any): string {
    return (
        '?' +
        Object.keys(obj)
            .map(k => `${k}=${obj[k]}`)
            .join('&')
    );
}

export function parseQueryString(queryString: string): any {
    const query: any = {};
    for (const itm of queryString.replace(/^\?/, '').split('&')) {
        const pair = itm.split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
