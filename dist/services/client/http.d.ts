import { RequestOptions, HttpResponse } from './interfaces';
export declare class HttpClient {
    private readonly baseUrl?;
    constructor(baseUrl?: string);
    private buildUrl;
    private buildRequestOptions;
    private sendRequest;
    private send;
    post<T>(path: string, body: T, options?: RequestOptions<T>): Promise<HttpResponse<T>>;
    get<T>(path: string, options?: RequestOptions<T>): Promise<HttpResponse<T>>;
    put<T>(path: string, body: T, options?: RequestOptions<T>): Promise<HttpResponse<T>>;
    patch<T>(path: string, body: T, options?: RequestOptions<T>): Promise<HttpResponse<T>>;
    delete<T>(path: string, body: T, options?: RequestOptions<T>): Promise<HttpResponse<T>>;
}
declare const client: HttpClient;
export default client;
