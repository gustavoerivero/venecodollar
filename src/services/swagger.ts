import swaggerJsonDoc from 'swagger-jsdoc'
import packageJson from '../../package.json'

const { name, version, repository, publicPackage } = packageJson

const swaggerOptions = {
  openapi: '3.0.0',
  definition: {
    info: {
      title: `${name} API Documentation`,
      version: version,
      description: `This section represents the Swagger documentation of the API designed with ${name}'s NPM package. Here it is possible to test the endpoints provided by this API.\n\nIf you wish to make use of the NPM package in your javascript or typescript project, please [click here](${publicPackage}), where you will be redirected to the official ${name} NPM package page.`,
      contact: {
        name: 'the developer',
        email: process.env.EMAIL ?? '',
      },
      license: {
        name: 'MIT',
        url: `${repository.url}/blob/main/LICENSE`
      },
      schemes: ['http', 'https'],
    servers: [{ url: 'https://venecodollar.vercel.app/api/v1' }],
    }
  },
  apis: [`${__dirname}/routes/*.ts`, './build/routes/*.js']
}

export default swaggerJsonDoc(swaggerOptions)
