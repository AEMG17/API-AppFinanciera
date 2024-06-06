# Personal Finances API

* LA API para ser utlizada por aplicación móvil, programada en JavaScript utilizando express en el entorno de ejecución de Node, la base de datos utilizada es SQLite mediante Turso APP.
## Endpoints 

`/api/finances/incomes` - **GET**: Recibe todos los ingresos de un usuario, debe ser enviado el token de autenticación mediante headers en el atributo 'x-access-token'.

`/api/finances/incomes` - **POST**: Añade un nuevo movimiento de tipo ingreso (+), mediante JSON con el objeto {title: '', amount: ''} y el token de acceso.

`/api/finances/incomes/:id` - **DELETE**: Envia el ID del registro a eliminar y un token de autenticación en el header

`/api/finances/incomes/:id` - **PUT**: Envia el ID del registro a  modificar y los mismos campos de la creación de un ingreso.


`/api/finances/bills` - **GET**: Recibe todos los gastos de un usuario, debe ser enviado el token de autenticación mediante headers en el atributo 'x-access-token'.

`/api/finances/bills` - **POST**: Añade un nuevo movimiento de tipo gasto (-), mediante JSON con el objeto {title: '', amount: ''} y el token de acceso.

`/api/finances/bills` - **DELETE**: Envia el ID del registro a eliminar y un token de autenticación en el header

`/api/finances/bills` - **PUT**: Envia el ID del registro a  modificar y los mismos campos de la creación de un gasto.


`/api/auth/users` - **GET**: Recibe la información del usuario solicitante, enviar token en headers.

`/api/auth/users` - **POST**: Registra un nuevo usuario con el JSON {name: '', email: '', password: ''} recibira un token si es exitoso.

`/api/auth/signin` - **POST**: Inicia sesión con el JSON {email: '', password: ''} recibira un token si es exitosa la petición.

`/api/auth/image` - **PUT**: Modifica la imagen de un usuario, envia un formData con el elemento "image" y un token de autenticación.


## Comandos

*Es necesario tener descargado NodeJS y NPM localmente para que funcione el modo de desarrollo*

`npm install` Comando para descargar las dependencias, previas a iniciar la app.

`npm run deploy` Comando para lanzar versión de produción.

`npm run dev` Comando para lanzar versión de desarrollo.

## Variables de Entorno

*En el archivo .env se encuentran todas las variables necesarias para configurar la API, recomendable solo modificar las claves JWT y credenciales de Turso.*


## SQL Query
*Queries utiilizadas para crear las diferentes tablas.*

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