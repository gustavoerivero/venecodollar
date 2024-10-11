# Venecodollar

<div align="center">
  <img src="https://img.shields.io/npm/v/venecodollar" alt="npm version" />
  <img src="https://img.shields.io/github/repo-size/gustavoerivero/venecodollar" alt="project size" />
  <img src="https://img.shields.io/npm/l/venecodollar" alt="project license" />
  <img src="https://img.shields.io/github/contributors/gustavoerivero/venecodollar" alt="project collabs" />
  <img src="https://img.shields.io/github/last-commit/gustavoerivero/venecodollar" alt="project last commit" />
  <img src="https://img.shields.io/github/languages/count/gustavoerivero/venecodollar" alt="project languages" />
  <img src="https://img.shields.io/github/languages/top/gustavoerivero/venecodollar" alt="project major language percent" />
</div>

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> English </a></td>
          <td><a href="./README-ES.md"> Spanish </a></td>
      </tr>
  </table>
</div>

Venecodollar is a TypeScript library that provides some asynchronous functions to obtain a JSON object with the different values that the dollar and euro has assumed in bolivars. This library is useful for TypeScript or TypeScript projects that need to obtain updated information about the exchange rate of the dollar or euro in Venezuelan bolivars.

The data is obtained from [ExchangeMonitor](https://exchangemonitor.net/)

## Installation

To install the library, you can use the different package managers:

### NPM

For the case of [NPM](https://nodejs.org/en):

```bash
npm install venecodollar
```

### Yarn

On the other hand, with [Yarn](https://yarnpkg.com/) it would be as follows:

```bash
yarn add venecodollar
```

## Usage

Regarding the use of the library, it is first necessary to import the functions that allow to obtain the values.

This can be done in two ways:

```TypeScript
import * as Venecodollar from "venecodollar"
```

Or

```TypeScript
const {
  getDollarPrices,
  getDollarPricesWithAverage,
  calculateBsToDollar,
  calculateDollarToBs,
  getEuroPrices,
  getEuroPricesWithAverage,
  calculateBsToEuro,
  calculateEuroToBs
} = require("venecodollar")
```

That said, it is necessary to emphasize that both functions are asynchronous, so it is necessary to work them in async/await functions or as promises. Some examples of this can be:

### async/await

```TypeScript
async function getDollar() {
  try {
    const response = await getDollarPrices()
    return response
  } catch (error) {
    console.log(error)
  }
}
```

### Promises

```TypeScript
const getAverage = () => {
  getEuroPricesWithAverage()
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      return null
    })
}
```

### Functions

The package has at its disposal eight (8) functions, four (4) to dollar values and four (4) to euro values:

- Dollar functions:

* getDollarPrices()
* getDollarPricesWithAverage()
* calculateBsToDollar(bs: number)
* calculateDollarToBs(dollar: number)

- Euro functions:

* getEuroPrices()
* getEuroPricesWithAverage()
* calculateBsToEuro(bs: number)
* calculateEuroToBs(euro: number)

#### Dollar functions

##### getDollarPrices()

This function returns two possible values. In the case of not having been able to connect to the services that provide the values, it will return null. However, if it succeeds in connecting, it will return an array with the entities in charge of monitoring the dollar value.

Each element of the array will consist of the title of the entity, the dollar value, the date of its last update and some values more. An example of this is the following:

```TypeScript
[
  {
    "title": "Dólar EM",
    "dollar": 33.49,
    "updatedDate": "11:42:16 A. M. del sábado 9 de septiembre, 2023",
    "image": "https://exchangemonitor.net/img/ve/exchangemonitor.webp",
    "difference": 0.01,
    "differencePercentage": "0.03%",
    "tendency": "Downtrend",
    "tendencyColor": "red"
  },
  {
    "title": "Monitor Dolar Vzla",
    "dollar": 31.88,
    "updatedDate": "Jueves 31 de agosto, 2023",
    "image": "https://exchangemonitor.net/img/ve/monitor-dolar-vzla.webp",
    "difference": 0,
    "differencePercentage": "0.00%",
    "tendency": "Unchanged",
    "tendencyColor": "gray"
  },
  {
    "title": "BCV",
    "dollar": 33.34,
    "updatedDate": "7:59:16 P. M. del viernes 8 de septiembre, 2023",
    "image": "https://exchangemonitor.net/img/ve/nacional/bcv.webp",
    "difference": 0.12,
    "differencePercentage": "0.36%",
    "tendency": "Uptrend",
    "tendencyColor": "green"
  }
]
```

##### getDollarPricesWithAverage()

Similarly to getDollarPrices(), this function returns two possible values. In case of not connecting to the services, it will return the null value. On the other hand, if it does connect, it will return an object which will have the date on which the service was consulted, the average of all the entities whose dollar value is greater than zero (0) and an array with all the entities whose information is consulted. An example of this is the following:

```TypeScript
{
  "date": "2023-09-09T12:56:14.087Z",
  "average": 32.80,
  "entities": [
    {
      "entity": "Dólar EM",
      "info": {
        "title": "Dólar EM",
        "dollar": 33.49,
        "updatedDate": "11:42:16 A. M. del sábado 9 de septiembre, 2023",
        "image": "https://exchangemonitor.net/img/ve/exchangemonitor.webp",
        "difference": 0.01,
        "differencePercentage": "0.03%",
        "tendency": "Downtrend",
        "tendencyColor": "red"
      }
    },
    {
      "entity": "Monitor Dolar Vzla",
      "info": {
        "title": "Monitor Dolar Vzla",
        "dollar": 31.88,
        "updatedDate": "Jueves 31 de agosto, 2023",
        "image": "https://exchangemonitor.net/img/ve/monitor-dolar-vzla.webp",
        "difference": 0,
        "differencePercentage": "0.00%",
        "tendency": "Unchanged",
        "tendencyColor": "gray"
      }
    },
    {
      "entity": "BCV",
      "info": {
        "title": "BCV",
        "dollar": 33.34,
        "updatedDate": "7:59:16 P. M. del viernes 8 de septiembre, 2023",
        "image": "https://exchangemonitor.net/img/ve/nacional/bcv.webp",
        "difference": 0.12,
        "differencePercentage": "0.36%",
        "tendency": "Uptrend",
        "tendencyColor": "green"
      }
    }
  ]
}
```

##### calculateBsToDollar(bs: number)

The response returned by this function is very similar to getDollarPrices(), however, it has a notorious particularity and, is that each entity belonging to the array will be formed by three very notorious elements: entity, being the name of the entity, info that contains the title of the entity, its dollar value and the date on which it updated the value and, finally, bsCalculated, which would represent the calculation performed to know the value of the dollar amount, passed as a parameter in terms of bolivars.

##### calculateDollarToBs(dollar: number)

This function would represent the calculation similar to the calculateBsToDollar function but, instead of calculating the value of the amount expressed in bolivars in dollars, this function would show the entities with the calculation made for each of them in dollar terms.

#### Euro functions

##### getEuroPrices()

This function returns two possible values. In the case of not having been able to connect to the services that provide the values, it will return null. However, if it succeeds in connecting, it will return an array with the entities in charge of monitoring the euro value.

Each element of the array will consist of the title of the entity, the euro value, the date of its last update and some values more. An example of this is the following:

```TypeScript
[
  {
    "title": "Dólar EM",
    "euro": 37.62,
    "updatedDate": "11:41:41 A. M. del sábado 9 de septiembre, 2023",
    "image": "https://exchangemonitor.net/img/ve/exchangemonitor.webp",
    "difference": 0.01,
    "differencePercentage": "0.02%",
    "tendency": "Uptrend",
    "tendencyColor": "green"
  },
  {
    "title": "Monitor Dolar Vzla",
    "dollar": 37.42,
    "updatedDate": "11:41:41 A. M. del sábado 9 de septiembre, 2023",
    "image": "https://exchangemonitor.net/img/ve/monitor-dolar-vzla.webp",
    "difference": 0,
    "differencePercentage": "0.01%",
    "tendency": "Downtrend",
    "tendencyColor": "red"
  },
  {
    "title": "BCV",
    "dollar": 37.45,
    "updatedDate": "8:07:41 P. M. del viernes 8 de septiembre, 2023",
    "image": "https://exchangemonitor.net/img/ve/nacional/bcv.webp",
    "difference": 0.15,
    "differencePercentage": "0.41%",
    "tendency": "Uptrend",
    "tendencyColor": "green"
  }
]
```

##### getEuroPricesWithAverage()

Similarly to getEuroPrices(), this function returns two possible values. In case of not connecting to the services, it will return the null value. On the other hand, if it does connect, it will return an object which will have the date on which the service was consulted, the average of all the entities whose dollar value is greater than zero (0) and an array with all the entities whose information is consulted. An example of this is the following:

```TypeScript
{
  "date": "2023-09-09T12:56:14.087Z",
  "average": 37.03,
  "entities": [
    {
      "entity": "Dólar EM",
      "info": {
        "title": "Dólar EM",
        "euro": 37.62,
        "updatedDate": "11:41:41 A. M. del sábado 9 de septiembre, 2023",
        "image": "https://exchangemonitor.net/img/ve/exchangemonitor.webp",
        "difference": 0.01,
        "differencePercentage": "0.02%",
        "tendency": "Uptrend",
        "tendencyColor": "green"
      }
    },
    {
      "entity": "Monitor Dolar Vzla",
      "info": {
        "title": "Monitor Dolar Vzla",
        "dollar": 37.42,
        "updatedDate": "11:41:41 A. M. del sábado 9 de septiembre, 2023",
        "image": "https://exchangemonitor.net/img/ve/monitor-dolar-vzla.webp",
        "difference": 0,
        "differencePercentage": "0.01%",
        "tendency": "Downtrend",
        "tendencyColor": "red"
      }
    },
    {
      "entity": "BCV",
      "info": {
        "title": "BCV",
        "dollar": 37.45,
        "updatedDate": "8:07:41 P. M. del viernes 8 de septiembre, 2023",
        "image": "https://exchangemonitor.net/img/ve/nacional/bcv.webp",
        "difference": 0.15,
        "differencePercentage": "0.41%",
        "tendency": "Uptrend",
        "tendencyColor": "green"
      }
    }
  ]
}
```

##### calculateBsToEuro(bs: number)

The response returned by this function is very similar to getEuroPrices(), however, it has a notorious particularity and, is that each entity belonging to the array will be formed by three very notorious elements: entity, being the name of the entity, info that contains the title of the entity, its dollar value and the date on which it updated the value and, finally, bsCalculated, which would represent the calculation performed to know the value of the bolivars amount, passed as a parameter in terms of euros.

##### calculateEuroToBs(euro: number)

This function would represent the calculation similar to the calculateBsToEuro function but, instead of calculating the value of the amount expressed in bolivars in euros, this function would show the entities with the calculation made for each of them in euro terms.

### Types

Likewise, the package was designed using TypeScript, so it is possible to make use of function typing. To do so, it is necessary to import the data types directly from your folder:

```TypeScript
import { TDollar, TDollarEntity, TDollarAverage, TDollarCalculated, TBsCalculated, TDollarCalculatedAverage, TBsCalculatedAverage } from 'venecodollar/src/types/DollarType'
```

Or

```TypeScript
const { TEuro, TEuroEntity, TEuroAverage, TEuroCalculated, TBsCalculated, TEuroCalculatedAverage, TBsCalculatedAverage } = require('venecodollar/src/types/DollarType')
```

As can be seen, there are fourteen (14) data types, of which we can highlight TDollar, TDollarEntity, TDollarAverage, TDollarCalculated, TBsCalculated, TDollarCalculatedAverage, TBsCalculatedAverage, TEuro, TEuroEntity, TEuroAverage, TEuroCalculated, TBsCalculated, TEuroCalculatedAverage and TBsCalculatedAverage.

#### TDollar

```TypeScript
type TDollar = {
  title: string;
  dollar: number;
  updatedDate: string;
  image?: string;
  difference?: number;
  differencePercentage?: string;
  tendency?: string;
  tendencyColor?: string;
}
```

#### TDollarEntity

```TypeScript
type TEntity = {
  entity: string
  info: TDollar
}
```

#### TDollarAverage

```TypeScript
type TDollarAverage = {
  date: Date;
  average: number;
  entities: TDollarEntity[];
}
```

#### TDollarCalculated

```TypeScript
type TDollarCalculated = {
  entity: string,
  info: TDollar,
  dollarCalculated: number
}
```

#### TBsCalculated

```TypeScript
type TBsCalculated = {
  entity: string,
  info: TDollar,
  bolivarCalculated: number
}
```

#### TDollarCalculatedAverage

```TypeScript
type TDollarCalculatedAverage = {
  date: Date,
  average: number,
  entities: TDollarCalculated[]
}
```

#### TBsCalculatedAverage

```TypeScript
type TBsCalculatedAverage = {
  date: Date,
  average: number,
  entities: TBsCalculated[]
}
```

#### TEuro

```TypeScript
type TEuro = {
  title: string;
  euro: number;
  updatedDate: string;
  image?: string;
  difference?: number;
  differencePercentage?: string;
  tendency?: string;
  tendencyColor?: string;
}
```

#### TEuroEntity

```TypeScript
type TEntity = {
  entity: string
  info: TEuro
}
```

#### TEuroAverage

```TypeScript
type TEuroAverage = {
  date: Date;
  average: number;
  entities: TEuroEntity[];
}
```

#### TEuroCalculated

```TypeScript
type TEuroCalculated = {
  entity: string;
  info: TEuro;
  euroCalculated: number;
}
```

#### TBsEuroCalculated

```TypeScript
type TBsEuroCalculated = {
  entity: string;
  info: TEuro;
  bolivarCalculated: number;
}
```

#### TEuroCalculatedAverage

```TypeScript
type TEuroCalculatedAverage = {
  date: Date;
  average: number;
  entities: TEuroCalculated[];
}
```

#### TBsEuroCalculatedAverage

```TypeScript
type TBsEuroCalculatedAverage = {
  date: Date;
  average: number;
  entities: TBsEuroCalculated[];
}
```

## API Reference

The package is also deployed and works as an API for those users who do not want to or cannot incorporate it into their projects as a dependency.

To access the API they should use the path [https://venecodollar.vercel.app/api/v2](https://venecodollar.vercel.app/api/v2).

Likewise, you can access the documentation made in swagger for the project located here [venecodollar API documentation](https://venecodollar.vercel.app/api/doc).

### Get all entities with dollar prices

```http
  GET /api/v2/dollar
```

This endpoint allows obtaining all the dollar monitoring entities with their respective name and last update date, as well as an average of all the active entities (i.e., those with a dollar value greater than zero).

### Get all entities with euro prices

```http
  GET /api/v2/euro
```

This endpoint allows obtaining all the euro monitoring entities with their respective name and last update date, as well as an average of all the active entities (i.e., those with a euro value greater than zero).

### Get entities by name with dollar prices

```http
  GET /api/v2/dollar/entity?name=${name}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `name`    | `string` | **Required**. Name of entitites to fetch |

This endpoint allows to obtain all the monitoring entities of the dollar by the name provided in the path parameter. If the name provided matches more than one entity, the endpoint returns an average of the values given by the entities and the information for each of these entities. If the name provided matches only one entity, the endpoint will return the information for that entity only.

### Get entities by name with euro prices

```http
  GET /api/v2/euro/entity?name=${name}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `name`    | `string` | **Required**. Name of entitites to fetch |

This endpoint allows to obtain all the monitoring entities of the euro by the name provided in the path parameter. If the name provided matches more than one entity, the endpoint returns an average of the values given by the entities and the information for each of these entities. If the name provided matches only one entity, the endpoint will return the information for that entity only.

### Calculate Bs with dollar param

```http
  GET /api/v2/dollar/toBs?dollar=${dollar}&entity={entity}
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| `dollar`  | `number` | **Required**. Amount in dollars to be calculated in bolivars. |
| `entity`  | `string` | Name of entities to fetch                                     |

This endpoint allows obtaining all the dollar monitoring entities while calculating the value of the dollar passed as a parameter in the path in terms of bolivars. If the name of an entity to be filtered by is passed as a parameter in the path, the endpoint will return only the dollar monitoring entities that match the parameter passed.

### Calculate Bs with euro param

```http
  GET /api/v2/euro/toBs?euro=${euro}&entity={entity}
```

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `euro`    | `number` | **Required**. Amount in euros to be calculated in bolivars. |
| `entity`  | `string` | Name of entities to fetch                                   |

This endpoint allows obtaining all the euro monitoring entities while calculating the value of the euro passed as a parameter in the path in terms of bolivars. If the name of an entity to be filtered by is passed as a parameter in the path, the endpoint will return only the dollar monitoring entities that match the parameter passed.

### Calculate Dollar with bolivars param

```http
  GET /api/v2/dollar/toDollar?bs=${bs}&entity={entity}
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| `bs`      | `number` | **Required**. Amount in bolivars to be calculated in dollars. |
| `entity`  | `string` | Name of entities to fetch                                     |

This endpoint allows obtaining all the dollar monitoring entities while calculating the value of the dollar passed as a parameter in the path in terms of bolivars. If the name of an entity to be filtered by is passed as a parameter in the path, the endpoint will return only the dollar monitoring entities that match the parameter passed.

### Calculate Euro with bolivars param

```http
  GET /api/v2/euro/toEuro?bs=${bs}&entity={entity}
```

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `bs`      | `number` | **Required**. Amount in bolivars to be calculated in euros. |
| `entity`  | `string` | Name of entities to fetch                                   |

This endpoint allows obtaining all the euro monitoring entities while calculating the value of the euro passed as a parameter in the path in terms of bolivars. If the name of an entity to be filtered by is passed as a parameter in the path, the endpoint will return only the dollar monitoring entities that match the parameter passed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

⌨️ made with ❤️ by [gustavoerivero](https://github.com/gustavoerivero)
