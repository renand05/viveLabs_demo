# 1 - Code execution.

<!-- ![Cloud SQL Build Status][ci-badge-cloudsql] ![Datastore Build Status][ci-badge-datastore] ![MongoDB Build Status][ci-badge-mongodb] -->

<!-- [ci-badge-datastore]: https://storage.googleapis.com/nodejs-getting-started-tests-badges/2-datastore.svg
[ci-badge-cloudsql]: https://storage.googleapis.com/nodejs-getting-started-tests-badges/2-cloudsql.svg
[ci-badge-mongodb]: https://storage.googleapis.com/nodejs-getting-started-tests-badges/2-mongodb.svg -->

This folder contains the sample code for the [Structured data][step-2]
tutorial. Please refer to the tutorial for instructions on configuring, running,
and deploying this sample.

[step-2]: https://cloud.google.com/nodejs/getting-started/using-structured-data

# Simple instructions

1.  Install [Node.js](https://nodejs.org/en/).

    * Optional: Install [Yarn](https://yarnpkg.com/).

1.  Install [git](https://git-scm.com/).
1.  Create a [Google Cloud Platform project](https://console.cloud.google.com).
1.  Install the [Google Cloud SDK](https://cloud.google.com/sdk/).

    * After downloading the SDK, initialize it:

            gcloud init

1.  Acquire local credentials for authenticating with Google Cloud Platform
    services:

        gcloud beta auth application-default login

1.  Clone the repository:

        git clone https://github.com/GoogleCloudPlatform/nodejs-getting-started.git

1.  Change directory:

        cd nodejs-getting-started/2-structured-data

1.  Create a `config.json` file (copied from the `config-default.json` file):

        cp config-default.json config.json

    * Set `GCLOUD_PROJECT` in `config.json` to your Google Cloud Platform
      project ID.
    * Set `DATA_BACKEND` in `config.json` to one of `"datastore"`, `"cloudsql"`,
      or `"mongodb"`.

1.  Install dependencies using NPM or Yarn:

    * Using NPM:

            npm install

    * Using Yarn:

            yarn install

1.  Configure the backing store:

    * If `DATA_BACKEND` is set to `"cloudsql"`:

        1.  Create a Cloud SQL instance, and download and start the Cloud SQL
            proxy:

            Instructions for doing so: https://cloud.google.com/nodejs/getting-started/using-cloud-sql#creating_a_cloud_sql_instance
        1.  Set `MYSQL_USER` in `config.json`, e.g. `"my-cloudsql-username"`.
        1.  Set `MYSQL_PASSWORD` in `config.json`, e.g. `"my-cloudsql-password"`.
        1.  Set `INSTANCE_CONNECTION_NAME` in `config.json`, e.g. `"YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID"`.
        1.  Run the script to setup the table:

            * Using NPM:

                    npm run init-cloudsql

            * Using Yarn:

                    yarn run init-cloudsql

    * If `DATA_BACKEND` is set to `"mongodb"`:

        1.  Set `MONGO_URL` in `config.json`, e.g. `"mongodb://username:password@123.45.67.890:27017"`.

1.  Start the app using NPM or Yarn:

    * Using NPM:

            npm start

    * Using Yarn:

            yarn start

1.  View the app at [http://localhost:8080](http://localhost:8080).

1.  Stop the app by pressing `Ctrl+C`.

1.  Deploy the app:

        gcloud app deploy

1.  View the deployed app at [https://YOUR_PROJECT_ID.appspot.com](https://YOUR_PROJECT_ID.appspot.com).

# 2 - Preguntas.
1. Contenedores:
Una imagen de tipo contenedor es un paquete  ejecutable aislado y ligero que incluye todo lo necesario para correr determinado software. Esto incluye lenguajes de programacion, herramientas del sistema, librerias, y configuracion necesaria. La idea de contenedores es tener un control total sobre ciertas especificaciones de una aplicacion. De esta forma, se puede hacer un desarrollo organizado y ejecutar software sin los problemas de instalacion que usualmente se tienen.
2. Javascript:
Javascript es un lenguaje de programacion funcional y sincrono. Lo anterior se interpreta como que Javascript no necesita perse de programacion orientada a objetos. Sin embargo, soporta dicha posibilidad a traves de prototypal inheritance. Es decir, que los objetos y clases son definidos, pero internamente javascript los trata como funciones que interactuan con el .prototype internas. Si bien javaScript es un lenguaje hecho en principio para ejecutarse dentro de templates en html, se ha desarrollado un motor de ejecucion (nodejs) que permite el desarrollo de programacion compilada, con lo cual se puede usar javascript no solo en el frontend pero en el backend.
3. Blockchain:
Blockchain es un algoritmo de concenso que permite el almacenamiento y distribucion de informacion de manera descentralizada entre los actores del sistema. Dado que la primera aplicacion del sistema es el de ejecutar transacciones en una red, el algoritmo contiene la idea de evitar el problema de doble gasto de assets a traves del concepto de unspent transaction outputs. Dentro del algoritmo hay ciertos componentes fundamentales, estos son:
	- Identidad y autorizacion de transacciones : El algoritmo delega la autorizacion de las 	transacciones al usuario final a traves del manejo de llaves (llaves privadas) que permiten 		la ejecucion  de transacciones.
	- Encriptacion: Toda la informacion contenida en las transacciones es almacenada de forma 		encriptada, luego las transacciones son anonimas, pero pueden ser auditadas a traves de los 		hashes generados en el proceso de encripcion.
	- Bloques: Los bloques son la forma final en la que se almacenan las transacciones en el 		sistema, los bloques poseen campos que los identifica dentro de la cadena de bloques que se 		almacena y ademas, la autorizacion de los bloques en el sistema se realiza a traves del 	proceso de proof of work.
	- Proof of work: el proceso de proof of work o mineria de bloques se ejecuta por los nodos 		del sistema para generar la autorizacion y posterior almacenamiento de las transacciones en 		el sistema. La idea basica del proceso es obtener a traves de proceso de computo los hashes 		que identifican las transacciones en el sistema. De este modo, el nodo que resuelve el 		problema de computo, autoriza la cadena de transacciones contenidas en el bloque y el mismo 		pasa a hacer parte de la cadena.
4. Contratos inteligentes: La idea basica de los contratos inteligentes es tener una capa de logica que interactua con el core de blockchain de forma directa. La ventaja obtenida con esto es el hecho de poder hacer desarrollo de aplicaciones que permiten la conexion con los bloques para asi prestar servicios con este modelo. En el momento, la plataforma de Ethereum es lider en el deploy de estos contratos a traves de Solidity e interactuando con la red de Ethereum.
5. Programacion Asincronica:
La programacion asincronica permite que el programa continue su ciclo de ejecucion asi parte de los procesos esten pendientes. Para lograr esto, se necesita del concepto de hilos (fibras) de ejecucion y los siguientes conceptos:

Pipes: conectar de alguna manera la operación con otra antes de solicitar su realización.
Polling: preguntar cada cierto tiempo a ver si se ha completado la operación. No suele ser buena idea ya que perdemos tiempo en preguntar.
Interrupción: esperar a una señal y que nuestro programa o el sistema ejecute, en el momento que se recibe la señal, un código en respuesta a la misma. Es importante ver aquí que este código está desligado del punto en el que se solicitó la operación mediante la llamada asíncrona.
Eventos/mensajes: es una mejora sobre polling. Cuando termina la operación se envía un mensaje que se encola. El programa no pregunta si una operación en concreto se ha completado. Sólo comprueba si ha llegado algún mensaje. Esto le indica que una operación de las muchas en curso se ha completado. Cada mensaje tiene un indicador de la operación completada y deberá ser respondido correspondientemente, de forma similar a como se hacía con las interrupciones.
Hebras o fibras: nos rendimos. Usamos llamadas síncronas, pero en vez de que bloqueen mi programa, doy opciones de por dónde se puede continuar la ejecución. En el caso de las hebras es el sistema operativo el que decide cómo planificar la ejecución, en el caso de la fibra es mi propio programa el que lo hace.
Sincronizar (p.ej. por futuros/promesa): nos rendimos definitivamente. Seguimos ejecutando como si nada mientras no necesitemos el resultado. En el momento que necesitemos el resultado, esperamos hasta tenerlo.
Retrollamadas: como interrupción, pero indico qué código hay que ejecutar en el momento de realizar la llamada asíncrona. Esto tiene el efecto de bifurcar el flujo de control y analizaremos esto en lo que resta de artículo.
