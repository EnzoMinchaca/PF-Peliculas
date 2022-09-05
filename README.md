![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Grupal Project - Henry Movies

<img height="150" src="./movie.jpg" />

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y MongoDB.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT Branch.
- Utilizar Metodologías Ágiles - SCRUM
- Trabajar en equipo

## Comenzando

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para comenzar a trabajar

Tendrán un `boilerplate` con la estructura general tanto del servidor como de cliente.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

- __Node__: 12.18.3 o mayor
- __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

```bash
node -v
npm -v
```

__ACLARACIÓN:__ Las dependencias actuales se encuentran en las versiones que venimos trabajando durante el bootcamp.

Versiones:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3
- __redux-toolkit__:


> __IMPORTANTE:__ Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.


El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver las distintas Movies desde la base de datos y a partir de ella poder, entre otras cosas:

- Buscar movies
- Filtrarlas / Ordenarlas
- Crear nuevas movies



### Requerimientos mínimos

A continuación se detallaran los requerimientos mínimos para el desarrollo del proyecto:


#### Tecnologías necesarias

- [ ] React
- [ ] Redux - Toolkit
- [ ] Express
- [ ] MongoDB

## Frontend

Se debe desarrollar una aplicación de React/Redux Toolkit que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar movies por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se verá el listado de movies. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /movies` y deberá mostrar su:
  - Imagen
  - Nombre
  - Géneros
  - Duración
  - Reparto
  - Director 
- [ ] Botones/Opciones para filtrar por geénero o categoría de movie así como por plataforma
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las movies por rating y por fecha. 
- [ ] Paginado para ir buscando y mostrando las siguientes movies.


__Ruta de detalle de Movie__: debe contener

- [ ] Los campos mostrados en la ruta principal para cada movie (imagen, nombre, género, plataforma)
- [ ] Número de Movie (id)
- [ ] Duración
- [ ] Reparto
- [ ] Director

__Ruta de creación__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle de la movie
- [ ] 
- [ ] Botón/Opción para crear un nueva movie

> El formulario de creación debe estar validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la Movie no pueda contener caracteres numéricos, entre otros. 

## Base de datos

----

## Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:



- [ ] __GET /movies__:
  - Obtener un listado de las movies
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /movie/{idMovie}__:
  - Obtener el detalle de una movie en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de movie
- [ ] __GET /movie?name="..."__:
  - Obtener la movie que coincida exactamente con el nombre pasado como query parameter (Puede ser de la api o creado por nosotros)
  - Si no existe ninguna movie mostrar un mensaje adecuado
- [ ] __POST /movie__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de movies por body
  - Crea una movie en la base de datos relacionado con sus categorías o género.
- [ ] __GET /category__:
  - Obtener todos las categorías de las movies
- [ ] __GET /plataform__:
  - Obtener todos las plataformas de las movies

