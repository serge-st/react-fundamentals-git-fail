import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IComment, IPost } from '../types/types'
import { cache } from './cacheHandler'

export default class PostService {
  private static readonly baseURL = 'https://jsonplaceholder.typicode.com'

  private static responseHandler (response: AxiosResponse<any>): AxiosResponse<any> {
    if (response.config.method === 'GET' || 'get') {
      if (response.config.url && response.config.params) {
        console.log('storing in cache')
        const key = response.config.url + Object
          .entries(response.config.params)
          .map(param => param.join('=')).join('&')
        cache.store(
          key,
          JSON.stringify(response.data),
          JSON.stringify(response.headers)
        )
      }
    }
    return response
  }

  private static async errorHandler (error: AxiosResponse<any>) {
    if (error.headers.cached) {
      console.log('got cached data in response, serving it directly')
      return await Promise.resolve(error)
    }
    return await Promise.reject(error)
  }

  private static readonly requestHandler = (request: AxiosRequestConfig) => {
    if (request.method === 'GET' || 'get') {
      const key = request.url + Object
        .entries(request.params)
        .map(param => param.join('=')).join('&')
      const checkIsValidResponse = cache.isValid(key)
      if (checkIsValidResponse.isValid) {
        console.log('serving cached data')
        request.headers = JSON.parse(checkIsValidResponse.headers || '{}')
        if (request.headers != null) {
          request.headers.cached = true
        }
        request.data = JSON.parse(checkIsValidResponse.value || '{}')
        return Promise.reject(request)
      }
    }
    return request
  }

  static async getAll (limit = 10, page = 1): Promise<AxiosResponse<IPost[]>> {
    const client = axios.create({
      baseURL: this.baseURL
    })

    client.interceptors.request.use((request) => this.requestHandler(request))
    client.interceptors.response.use(
      (response) => this.responseHandler(response),
      async (error) => await this.errorHandler(error)
    )
    return await client.get<IPost[]>('/posts?', {
      params: {
        _limit: limit,
        _page: page
      }
    })
  }

  static async getById (id: string): Promise<AxiosResponse<IPost>> {
    return await axios.get<IPost>(`${this.baseURL}/posts/${id}`)
  }

  static async getCommentsByPostId (id: string): Promise<AxiosResponse<IComment[]>> {
    return await axios.get<IComment[]>(`${this.baseURL}/posts/${id}/comments`)
  }
}
