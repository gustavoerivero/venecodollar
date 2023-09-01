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
          <td><a href="./README.md"> Inglés </a></td>
          <td><a href="./README-ES.md"> Español </a></td>
      </tr>
  </table>
</div>

Venecodollar es una librería TypeScript que proporciona dos métodos asincrónicos para obtener un objeto JSON con los diferentes valores que ha asumido el dólar en bolívares. Esta librería es útil para proyectos en JavaScript o TypeScript que requieran obtener información actualizada sobre el tipo de cambio del dólar en bolívares de Venezuela.

Los datos son obtenidos desde [monitordolarvenezuela](https://monitordolarvenezuela.com/)

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
import { getDollarPrices, getDollarPricesWithAverage, calculateBsToDollar, calculateDollarToBs } from 'venecodollar' 
```

Or

```javascript
const { getDollarPrices, getDollarPricesWithAverage, calculateBsToDollar, calculateDollarToBs } = require('venecodollar')
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

El paquete dispone de dos (4) métodos, getDollarPrices(), getDollarPricesWithAverage(), calculateBsToDollar(bs: number) y calculateDollarToBs(dollar: number).

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

### calculateBsToDollar(bs: number)

La respuesta retornada por este método es muy similar a getDollarPrices(), sin embargo, tiene una particularidad notoria y, es que cada entidad perteneciente al arreglo estará conformada por tres elementos muy notorios: entity, siendo el nombre de la entidad, info que contiene el título de la entidad, su valor en dólares y la fecha en que actualizó el valor y, por último, bsCalculated, que representaría el cálculo realizado para conocer el valor del monto en bolívares, pasado como parámetro en términos de dólares.

```javascript
[
  {
    "entity": "@MonitorDolarWeb",
    "info": {
      "title": "@MonitorDolarWeb",
      "dollar": 27.43,
      "updatedDate": "10:00 PM, 06/06/2023"
    },
    "dollarCalculated": 0.98
  },
  {
    "entity": "@EnParaleloVzlaVip",
    "info": {
      "title": "@EnParaleloVzlaVip",
      "dollar": 27.48,
      "updatedDate": "10:00 PM, 06/06/2023"
    },
    "dollarCalculated": 1.10
  }
]
```

### calculateDollarToBs(dollar: number)

Este método representaría el cálculo similar al método calculateBsToDollar pero, en lugar de calcular el valor del monto expresado en bolívares en dólares, este método mostraría las entidades con el cálculo realizado para cada una de ellas en términos de dólares.

```javascript
[
  {
    "entity": "@MonitorDolarWeb",
    "info": {
      "title": "@MonitorDolarWeb",
      "dollar": 27.43,
      "updatedDate": "10:00 PM, 06/06/2023"
    },
    "bolivarCalculated": 1371.5
  },
  {
    "entity": "@EnParaleloVzlaVip",
    "info": {
      "title": "@EnParaleloVzlaVip",
      "dollar": 27.48,
      "updatedDate": "10:00 PM, 06/06/2023"
    },
    "bolivarCalculated": 1374
  }
]
```

### Tipos

Del mismo modo, el paquete fue diseñado utilizando TypeScript, por lo que es posible hacer uso de la tipificación de métodos. Para ello, es necesario importar los tipos de datos directamente desde su carpeta:

```javascript
import { DollarType, DollarArrayType, EntityType, DollarAverageType } from 'venecodollar/src/types/DollarType' 
```

O

```javascript
const { DollarType, DollarArrayType, EntityType, DollarAverageType } = require('venecodollar/src/types/DollarType')
```

Como se puede observar, existen ocho (8) tipos de datos, de los cuales podemos destacar TDollar, TDollarArray, TEntity, TDollarAverage, TDollarCalculated, TBsCalculated, TDollarCalculatedAverage y TBsCalculatedAverage. 

#### TDollar

```TypeScript
type TDollar = {
  title: string
  dollar: number
  updatedDate: string
}
```

#### TDollarArray

```TypeScript
type TDollarArray = {
  title: string
  dollar: number
  updatedDate: string
}[]
```

#### TEntity

```TypeScript
type TEntity = {
  entity: string
  info: DollarType
}
```

#### DollarAverageType

```TypeScript
type TDollarAverage = {
  date: Date
  average: number
  entities: TEntity[]
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

## Referencia API

El paquete también está desplegado y funciona como API para aquellos usuarios que no quieran o no puedan incorporarlo a sus proyectos como dependencia. 

Para acceder a la API deben utilizar la ruta https://venecodollar.vercel.app/api/v2.

Asimismo, pueden acceder a la documentación hecha en swagger para el proyecto ubicada aquí [documentación de la API venecodollar](https://venecodollar.vercel.app/api/doc).

#### Obtener todas las entidades

```http
  GET /api/v2/dollar
```

Este endpoint permite obtener todas las entidades de seguimiento del dólar con su respectivo nombre y fecha de última actualización, así como una media de todas las entidades activas (es decir, las que tienen un valor del dólar superior a cero).

#### Obtener entidades por un nombre

```http
  GET /api/v2/dollar/entity?name=${name}
```

| Parámetro Tipo Descripción |
| :------------------------- | :------- | :----------------------------------------------- |
| `name`                     | `string` | **Required**. Nombre de las entidades a obtener. |

Este endpoint permite obtener todas las entidades de seguimiento del dólar por el nombre proporcionado en el parámetro de la ruta. Si el nombre proporcionado coincide con más de una entidad, el endpoint devuelve una media de los valores dados por las entidades y la información de cada una de estas entidades. Si el nombre proporcionado coincide sólo con una entidad, el endpoint devolverá la información sólo para esa entidad.

#### Calcular Bs

```http
  GET /api/v2/dollar/toBs?dollar=${dollar}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `dollar`      | `number` | **Required**. Monto en dólares a ser calculado en bolívares. |
| `entity`      | `string` | Nombre de entidades a obtener |

Este endpoint permite obtener todas las entidades de monitoreo de dólares calculando el valor del dólar pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

#### Calcular Dólar

```http
  GET /api/v2/dollar/toDollar?bs=${bs}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `bs`      | `number` | **Required**. Monto en bolívares a ser calculado en dólares. |
| `entity`      | `string` | Nombre de entidades a obtener. |

Este endpoint permite obtener todas las entidades de monitoreo de dólares calculando el valor del dólar pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

## Contribuciones

Se aceptan pull requests. Para cambios mayores, por favor abra un issue primero para discutir lo que le gustaría cambiar.

Por favor, asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

---
⌨️ hecho con ❤️ por [gustavoerivero](https://github.com/gustavoerivero) 