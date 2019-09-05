import fetch from 'node-fetch';
import queryString from 'query-string';
const mergeDeep = require('merge-deep');
import { IApiClientOptions } from '../interfaces/IApiClientOptions';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface IApiClientRequestOptions extends IApiClientOptions {
    method: RequestMethods;
}

export class ApiClient {
    private internalOptions: IApiClientOptions = {
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' }
    };

    public constructor(
        private baseURL: string,
        private baseOptions: IApiClientOptions = { headers: {}, body: {} },
        private debug: boolean = false
    ) {}

    /**
     * Get Request
     *
     * @param {string} url Api url
     * @param {IApiClientOptions} [options={}]
     * @returns {Promise<any>} Api response
     * @memberof ApiClient
     */
    public get(url: string, options: IApiClientOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'GET',
            ...options
        });
    }

    /**
     * Delete Request
     *
     * @param {string} url Api url
     * @param {IApiClientOptions} [options={}]
     * @returns {Promise<any>} Api response
     * @memberof ApiClient
     */
    public delete(url: string, options: IApiClientOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'DELETE',
            ...options
        });
    }

    /**
     * Post Request
     *
     * @param {string} url Api Url
     * @param {{}} body Body data
     * @param {IApiClientOptions} [options={}]
     * @returns {(Promise<any | false>)} Api response or false
     * @memberof ApiClient
     */
    public post(url: string, body: {}, options: IApiClientOptions = {}): Promise<any | null> {
        return this.fetchInternal(url, {
            method: 'POST',
            body,
            ...options
        });
    }

    /**
     * Patch Request
     *
     * @param {string} url Api url
     * @param {{}} body Body data
     * @param {IApiClientOptions} [options={}]
     * @returns {Promise<any>} Api response
     * @memberof ApiClient
     */
    public patch(url: string, body: {}, options: IApiClientOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'PATCH',
            body,
            ...options
        });
    }

    /**
     * Put Request
     *
     * @param {string} url Api url
     * @param {{}} body Body data
     * @param {IApiClientOptions} [options={}]
     * @returns {Promise<any>} Api response
     * @memberof ApiClient
     */
    public put(url: string, body: {}, options: IApiClientOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'PUT',
            body,
            ...options
        });
    }

    private async fetchInternal(
        url: string,
        options: IApiClientRequestOptions,
        retries: number = 3
    ): Promise<any> {
        /** Merge baseOptions with new options */
        const mergedOptions = mergeDeep(this.internalOptions, this.baseOptions, options);

        /** Switch request methods */
        let parsedURL = url;
        switch (options.method) {
            case 'POST' || 'PUT' || 'PATCH':
                /** Parse given URL */
                parsedURL =
                    '?' +
                    queryString.stringify(
                        mergeDeep(
                            queryString.parse(this.baseURL.split('?').pop() || ''),
                            queryString.parse(url)
                        )
                    );

                mergedOptions.body = JSON.stringify(mergedOptions.body);
                break;
            case 'GET' || 'DELETE':
                /** Parse given URL and mix them with body args */
                parsedURL =
                    '?' +
                    queryString.stringify(
                        mergeDeep(
                            mergedOptions.body,
                            queryString.parse(this.baseURL.split('?').pop() || ''),
                            queryString.parse(url)
                        )
                    );

                /** Reset body */
                mergedOptions.body = undefined;
                break;
        }

        /** Build full URL */
        const fullURL = `${this.baseURL.split('?').shift()}${parsedURL}`;

        /** Make debug message */
        if (this.debug) {
            console.log(`Making request to ${fullURL}`);
        }

        const res = await fetch(fullURL, mergedOptions);
        try {
            return await res.json();
        } catch {
            if (retries > 0) {
                return this.fetchInternal(url, options, retries - 1);
            }
        }
    }
}
