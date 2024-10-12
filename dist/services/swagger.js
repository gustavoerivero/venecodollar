"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_VER = `${process.env.API_VER}`;
const API_URL = `${process.env.API_VER_URL}`;
const EMAIL = `${process.env.EMAIL}`;
const swaggerOptions = {
    openapi: '3.0.0',
    definition: {
        info: {
            title: `Venecodollar API Documentation`,
            version: API_VER,
            description: `This section represents the Swagger documentation of the API designed with Venecodollar"s NPM package. Here it is possible to test the endpoints provided by this API.\n\nIf you wish to make use of the NPM package in your javascript or typescript project, please [click here](https://www.npmjs.com/package/venecodollar), where you will be redirected to the official Venecodollar NPM package page.`,
            contact: {
                name: 'the developer',
                email: EMAIL,
            },
            license: {
                name: 'MIT',
                url: `https://github.com/gustavoerivero/venecodollar/blob/main/LICENSE`,
            },
            schemes: ['http', 'https'],
            servers: [{ url: `https://venecodollar.vercel.app${API_URL}` }],
        },
    },
    apis: [`${__dirname}/routes/*.ts`, './build/routes/*.js'],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
