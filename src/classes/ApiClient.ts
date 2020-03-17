import { all as deepMerge } from 'deepmerge';
import nodeFetch, { ResponseInit } from 'node-fetch';
import queryString from 'query-string';
import { IRequestOptions } from '@/interfaces/IRequestOptions';

export class ApiClient {
    private defaultOptions: IRequestOptions = {
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' }
    };

    public constructor(
        private baseURL: string,
        private baseOptions: IRequestOptions = {},
        private debug: boolean = false
    ) {}

    public get(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'GET',
            ...options
        });
    }

    public delete(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'DELETE',
            ...options
        });
    }

    public post(url: string, options: IRequestOptions = {}): Promise<any | null> {
        return this.fetchInternal(url, {
            method: 'POST',
            ...options
        });
    }

    public patch(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'PATCH',
            ...options
        });
    }

    public put(url: string, options: IRequestOptions = {}): Promise<any> {
        return this.fetchInternal(url, {
            method: 'PUT',
            ...options
        });
    }

    private async fetchInternal(url: string, options: IRequestOptions, retries = 3): Promise<any> {
        // Merge baseOptions with new options
        const mergedOptions = deepMerge<IRequestOptions>([
            // Options that are set as the default in this class
            this.defaultOptions,
            // Options that are set on class initialization
            this.baseOptions,
            // Options that were set in the function call
            options
        ]);

        // Switch request methods
        let newGetParams = {};
        const splitBaseURL = this.baseURL.split('?');
        if (mergedOptions && mergedOptions.method) {
            // Get URL without any get parameters
            const getParams = splitBaseURL.pop() || '';
            if (['POST', 'PUT', 'PATCH'].includes(mergedOptions.method)) {
                // Merge params from baseURL and new URL
                newGetParams = deepMerge([queryString.parse(getParams), queryString.parse(url)]);

                // Format body to match fetch interface
                mergedOptions.body = JSON.stringify(mergedOptions.body);
            } else if (['GET', 'DELETE'].includes(mergedOptions.method)) {
                // Merge params from baseURL, new URL and also the body params into the URL
                newGetParams = deepMerge([
                    queryString.parse(getParams),
                    queryString.parse(url),
                    mergedOptions.body || {}
                ]);

                // Delete body because it doesnt exist in GET and DELETE requests
                delete mergedOptions.body;
            }
        }

        // Build new URL
        const newURL = `${splitBaseURL.shift()}?${queryString.stringify(newGetParams)}`;

        // Make debug message
        if (this.debug) {
            console.log(`Making request to ${newURL}`);
        }

        // Execute fetch request
        const res = await fetch(newURL, mergedOptions as RequestInit);
        try {
            return await res.json();
        } catch {
            if (retries > 0) {
                return this.fetchInternal(url, options, retries - 1);
            }
        }
    }
}
