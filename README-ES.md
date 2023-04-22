# Venecodollar

<div align="center">
  <img src="https://img.shields.io/depfu/dependencies/github/gustavoerivero/venecodollar" alt="dependencies" />
  <img src="https://img.shields.io/node/v/react-native" alt="node version" />
  <img src="https://img.shields.io/github/repo-size/gustavoerivero/venecodollar" alt="project size" />
  <img src="https://img.shields.io/github/package-json/v/gustavoerivero/venecodollar" alt="project version" />
  <img src="https://img.shields.io/github/license/gustavoerivero/venecodollar" alt="project license" />
  <img src="https://img.shields.io/github/contributors/gustavoerivero/venecodollar" alt="project collabs" />
  <img src="https://img.shields.io/github/last-commit/gustavoerivero/venecodollar" alt="project last commit" />
  <img src="https://img.shields.io/github/languages/count/gustavoerivero/venecodollar" alt="project languages" />
  <img src="https://img.shields.io/github/languages/top/gustavoerivero/venecodollar" alt="project major language percent" />
</div>

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> Inglés </a></td>
          <td><a href="./README-ES.md"> Español </a></td>
      </tr>
  </table>
</div>

Venecodollar es una librería Typescript que provee dos métodos asíncronos para obtener un objeto JSON con los diferentes valores que ha asumido el dólar en bolívares.

## Instalación

Para instalar la librería, puede utilizar los diferentes gestores de paquetes:

### NPM

Para el caso de [NPM](https://nodejs.org/es):

```bash
npm install venecodollar
```

### Yarn

En cambio, con [Yarn](https://yarnpkg.com/) sería de la siguiente manera:

```bash
yarn add venecodollar
```

## Uso

En cuanto al uso de la librería, primero es necesario importar los métodos que permiten obtener los valores.

Esto se puede hacer de dos maneras:

```javascript
import { getDollarPrices, getDollarPricesWithAverage } from 'venecodollar' 
```

Or

```javascript
const { getDollarPrices, getDollarPricesWithAverage } = require('venecodollar')
```

Dicho esto, hay que destacar que ambos métodos son asíncronos, por lo que es necesario trabajarlos en funciones async/await o como promesas. Algunos ejemplos de esto pueden ser:

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

### Métodos

El paquete dispone de dos (2) métodos, getDollarPrices() y getDollarPricesWithAverage().

#### getDollarPrices()

Este método devuelve dos posibles valores. En el caso de no haber podido conectarse a los servicios que proporcionan los valores, devolverá null. Sin embargo, si logra conectarse, devolverá un array con las entidades encargadas de controlar el valor del dólar.

Cada elemento del array estará formado por el título de la entidad, el valor del dólar y la fecha de su última actualización. Un ejemplo de esto es el siguiente:

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

De forma similar a getDollarPrices(), este método devuelve dos posibles valores. En caso de no conectarse a los servicios, devolverá el valor nulo. En cambio, si se conecta, devolverá un objeto que tendrá la fecha en que se consultó el servicio, el promedio de todas las entidades cuyo valor en dólares es mayor que cero (0) y un array con todas las entidades cuya información se consulta. Un ejemplo de esto es el siguiente:

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

### Tipos

Del mismo modo, el paquete fue diseñado utilizando typescript, por lo que es posible hacer uso de la tipificación de métodos. Para ello, es necesario importar los tipos de datos directamente desde su carpeta:

```javascript
import { DollarType, DollarArrayType, EntityType, DollarAverageType } from 'venecodollar/src/types/DollarType' 
```

O

```javascript
const { DollarType, DollarArrayType, EntityType, DollarAverageType } = require('venecodollar/src/types/DollarType')
```

Como se puede observar, existen cuatro (4) tipos de datos, de los cuales podemos destacar DollarType, DollarArrayType, EntityType y DollarAverageType. 

#### DollarType

```typescript
type DollarType = {
  title: string
  dollar: number
  updatedDate: string
}
```

#### DollarArrayType

```typescript
type DollarArrayType = {
  title: string
  dollar: number
  updatedDate: string
}[]
```

#### EntityType

```typescript
type EntityType = {
  entity: string
  info: DollarType
}
```

#### DollarAverageType

```typescript
type DollarAverageType = {
  date: Date
  average: number
  entities: EntityType[]
}
```

## Contribuciones

Se aceptan pull requests. Para cambios mayores, por favor abra un issue primero para discutir lo que le gustaría cambiar.

Por favor, asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

---
⌨️ hecho con ❤️ por [gustavoerivero](https://github.com/gustavoerivero) 