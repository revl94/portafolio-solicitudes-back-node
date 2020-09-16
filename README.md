![Logo](https://cs.intelix.biz/logo/pic.png "InteliX")

# Portafolio de Solicitudes Intelix
## v-0.0.1

## 1. Introducción.
 El aplicativo se utiliza para llevar a cabo seguimientos y evaluación de avances de todas las solicitudes y proyectos por parte de los clientes de Intelix.

## 2. Funcionalidad.
 De que se trata funcionalmente la aplicación así como enlace a documentación externa en caso que se cuente con ella.

## 3. Tipos de conexión.

- Conexión: http://10.48.13.156
- Comunicación: json.
- Puertos: 
    - Aplicación: 3050.
    - Base de Datos: 3306.
    
## 4. Generalidades sobre la implementación.
 Acá se cubren aspectos como:
 
 - Tecnologías usadas:
    - Node.js
    - Express
    - Sequelize ORM.
    - MySQL.
    
    
 - Árbol de Aplicación   
  
    + portafolio/
        + src/              
             - models/        : Se definen todas las entidades a utilizar que representan las tablas de base de datos de la aplicación.
               - routes/        : Se definen todos los archivos de rutas que utilizará la aplicación.
               - controllers/   : Se definen todos los controladores y servicios que manejara la logica de la aplicación.
               - bin/           : Se definen los archivos para configuración de constantes utilizadas en la aplicación.
         + config/             : Se definen los archivos para configuración del entorno de base datos de la aplicación.
         + package.json        : Archivo de instalación de todas las dependencias que necesita la aplicación
         + app.js              : Aplicación a ejecutar usando node.
         + .gitignore          : Archivo para ignorar carpetas y ficheros en el repositorio.
         + .sequelizerc        : Archivo para configuración de el ORM Sequelize
     
  - Nivel de conocimiento que se requiere para esta aplicación:
  -   Se requiere un nivel de conocimiento intermedio de las tecnologias para entender los flujos de procesos aplicados en el aplicativo.
   

 
## 5. Configuración y Despliegue.

Aspectos a considerar:

- Se describe el proceso de instalación y despliegue para la aplicación.
- Seguirlo paso a paso debería garantizar la correcta instalación y posterior despliegue o puesta en funcionamiento de los servicios. 
- Cualquier tipo de contingencia o caso atípico que se pudiera presentar durante el despliegue en un ambiente determinado será documentado en esta fase en el punto **5.4 Resolución de problemas**.

### 5.1. Prerrequisitos.

Aspectos a considerar:

Instalación de aplicativos
- Node.js >= v12.13.1
- NPM     >= v6.12.1
- MySQL   >= v5.7.9


- Dependencias a instalar, paquetes adicionales, configuraciones, aplicaciones adicionales como servidor web, servidor de base de datos, etc.

### 5.2. Instalación y configuración.

Paso a paso a seguir para la instalación propiamente de la aplicación, como por ejemplo:

1. Clonar el repositorio con `git`.

    `https://git.intelix.biz/web/portafolio-solicitudes-intelix/backend.git` 
2. Acceder a la carpeta donde se haya descargado todo el código fuente del servicio.
    `cd backend`
3. Ejecutar `npm install` para instalar todas las dependencias necesarias del servicio.
Tómese en cuenta que **Serve** y **Yarn** deben ser instalados con anterioridad. Además,
**Serve** es una dependencia global de Node JS la cual debe ser instalada con la orden
`npm install serve -g` en  tanto que **Yarn**, se suele instalar siguiendo algunos de
los métodos recomendados para el sistema operativo base que tendrá el ambiente de
despliegue. Para más información visitar este [enlace](https://google.com/).
4. Editar los archivos `uno.js` y `dos.js` que se encuentran en la
ruta `path/to/source/aplicacion_ejemplo/src/config` con los que se configurarán.

```javascript
  // uno.js

  export const secretKey = some_string_token;
  export const expirationTime = some_integer_value;
```

  en donde `some_string_token` es una cadena de caracteres generada con el módulo `jsonwebtoken`
  o JWT, y `some_integer_value` es el tiempo de expiración del token expresado en segundos. Por
  otro lado se tiene

```javascript
  // dos.js

  const serviceHost = some_URI;
  const servicePort = some_PORT;

  export const serviceHostPort = serviceHost + ":" + servicePort;
```

  en donde `some_URI` puede ser una dirección IP o una alias asignado por un DNS, y `some_PORT` un
  número entero que indica el puerto a través del cual se puede acceder al servicio. Por defecto
  este valor será el **8020**.
  
5. Crear archivo .env en la raiz del proyecto con la siguiente configuración:
    ```
      DB_USERNAME = <usuario BD>
      DB_PASSWORD = <contraseña BD>
      DB_NAME = request_portfolio
      DB_HOSTNAME = 10.48.13.158
      DB_PORT = 3306
      DB_DIALECT = mysql
      NODE_ENV = qa
 
6. Ejecutar el comando en consola `npm start`.   `

### 5.3. Configuración de base de datos.

- Motor de Base de Datos: MYSQL
- Version: 5.7.9
- Usuario MYSQL: userdb
- Nombre de Base de Datos: request_portfolio
- Script Base de Datos: request_portfolio.sql

En esta sección se especificará cualquier cambio, configuración, instalación que se requiera a nivel de base de datos, permisos especiales, acceso a scripts de cración y llenado de datos, etc.

### 5.4. Ejecución.

En esta sección se deben considerar los siguientes pasos:

- Pasos a seguir para la ejecución de la aplicación.
- - Luego de tener todo instalado se debe proceder a ejecutar el comando
-       `npm start`
- Usuario con el que debe ser ejecutada la aplicación en caso que aplique.
- Permisología con la que debe contar el usuario en caso que aplique.
- Línea de código o procedimiento para ejecución de la aplicación.
- Tareas automáticas que deban crearse para garantizar la ejecución del mismo. 
- No debe ser una especificación técnica si no se tiene, por ejemplo:
	- Se debe crear un script que garantice la ejecución diaria automática de la aplicación.
	- Se debe crear una tarea planificada a tal hora, de tal día a tal día.
	- Se debe realizar el llamado al script que se suministra a continuación bajo permisología de **root**, **administrador**, **qsecofr**, etc.

### 5.5. Resolución de problemas.

Como se comentó en un punto anterior, acá se especificará información adicional que considere el área de desarrollo que se deba tener en cuenta en caso que al momento de la ejecución de cualquiera de las etapas se obtenga algún error, por ejemplo:

- Fallo en la instalación de algún paquete.
- Fallo en la configuración de la aplicación.
- Fallo al realizar el arranque de la aplicación.
- Cualquier otro problema que haya tenido el área de desarrollo durante el ciclo de vida del mismo. 

---
_(c) 2020 Intelix Synergy C.A. Documentación técnica de aplicación **v1.0.0**_
