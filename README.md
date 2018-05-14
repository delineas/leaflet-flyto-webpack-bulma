# leaflet-flyto-webpack-bulma
En este repositorio encontrarás un ejemplo de como trabajar con [Leaflet](http://leafletjs.com/), [webpack](https://webpack.js.org/) y [Bulma](http://bulma.io).

**[Ver demo](https://www.danielprimo.io/labs/leaflet-flyto-webpack-bulma)**

**[Más información](https://www.danielprimo.io/podcast/35)**

## Instalación
Navega en la terminar hasta la carpeta donde hayas descargado el código y ejecuta
```npm install```

Esto instalará todas las dependencias necesarias

A continuacón ejecuta
```npm run build```

Por último con este comando crearás un servidor web local
```npm run serve```

Abre esta dirección en tu navegador (o la IP que te informe en consola el sistema)
`http://127.0.0.1:8080`

## Uso
La aplicación muestra como se ha utilizado el framework Bulma para los estilos del layout, Leaflet para mostrar contenidos en el mapa y Webpack para integrar todas las librerias de JavaScript. En la medida de lo posible se ha utilizado EcmaScript 6. 

Si quieres ejecutar el sistema en modo de desarrollo basta con crear el servidor local y además ejecutar este comando.
```npm run develop```

Puedes alterar los datos que se cargan en el mapa utilizando el fichero `./src/data/places.csv`. Recuerda que una vez modificado tienes que volver a compilar el sistema.

| id                     | lat     | lon      | name   | description | photo                | owner                              |
|------------------------|---------|----------|--------|-------------|----------------------|------------------------------------|
| Identificador numérico | Latitud | Longitud | Nombre | Descripción | Fichero de la imagen | Enlace al propietario de la imagen |

Las imágenes están en `./src/img`. El nombre de la columna `photo` debe coincidir con el nombre de las imágenes que quieras utilizar de esta carpeta. Las imágenes visibles en la demo no están disponibles en este repositorio.

### Librerías
* Mapas con [Leaflet](http://leafletjs.com/)
* Base para la configuración [leaflet-webpack](https://github.com/btpschroeder/leaflet-webpack)
* Lectura de datos con [leaflet-onmivore](https://github.com/mapbox/leaflet-omnivore)
* Marcadores con estilos gracias a [leaflet-extramarkers](https://www.npmjs.com/package/leaflet-extra-markers)
* Layout con [Bulma](http://bulma.io)

## Todo

* Modularizar 
* Componentes
* Descripción en inglés
* Y un montón de cosas más
