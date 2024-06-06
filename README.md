# Personal Finances API

* API creada para ser utilizada por una aplicación móvil, programada en JavaScript utilizando express en el entorno de ejecución de Node, la base de datos utilizada es SQLite mediante Turso APP.

## Comandos

Es necesario tener descargado NodeJS y NPM localmente para que funcione el modo de desarrollo

`npm install` Comando para descargar las dependencias, previas a iniciar la app.

`npm run deploy` Comando para lanzar versión de produción.

`npm run dev` Comando para lanzar versión de desarrollo.

## Variables de Entorno

En el archivo .env están las variables necesarias para configurar la API, si se quisiera ingresar otra base de datos, únicamente modificar las claves JWT y credenciales de Turso. Éstas pueden ser obtenidas creando una nueva Base de datos, una vez dentro de Databases, seleccionamos la que creamos y podemos encontrar en las opciones "Generate Token" que sería la clave JWT que se puede cambiar y la URL de la DB.


## SQL Query
Queries utiilizadas para crear las diferentes tablas.

```sql
CREATE TABLE
  users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(250),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(250)
  );
CREATE TABLE
  bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );
CREATE TABLE
  incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );