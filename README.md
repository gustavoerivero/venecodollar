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

Venecodollar is a TypeScript library that provides two asynchronous methods to obtain a JSON object with the different values that the dollar has assumed in bolivars. This library is useful for JavaScript or TypeScript projects that need to obtain updated information about the exchange rate of the dollar in Venezuelan bolivars.

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

Regarding the use of the library, it is first necessary to import the methods that allow to obtain the values.

This can be done in two ways:

```javascript
import { getDollarPrices, getDollarPricesWithAverage } from 'venecodollar' 
```

Or

```javascript
const { getDollarPrices, getDollarPricesWithAverage } = require('venecodollar')
```

That said, it is necessary to emphasize that both methods are asynchronous, so it is necessary to work them in async/await functions or as promises. Some examples of this can be:

### async/await

```javascript
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

```javascript
const getAverage = () => {
  getDollarPricesWithAverage()
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      return null
    })
}
```

### Methods

The package has at its disposal two (2) methods, getDollarPrices() and getDollarPricesWithAverage().

#### getDollarPrices()

This method returns two possible values. In the case of not having been able to connect to the services that provide the values, it will return null. However, if it succeeds in connecting, it will return an array with the entities in charge of monitoring the dollar value.

Each element of the array will consist of the title of the entity, the dollar value and the date of its last update. An example of this is the following:

```javascript
[
  {
    "title": "BCV (Oficial)",
    "dollar": 24.648,
    "updatedDate": "03:30 PM, 22/04/2023"
  },
  {
    "title": "@EnParaleloVzla3",
    "dollar": 25.31,
    "updatedDate": "01:00 PM, 21/04/2023"
  },
  {
    "title": "@DolarToday",
    "dollar": 25.29,
    "updatedDate": "03:30 PM, 22/04/2023"
  }
]
```

#### getDollarPricesWithAverage()

Similarly to getDollarPrices(), this method returns two possible values. In case of not connecting to the services, it will return the null value. On the other hand, if it does connect, it will return an object which will have the date on which the service was consulted, the average of all the entities whose dollar value is greater than zero (0) and an array with all the entities whose information is consulted. An example of this is the following:

```javascript
{
  "date": "2023-04-22T19:56:14.087Z",
  "average": 25.16,
  "entities": [
    {
      "entity": "BCV (Oficial)",
      "info": {
        "title": "BCV (Oficial)",
        "dollar": 24.648,
        "updatedDate": "03:30 PM, 22/04/2023"
      }
    },
    {
      "entity": "@EnParaleloVzla3",
      "info": {
        "title": "@EnParaleloVzla3",
        "dollar": 25.31,
        "updatedDate": "01:00 PM, 21/04/2023"
      }
    },
    {
      "entity": "@DolarToday",
      "info": {
        "title": "@DolarToday",
        "dollar": 25.29,
        "updatedDate": "03:30 PM, 22/04/2023"
      }
    }
  ]
}
```

### Types

Likewise, the package was designed using TypeScript, so it is possible to make use of method typing. To do so, it is necessary to import the data types directly from your folder:

```javascript
import { DollarType, DollarArrayType, EntityType, DollarAverageType } from 'venecodollar/src/types/DollarType' 
```

Or

```javascript
const { DollarType, DollarArrayType, EntityType, DollarAverageType } = require('venecodollar/src/types/DollarType')
```

As can be seen, there are four (4) data types, of which we can highlight DollarType, DollarArrayType, EntityType and DollarAverageType. 

#### DollarType

```TypeScript
type DollarType = {
  title: string
  dollar: number
  updatedDate: string
}
```

#### DollarArrayType

```TypeScript
type DollarArrayType = {
  title: string
  dollar: number
  updatedDate: string
}[]
```

#### EntityType

```TypeScript
type EntityType = {
  entity: string
  info: DollarType
}
```

#### DollarAverageType

```TypeScript
type DollarAverageType = {
  date: Date
  average: number
  entities: EntityType[]
}
```

## API Reference

The package is also deployed and works as an API for those users who do not want to or cannot incorporate it into their projects as a dependency. 

To access the API they should use the path https://venecodollar.vercel.app/api/v1.

Likewise, you can access the documentation made in swagger for the project located here [venecodollar API documentation](https://venecodollar.vercel.app/api/doc).

#### Get all entities

```http
  GET /api/v1/dollar
```

This endpoint allows obtaining all the dollar monitoring entities with their respective name and last update date, as well as an average of all the active entities (i.e., those with a dollar value greater than zero).

#### Get entities by name

```http
  GET /api/v1/dollar/entity?name=${name}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `name`      | `string` | **Required**. Name of entitites to fetch |

This endpoint allows to obtain all the monitoring entities of the dollar by the name provided in the path parameter. If the name provided matches more than one entity, the endpoint returns an average of the values given by the entities and the information for each of these entities. If the name provided matches only one entity, the endpoint will return the information for that entity only.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---
⌨️ made with ❤️ by [gustavoerivero](https://github.com/gustavoerivero) 