/* tslint:disable */
/* eslint-disable */
/**
 * Test Swagger API
 * Test for using swagger-codegen to auto-generate API interface, and use swagger-ui to show and test API.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { Page } from '../models';
import { PageDesc } from '../models';
/**
 * PageApi - axios parameter creator
 * @export
 */
export const PageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Test for fetching page title
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pageTitleGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/pageTitle`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Test for fetching page description with any id
         * @param {number} id user id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pageTitleIdGet: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling pageTitleIdGet.');
            }
            const localVarPath = `/pageTitle/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PageApi - functional programming interface
 * @export
 */
export const PageApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Test for fetching page title
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pageTitleGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Page>>> {
            const localVarAxiosArgs = await PageApiAxiosParamCreator(configuration).pageTitleGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Test for fetching page description with any id
         * @param {number} id user id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pageTitleIdGet(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PageDesc>>> {
            const localVarAxiosArgs = await PageApiAxiosParamCreator(configuration).pageTitleIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PageApi - factory interface
 * @export
 */
export const PageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Test for fetching page title
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pageTitleGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Page>> {
            return PageApiFp(configuration).pageTitleGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Test for fetching page description with any id
         * @param {number} id user id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pageTitleIdGet(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<PageDesc>> {
            return PageApiFp(configuration).pageTitleIdGet(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PageApi - object-oriented interface
 * @export
 * @class PageApi
 * @extends {BaseAPI}
 */
export class PageApi extends BaseAPI {
    /**
     * 
     * @summary Test for fetching page title
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageApi
     */
    public async pageTitleGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<Page>> {
        return PageApiFp(this.configuration).pageTitleGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Test for fetching page description with any id
     * @param {number} id user id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageApi
     */
    public async pageTitleIdGet(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<PageDesc>> {
        return PageApiFp(this.configuration).pageTitleIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
}