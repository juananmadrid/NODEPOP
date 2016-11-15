# Práctica 2: NodeJS, Express y MongoDB
## Juan A. Caballero
-----------------------------------------------

NOTAS PREVIAS
-----------------------------------------------

En primer lugar, quiero expresar que éste es el primer código que hago en toda mi vida, nunca he programado nada antes. Es por ello que si algunas funcionalidades no están al completo como se habían pedido es porque después de intentarlo por todas las formas que he podido mis limitados conocimientos no son suficientes, por ahora, pues intentarlo lo he intentado.

Tamién quiero indicar que no me di cuenta hasta el último día al repasar el enunciado de la práctica que éste incluye unas "Notas para el desarrollador", con lo que muchas cosas las he hecho como he podido después de investigar mucho y quizás no se hayan desarrollado con esas sugerencias, y otras me ha costado más al no haber usado esa información. Tampoco me di cuenta que la api había que llamarla nodepop, pensé que era el nombre del proyecto, y no me atrevo a cambiarlo con un refactor después de tenerlo todo acabado por si me da algún problema que no sepa solucionar, aunque supongo que no debería.

LA API
-----------------------------------------------

La API aquí propuesta pretende cubrir el objetivo solicitado por el cliente de ofercer una api que hemos llamado API para el servicio Nodepop, con la que se comunicará tanto la app versión iOS como la versión Android.

Para la práctica se ha creado una base de datos en MongoDB llamada nodepop, con dos colecciones: 

- articulos, que contiene los artículos, con los registros: name, type (busqueda o venta), prize, tag (work, lifestyle, motor, moible), image (nombfe del fichero con la imagen del artículo)

- usuarios, que contiene los usuarios, con los registros: name, password, mail


MÉTODOS DE LISTADO Y FILTROS
-----------------------------------------------

Se incluyen los métodos de listado y filtrado de artículos por sus campos. Los resultados se muestran en formato JSON tras intentarlo sin éxito en html, dado mi absoluto desconocimiento de html. Los métodos propuestos son los siguientes:

Las peticiones de listado deberán incluir token devuelto tras registrarse, y se incluiré en body, headers o por query con el formato siguiente:

AUTENTICACIÓN para listado de artículos. Formato:

      En cabecera: x-access-token = token nº
      En query:    token = token nº
      En body:     token = token nº
   
PETICIONES GET DE LISTADO 

      Ruta:  http://localhost:3000/apiv1/articulos
      Tipo:  GET
      
FILTROS en QUERY:

     - name 	= caracteres_iniciales_del_nombre
     - prize 	= precio_exacto
     - minp 	= precio_minimo
     - maxp 	= precio_maximo
     - type 	= busqueda_o_venta
     - tag	= work_o_lifestyle_o_motor_o_movil

MÉTODOS DE REGISTRO Y AUTENTICACIÓN DE USUARIOS
-----------------------------------------------

El API propuesto restringe el acceso a consultas de artículos a usuarios registrados. Para ello, se ha propuesto como método de autenticación JSON WEB TOKEN (JWT) por su amplia implantación en App's móviles. 

Los métodos propuestos para el registro de usuarios y obtención de token para poder listar artículos son los siguientes.

REGISTRO DE USUARIOS 

      Ruta:  http://localhost:3000/apiv1/users
      Tipo:  POST
      Incluimos en el BODY los parámetros:
         - name 
         - password

    
AUTENTICACIÓN (para obtener token con que hacer consultas de articulos)

      Ruta:  http://localhost:3000/apiv1/users/login
      Tipo:  POST
      Incluimos en el BODY los parámetros:
         - user
         - pass

En este apartado me ha faltado incluir un método en el registro de usuarios que no permita su duplicación. Lo he intentado de varias formas pero no me ha funcionado bien, así que lo he omitido. 


FUNCIONALIDAD DE IDIOMA PARA RESPONDER ERRORES
-----------------------------------------------

El API proporciona respuestas ante errores en idiomas inglés y español según el idioma de la petición. Para ello, se especificará con el parámetro languague, 
      Incluimos en el HEADERS:
         - language = es-ES (para español)
         - El resto en inglés, se especifique o no (por defecto)
 
 
FUNCIONALIDAD DE CLUSTER
-----------------------------------------------

El api proporciona también una funcionalidad de cluster que permite arrancar tantos hilos de programa, llamados clones, como CPUs tenga el servidor donde se instale el API aquí propuesto. Así aprovechamos al máximo los recursos del servidor para los momentos de máxima demanda de peticiones.


