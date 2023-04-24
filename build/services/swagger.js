"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swaggerOptions = {
    openapi: '3.0.0',
    definition: {
        info: {
            title: 'Venecodollar API Documentation',
            version: '1.2.0',
            description: "This section represents the Swagger documentation of the API designed with Venecodollar's NPM package. Here it is possible to test the endpoints provided by this API.\n\nIf you wish to make use of the NPM package in your javascript or typescript project, please [click here](https://www.npmjs.com/package/venecodollar), where you will be redirected to the official Venecodollar NPM package page.",
            contact: {
                name: 'the developer',
                email: 'gustavoerivero12@gmail.com',
            },
            license: {
                name: 'MIT',
                url: 'https://github.com/gustavoerivero/venecodollar/blob/main/LICENSE'
            },
            schemes: ['http', 'https'],
            servers: [{ url: 'https://venecodollar.vercel.app/api/v1' }],
        }
    },
    apis: ["".concat(__dirname, "/routes/*.ts"), './build/routes/*.js']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
