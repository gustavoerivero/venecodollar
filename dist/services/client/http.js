"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const __1 = require("..");
class HttpClient {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    buildUrl(path, queryParameters) {
        let url = this.baseUrl ?? '';
        url += path;
        if (queryParameters) {
            const queryParams = new URLSearchParams(Object.entries(queryParameters));
            url += `?${queryParams.toString()}`;
        }
        return url;
    }
    buildRequestOptions(method, options) {
        const requestOptions = {
            method,
            headers: options.headers || {},
        };
        if (options.body) {
            requestOptions.headers['Content-Type'] = 'application/json';
        }
        return requestOptions;
    }
    async sendRequest(url, options) {
        const protocol = url.startsWith('http:') ? http_1.default : https_1.default;
        return new Promise((resolve, reject) => {
            const request = protocol.request(url, options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        const response = {
                            data: JSON.parse(data),
                            status: res.statusCode,
                            statusMessage: res.statusMessage,
                            headers: res.headers,
                        };
                        resolve(response);
                    }
                    else {
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
    async send(method, path, options, body) {
        const url = this.buildUrl(path, options.queryParameters);
        if (body) {
            options.body = body;
        }
        const requestOptions = this.buildRequestOptions(method, options);
        try {
            const response = await this.sendRequest(url, requestOptions);
            return response;
        }
        catch (error) {
            throw new Error(`Request option error: ${error}`);
        }
    }
    async post(path, body, options = { method: 'POST' }) {
        return this.send('POST', path, options, body);
    }
    async get(path, options = { method: 'GET' }) {
        return this.send('GET', path, options);
    }
    async put(path, body, options = { method: 'PUT' }) {
        return this.send('PUT', path, options, body);
    }
    async patch(path, body, options = { method: 'PATCH' }) {
        return this.send('PATCH', path, options, body);
    }
    async delete(path, body, options = { method: 'DELETE' }) {
        return this.send('DELETE', path, options, body);
    }
}
exports.HttpClient = HttpClient;
const client = new HttpClient(__1.BASE_URL);
exports.default = client;
