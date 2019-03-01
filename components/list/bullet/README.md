# ListBullet

> The status spot can has the success, error and alert color.
> We can use the status: high, medium or low to assign the different colors.

<!-- ![](./assets/preview.png) -->

## Installation

```sh
$ npm install @schibstedspain/sui-list-bullet --save
```

## Usage

### Basic usage
```js
import ListBullet from '@schibstedspain/sui-list-bullet'

const listItems = [
  {
    illustration: 'https://s.ccdn.es/images/motivation-search.svg',
    title: 'Publica con total seguridad',
    description:
      'Te damos todas las herramientas para un proceso de venta seguro'
  },
  {
    illustration: 'https://s.ccdn.es/images/motivation-trust.svg',
    title: 'Gestiona tu anuncio según tus necesidades',
    description: 'Edita y renueva tu anuncio tantas veces como necesites'
  }
]

return (<ListBullet listItems={listItems} responsive />)
```


> **Find full description and more examples in the [demo page](#).**