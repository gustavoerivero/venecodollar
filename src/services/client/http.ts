import http from 'http';
import https from 'https';

import { RequestOptions, HttpResponse } from './interfaces';
import { BASE_URL } from '..';

export class HttpClient {
  private readonly baseUrl?: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, queryParameters?: Record<string, string>): string {
    let url = this.baseUrl ?? '';

    url += path;
    if (queryParameters) {
      const queryParams = new URLSearchParams(Object.entries(queryParameters));
      url += `?${queryParams.toString()}`;
    }

    return url;
  }

  private buildRequestOptions<T>(method: RequestOptions<T>['method'], options: RequestOptions<T>): RequestOptions<T> {
    const requestOptions: RequestOptions<T> = {
      method,
      headers: options.headers || {},
    };

    if (options.body) {
      requestOptions.headers!['Content-Type'] = 'application/json';
    }

    return requestOptions;
  }

  private async sendRequest<T>(url: string, options: RequestOptions<T>): Promise<HttpResponse<T>> {
    const protocol = url.startsWith('http:') ? http : https;

    return new Promise((resolve, reject) => {
      const request = protocol.request(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const response: HttpResponse<T> = {
              data: JSON.parse(data),
              status: res.statusCode,
              statusMessage: res.statusMessage,
              headers: res.headers,
            };
            resolve(response);
          } else {
            reject(new Error(''));
          }
        });

        res.on('error', (error) => {
          reject(new Error(`Request error: ${error}`));
        });
      });

      request.end();
    });
  }

  private async send<T>(
    method: RequestOptions<T>['method'],
    path: string,
    options: RequestOptions<T>,
    body?: T,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(path, options.queryParameters);

    if (body) {
      options.body = body;
    }

    const requestOptions = this.buildRequestOptions(method, options);

    try {
      const response = await this.sendRequest<T>(url, requestOptions);
      return response;
    } catch (error) {
      throw new Error(`Request option error: ${error}`);
    }
  }

  public async post<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: 'POST' },
  ): Promise<HttpResponse<T>> {
    return this.send<T>('POST', path, options, body);
  }

  public async get<T>(path: string, options: RequestOptions<T> = { method: 'GET' }): Promise<HttpResponse<T>> {
    return this.send<T>('GET', path, options);
  }

  public async put<T>(path: string, body: T, options: RequestOptions<T> = { method: 'PUT' }): Promise<HttpResponse<T>> {
    return this.send<T>('PUT', path, options, body);
  }

  public async patch<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: 'PATCH' },
  ): Promise<HttpResponse<T>> {
    return this.send<T>('PATCH', path, options, body);
  }

  public async delete<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: 'DELETE' },
  ): Promise<HttpResponse<T>> {
    return this.send<T>('DELETE', path, options, body);
  }
}

const client = new HttpClient(BASE_URL);

export default client;
