Ubicados en este archivo `api` crear un archivo llamado: `.env`, el cual contendra los datos de su cadena de conexion obtenidos de MongoDB (en MongoBD Atlas -> connect -> connect your application), este tendra la siguiente forma:

```env
MONGODB_URI="mongodb+srv://nameDB:<password>@nameDB.123546.mongodb.net/?retryWrites=true&w=majority"
```

Reemplazar `nameDB` y `password` con tus propias credenciales para conectarte a MongoDB. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que tengas ya creada una base de datos llamada `movies`

