

Nombre de aplicación v0.0.1 

1. Introducción.
Se trata de una breve reseña de la aplicación.

2. Funcionalidad.
De que se trata funcionalmente la aplicación así como enlace a documentación externa en caso que se cuente con ella.

3. Tipos de conexión.


Se cubren aspectos como : conexión http, https, comunicacion por json, txt, objetos serializados, etc.


Requerimientos de puertos para la conexión de esta aplicación con otras.



4. Generalidades sobre la implementación.
Acá se cubren aspectos como:

Tecnología en la que ha sido desarrollado el componente.
Arbol de la aplicación.

Descripción de cada nodo: src, test, assets, config, etc. para los que apliquen


Nivel de conocimiento que se requiere para esta aplicación.


5. Configuración y Despliegue.
Aspectos a considerar:

Se describe el proceso de instalación y despliegue para la aplicación.
Seguirlo paso a paso debería garantizar la correcta instalación y posterior despliegue o puesta en funcionamiento de los servicios.
Cualquier tipo de contingencia o caso atípico que se pudiera presentar durante el despliegue en un ambiente determinado será documentado en esta fase en el punto 5.4 Resolución de problemas.


5.1. Prerrequisitos.
Aspectos a considerar:

Dependencias a instalar, paquetes adicionales, configuraciones, aplicaciones adicionales como servidor web, servidor de base de datos, etc.


5.2. Instalación y configuración.
Paso a paso a seguir para la instalación propiamente de la aplicación, como por ejemplo:

Clonar el repositorio con git.
Acceder a la carpeta donde se haya descargado todo el código fuente del servicio.
Ejecutar npm install para instalar todas las dependencias necesarias del servicio.
Tómese en cuenta que Serve y Yarn deben ser instalados con anterioridad. Además,
Serve es una dependencia global de Node JS la cual debe ser instalada con la orden
npm install serve -g en  tanto que Yarn, se suele instalar siguiendo algunos de
los métodos recomendados para el sistema operativo base que tendrá el ambiente de
despliegue. Para más información visitar este enlace.
Editar los archivos uno.js y dos.js que se encuentran en la
ruta path/to/source/aplicacion_ejemplo/src/config con los que se configurarán.

  // uno.js

  export const secretKey = some_string_token
  export const expirationTime = some_integer_value;
en donde some_string_token es una cadena de caracteres generada con el módulo jsonwebtoken
o JWT, y some_integer_value es el tiempo de expiración del token expresado en segundos. Por
otro lado se tiene
  // dos.js

  const serviceHost = some_URI;
  const servicePort = some_PORT;

  export const serviceHostPort = serviceHost + ":" + servicePort;
en donde some_URI puede ser una dirección IP o una alias asignado por un DNS, y some_PORT un
número entero que indica el puerto a través del cual se puede acceder al servicio. Por defecto
este valor será el 8020.

5.3. Configuración de base de datos.
En esta sección se especificará cualquier cambio, configuración, instalación que se requiera a nivel de base de datos, permisos especiales, acceso a scripts de cración y llenado de datos, etc.

5.4. Ejecución.
En esta sección se deben considerar los siguientes pasos:

Pasos a seguir para la ejecución de la aplicación.
Usuario con el que debe ser ejecutada la aplicación en caso que aplique.
Permisología con la que debe contar el usuario en caso que aplique.
Línea de código o procedimiento para ejecución de la aplicación.
Tareas automáticas que deban crearse para garantizar la ejecución del mismo.
No debe ser una especificación técnica si no se tiene, por ejemplo:

Se debe crear un script que garantice la ejecución diaria automática de la aplicación.
Se debe crear una tarea planificada a tal hora, de tal día a tal día.
Se debe realizar el llamado al script que se suministra a continuación bajo permisología de root, administrador, qsecofr, etc.




5.5. Resolución de problemas.
Como se comentó en un punto anterior, acá se especificará información adicional que considere el área de desarrollo que se deba tener en cuenta en caso que al momento de la ejecución de cualquiera de las etapas se obtenga algún error, por ejemplo:

Fallo en la instalación de algún paquete.
Fallo en la configuración de la aplicación.
Fallo al realizar el arranque de la aplicación.
Cualquier otro problema que haya tenido el área de desarrollo durante el ciclo de vida del mismo.


(c) 2019 Intelix Synergy C.A. Documentación técnica de aplicación v1.0.0