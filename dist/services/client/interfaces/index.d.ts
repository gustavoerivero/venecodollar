import client, { IncomingHttpHeaders } from 'http';
export interface RequestOptions<T> extends client.RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    queryParameters?: Record<string, string>;
    body?: T;
}
export interface HttpResponse<T> {
    data: T;
    status?: number;
    statusMessage?: string;
    headers: Record<string, string> | IncomingHttpHeaders;
}
