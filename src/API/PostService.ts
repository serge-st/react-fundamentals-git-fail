import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cache } from './cacheHandler';

export default class PostService {
    private static baseURL = 'https://jsonplaceholder.typicode.com';

    private static responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
        if (response.config.method === 'GET' || 'get') {
            if (response.config.url && response.config.params) {
                console.log('storing in cache');
                const key = response.config.url + Object
                    .entries(response.config.params)
                    .map( param => param.join('=')).join('&');
                cache.store(
                    key,
                    JSON.stringify(response.data),
                    JSON.stringify(response.headers)
                );
            }
        }
        return response;
    }

    private static errorHandler(error: any) {
        if (error.headers.cached === true) {
            console.log('got cached data in response, serving it directly');
            return Promise.resolve(error);
        }
        return Promise.reject(error);
    }
    
    private static requestHandler = (request: AxiosRequestConfig) => {
        if (request.method === 'GET' || 'get') {
            const key = request.url + Object
                .entries(request.params)
                .map( param => param.join('=')).join('&');
            const checkIsValidResponse = cache.isValid(key);
            if (checkIsValidResponse.isValid) {
                console.log('serving cached data');
                request.headers = JSON.parse(checkIsValidResponse.headers || '{}');
                if (request.headers) {
                    request.headers.cached = true;
                }
                request.data = JSON.parse(checkIsValidResponse.value || '{}');
                return Promise.reject(request);
            }
        }
        return request;
    }

    static async getAll(limit = 10, page = 1) {
        const client = axios.create({
            baseURL: this.baseURL,
        });

        client.interceptors.request.use((request) => this.requestHandler(request));
        client.interceptors.response.use(
            (response) => this.responseHandler(response),
            (error) => this.errorHandler(error),
        );
        return await client.get('/posts?', {
            params: {
                _limit: limit,
                _page: page,
            }
        });
    }

    static async getById(id: string) {
        return await axios.get(`${this.baseURL}/posts/${id}`);
    }

    static async getCommentsByPostId(id: string) {
        return await axios.get(`${this.baseURL}/posts/${id}/comments`);
    }
}