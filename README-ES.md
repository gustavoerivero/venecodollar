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

Venecodollar es una librería TypeScript que proporciona algunas funciones asíncronas para obtener un objeto JSON con los diferentes valores que ha asumido el dólar o el euro en bolívares. Esta librería es útil para proyectos en TypeScript o TypeScript que requieran obtener información actualizada sobre el tipo de cambio del dólar o del euro en bolívares, moneda local de Venezuela.

Los datos son obtenidos desde [ExchangeMonitor](https://exchangemonitor.net/)

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

En cuanto al uso de la librería, primero es necesario importar las funciones que permiten obtener los valores.

Esto se puede hacer de varias maneras, entre ellas:

```TypeScript
import * as Venecodollar from "venecodollar"
```

o

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

Dicho esto, hay que destacar que las funciones son asíncronas, por lo que es necesario trabajarlos en funciones async/await o como promesas. Algunos ejemplos de esto pueden ser:

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

### Funciones

El paquete dispone de dos (4) funciones, getDollarPrices(), getDollarPricesWithAverage(), calculateBsToDollar(bs: number) y calculateDollarToBs(dollar: number).

La librería tiene a su disposición ocho (9) funciones. Cuatro (4) para valores del dólar y cuatro (4) para valores del euro:

* Funciones para valores de dólares:
  
- getDollarPrices()
- getDollarPricesWithAverage()
- calculateBsToDollar(bs: number)
- calculateDollarToBs(dollar: number)
  
* Funciones para valores de euros:
  
- getEuroPrices()
- getEuroPricesWithAverage()
- calculateBsToEuro(bs: number)
- calculateEuroToBs(euro: number)

#### Funciones para valores de dólares

##### getDollarPrices()

Esta función devuelve dos posibles valores. En el caso de no haber podido conectarse a los servicios que proporcionan los valores, devolverá null. Sin embargo, si logra conectarse, devolverá un array con las entidades encargadas de controlar el valor del dólar.

Cada elemento del array estará formado por el título de la entidad, el valor del dólar, la fecha de su última actualización, la imágen del monitor, la deferencia del valor del dólar con el valor previo, la diferencia en porcentaje, la tendencia (si bajó su valor o subió con respecto a su última actualización) y el color de tendencia (si subió, verde, pero si bajó, rojo). Un ejemplo de esto es el siguiente:

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

De forma similar a getDollarPrices(), esta función devuelve dos posibles valores. En caso de no conectarse a los servicios, devolverá el valor nulo. En cambio, si se conecta, devolverá un objeto que tendrá la fecha en que se consultó el servicio, el promedio de todas las entidades cuyo valor en dólares es mayor que cero (0) y un array con todas las entidades cuya información se consulta. Un ejemplo de esto es el siguiente:

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

La respuesta retornada por esta función es muy similar a getDollarPrices(), sin embargo, tiene una particularidad notoria y, es que cada entidad perteneciente al arreglo estará conformada por tres elementos muy llamativos: entity, siendo el nombre de la entidad, info que contiene el título de la entidad, su valor en dólares y la fecha en que actualizó el valor y, por último, dollarCalculated, que representaría el cálculo realizado para conocer el valor del monto en dólares, pasado como parámetro en términos de bolívares.

##### calculateDollarToBs(dollar: number)

Esta función representaría el cálculo similar al función calculateBsToDollar pero, en lugar de calcular el valor del monto expresado en dólares, sería en bolívares, Esta función mostraría las entidades con el cálculo realizado para cada una de ellas en términos de bolívares.

#### Funciones para valores de euros

##### getEuroPrices()

Esta función devuelve dos posibles valores. En el caso de no haber podido conectarse a los servicios que proporcionan los valores, devolverá null. Sin embargo, si logra conectarse, devolverá un array con las entidades encargadas de controlar el valor del euro.

Cada elemento del array estará formado por el título de la entidad, el valor del euro, la fecha de su última actualización, la imágen del monitor, la deferencia del valor del euro con el valor previo, la diferencia en porcentaje, la tendencia (si bajó su valor o subió con respecto a su última actualización) y el color de tendencia (si subió, verde, pero si bajó, rojo). Un ejemplo de esto es el siguiente:

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

De forma similar a getEuroPrices(), esta función devuelve dos posibles valores. En caso de no conectarse a los servicios, devolverá el valor nulo. En cambio, si se conecta, devolverá un objeto que tendrá la fecha en que se consultó el servicio, el promedio de todas las entidades cuyo valor en euros es mayor que cero (0) y un array con todas las entidades cuya información se consulta. Un ejemplo de esto es el siguiente:

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

La respuesta retornada por esta función es muy similar a getEuroPrices(), sin embargo, tiene una particularidad notoria y, es que cada entidad perteneciente al arreglo estará conformada por tres elementos muy llamativos: entity, siendo el nombre de la entidad, info que contiene el título de la entidad, su valor en euros y la fecha en que actualizó el valor y, por último, euroCalculated, que representaría el cálculo realizado para conocer el valor del monto en euros, pasado como parámetro en términos de bolívares.

##### calculateEuroToBs(euro: number)

Esta función representaría el cálculo similar al función calculateBsToEuro pero, en lugar de calcular el valor del monto expresado en euros, sería en bolívares, Esta función mostraría las entidades con el cálculo realizado para cada una de ellas en términos de bolívares.

### Tipos

Del mismo modo, el paquete fue diseñado utilizando TypeScript, por lo que es posible hacer uso de la tipificación de funciones. Para ello, es necesario importar los tipos de datos directamente desde su carpeta:

```TypeScript
import { DollarType, DollarArrayType, EntityType, DollarAverageType } from 'venecodollar/src/types/DollarType' 
```

O

```TypeScript
const { TEuro, TEuroEntity, TEuroAverage, TEuroCalculated, TBsCalculated, TEuroCalculatedAverage, TBsCalculatedAverage } = require('venecodollar/src/types/DollarType')
```

Como se puede observar, existen catorce (14) tipos de datos, de los cuales podemos destacar TDollar, TDollarEntity, TDollarAverage, TDollarCalculated, TBsCalculated, TDollarCalculatedAverage, TBsCalculatedAverage, TEuro, TEuroEntity, TEuroAverage, TEuroCalculated, TBsCalculated, TEuroCalculatedAverage y TBsCalculatedAverage.

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

## Referencia API

El paquete también está desplegado y funciona como API para aquellos usuarios que no quieran o no puedan incorporarlo a sus proyectos como dependencia.

Para acceder a la API deben utilizar la ruta [https://venecodollar.vercel.app/api/v2](https://venecodollar.vercel.app/api/v2).

Asimismo, pueden acceder a la documentación hecha en swagger para el proyecto ubicada aquí [documentación de la API venecodollar](https://venecodollar.vercel.app/api/doc).

### Obtener todas las entidades con valores del dólar

```http
  GET /api/v2/dollar
```

Este endpoint permite obtener todas las entidades de seguimiento del dólar con su respectivo nombre y fecha de última actualización, así como una media de todas las entidades activas (es decir, las que tienen un valor del dólar superior a cero).

### Obtener todas las entidades con valores del euro

```http
  GET /api/v2/euro
```

Este endpoint permite obtener todas las entidades de seguimiento del euro con su respectivo nombre y fecha de última actualización, así como una media de todas las entidades activas (es decir, las que tienen un valor del euro superior a cero).

### Obtener entidades por un nombre con valores del dólar

```http
  GET /api/v2/dollar/entity?name=${name}
```

| Parámetro Tipo Descripción |
| :------------------------- | :------- | :----------------------------------------------- |
| `name`                     | `string` | **Required**. Nombre de las entidades a obtener. |

Este endpoint permite obtener todas las entidades de seguimiento del dólar por el nombre proporcionado en el parámetro de la ruta. Si el nombre proporcionado coincide con más de una entidad, el endpoint devuelve una media de los valores dados por las entidades y la información de cada una de estas entidades. Si el nombre proporcionado coincide sólo con una entidad, el endpoint devolverá la información sólo para esa entidad.

### Obtener entidades por un nombre con valores del euro

```http
  GET /api/v2/euro/entity?name=${name}
```

| Parámetro Tipo Descripción |
| :------------------------- | :------- | :----------------------------------------------- |
| `name`                     | `string` | **Required**. Nombre de las entidades a obtener. |

Este endpoint permite obtener todas las entidades de seguimiento del euro por el nombre proporcionado en el parámetro de la ruta. Si el nombre proporcionado coincide con más de una entidad, el endpoint devuelve una media de los valores dados por las entidades y la información de cada una de estas entidades. Si el nombre proporcionado coincide sólo con una entidad, el endpoint devolverá la información sólo para esa entidad.

### Calcular Bs con parámetro de dólar

```http
  GET /api/v2/dollar/toBs?dollar=${dollar}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `dollar`      | `number` | **Required**. Monto en dólares a ser calculado en bolívares. |
| `entity`      | `string` | Nombre de entidades a obtener |

Este endpoint permite obtener todas las entidades de monitoreo de dólares calculando el valor del dólar pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

#### Calcular Bs con parámetro de euro

```http
  GET /api/v2/euro/toBs?euro=${euro}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `euro`      | `number` | **Required**. Monto en euros a ser calculado en bolívares. |
| `entity`      | `string` | Nombre de entidades a obtener |

Este endpoint permite obtener todas las entidades de monitoreo de euros calculando el valor del euro pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

### Calcular Dólar con parámetro de bolívares

```http
  GET /api/v2/dollar/toDollar?bs=${bs}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `bs`      | `number` | **Required**. Monto en bolívares a ser calculado en dólares. |
| `entity`      | `string` | Nombre de entidades a obtener. |

Este endpoint permite obtener todas las entidades de monitoreo de dólares calculando el valor del dólar pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

### Calcular Euro con parámetro de bolívares

```http
  GET /api/v2/euro/toEuro?bs=${bs}&entity={entity}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `bs`      | `number` | **Required**. Monto en bolívares a ser calculado en euros. |
| `entity`      | `string` | Nombre de entidades a obtener. |

Este endpoint permite obtener todas las entidades de monitoreo de euros calculando el valor del euro pasado como parámetro en la ruta en términos de bolívares. Si se pasa como parámetro en la ruta el nombre de una entidad por la cual se desea filtrar, el endpoint devolverá sólo las entidades de monitoreo de dólares que coincidan con el parámetro pasado.

## Contribuciones

Se aceptan pull requests. Para cambios mayores, por favor abra un issue primero para discutir lo que le gustaría cambiar.

Por favor, asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

---
⌨️ hecho con ❤️ por [gustavoerivero](https://github.com/gustavoerivero)