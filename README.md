# Ejercicio 04 - Datos y Resultados de Jobs

Ahora para esta sección del curso he preparado otro proyecto de ejemplo, que sigue basado en el mismo proyecto de ejemplo anterior, pero que ya viene con un archivo **datos.yml** situado en la carpeta **.github>workflows** donde tenemos definido un workflow de demostración muy simple.

<pre>
name: Desplegar Sitio Web
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Obtener código
        uses: actions/checkout@v4
      - name: Instalar dependencias
        run: npm ci
      - name: Lintear código
        run: npm run lint
      - name: Ejecutar pruebas
        run: npm run test
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Obtener código
        uses: actions/checkout@v4
      - name: Instalar dependencias
        run: npm ci
      - name: Compilar código
        run: npm run build
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Desplegar sitio web
        run: echo "Desplegando..."</pre>

A continuación tenemos 2 secciones claramente diferenciadas. La primera detallará los pasos que debemos seguir para preparar nuestro entorno para el desarrollo del ejercicio. Y la segunda parte detalla el desarrollo completo de los ejercicios, paso a paso.

## Preparación del ejercicio

1. Para empezar a trabajar en este ejercicio, debemos crear nuestra propia copia de este repositorio. Para esto, debemos crear un **fork** del repositorio haciendo click en el desplegable al lado de la opción de **Fork** y seleccionando la opción *Create a new fork*.
   
   	![Crear fork](img/fork-repo.png)

2. Luego, en los detalles del fork, seleccionamos nuestra cuenta personal en el desplegable de **Owner** y nos aseguramos que el nombre del repositorio está disponible y con el mensaje en verde, y hacemos clic en el botón verde **Create fork**.
   
   	![Detalles del fork](img/fork-details.png)

    En caso el nombre del repositorio no esté disponible, simplemente cambiamos el nombre por uno que sí lo esté. Esto no cambiará en nada el resultado o la lógica de nuestro desarrollo del ejercicio.

3.  Una vez cargue nuestro nuevo repositorio, hacemos clic en el botón verde **Code**, cambiamos a la pestaña Codespaces en el panel que se muestra y hacemos clic en el botón verde **Create codespace on main**.
   
   	![Crear codespace](img/create-codespace.png)

    En caso el bloqueador de pop-ups del browser interrumpa el lanzamiento del Codespace, otorgar los permisos necesarios y repetir el proceso.

4.  Se abrirá una nueva pestaña en nuestro browser con un entorno de desarrollo basado en Visual Studio Code, hospedado en la Nube de GitHub y con nuestro proyecto cargado y listo para trabajar.
   
   	![Codespace creado](img/codespace-created.png)

    Este entorno de desarrollo elimina nuestra necesidad de instalar localmente las herramientas y librerías necesarias para el desarrollo de nuestros ejercicios.

5. Este paso y el siguiente son meramente opcionales. En caso la presentación del entorno de desarrollo en su configuración por defecto no sea muy cómoda para ti, siempre puedes cambiar el tema de color haciendo clic en el botón de **Manage** (el engranaje en la esquina inferior izquierda), y seleccionar las opciones **Themes > Color Theme**.
   
   	![Cambiar tema de color](img/change-theme.png)

6. Se desplegarán las opciones de tema de color disponibles y, para elegir aquella con la que estemos más cómodos, simplemente debemos navegar las opciones con las flechas arriba y abajo de nuestro teclado y dar **Enter**.
   
   	![Seleccionar tema de color](img/select-theme.png)

    El tema mostrado en esta imagen es sólo referencial.

7. Una vez cargada nuestra copia del repositorio del ejercicio en nuestro entorno de desarrollo, vemos que también se muestra el terminal listo para empezar a ejecutar los comandos que sean necesarios. En este caso, lo primero que vamos a hacer es probar lo que hace nuestra aplicación de ejemplo. Para esto, ingresamos el siguiente comando en nuestro terminal:
   
   ```
   npm install
   ```

    Esto nos debería devolver una salida similar a la siguiente:
   
   ![Salida de compilar nuestra aplicación](img/npm-build-output.png)

8. Luego, para lanzar nuestra aplicación en modo desarrollo, ingresamos este comando:

   ```
   npm run dev
   ```

   Esto nos debería devolver una salida similar a la siguiente, así como una notificación de que podemos acceder a nuestra aplicación haciendo clic en el botón **Open in Browser**, que es justo lo que vamos a hacer:
   
   ![Salida de ejecutar nuestra aplicación](img/npm-run-dev-output.png)

9. Esto lanza nuestra aplicación en una nueva pestaña de nuestro browser y podemos probar su simple funcionalidad.
   
   ![Nuestra aplicación de ejemplo](img/our-sample-app.png)
   
   Una vez probada nuestra aplicación, para detenerla, simplemente volvemos a nuestro entorno de desarrollo, hacemos clic en el terminal para asegurarnos que el foco se encuentra allí y digitamos `Ctrl+C`. Una vez realizado esto, el terminal volverá a estar listo para ingresar nuevos comandos.

10. Ahora procedemos a instalar la extensión de GitHub Actions. Para esto, seleccionamos la opción **Extensions** (aquella que parece una pieza de tetris) en la barra lateral izquierda, en el buscador de extensiones ingresamos el texto `GitHub Actions`, y le damos al botón **Install** a la derecha de la primera extensión mostrada en el listado (aquella que tiene a GitHub como autor verificado).
   
    ![Nuestra aplicación de ejemplo](img/install-github-actions-extension.png)

11. Una vez instalada la extensión de GitHub Actions, seleccionamos su ícono en la barra lateral, y hacemos clic en el botón **Sign in to GitHub**.
    
    ![Inicio de sesión en GitHub](img/github-signin.png)
   
    Se mostrará un aviso y seleccionamos **Allow**.

    Si el browser nos pide las credenciales de GitHub, las ingresamos y se mostrará el mensaje **You can now close the window.**.

12. Luego de confirmar las credenciales, el panel de GitHub actions nos debe mostrar sus 3 secciones: Current Branch, Workflows y Settings.

    ![Extensión de GitHub Actions](img/github-actions-extension.png)

13. Volvemos a la página de nuestro proyecto e ingresamos a la pestaña de **Actions**, donde se nos mostrará una advertencia indicando que los workflows están desactivados porque venían ya en el repo desde el que se hizo el fork.

    ![Workflows desactivados](img/workflows-disabled.png)

    Para activar nuestro workflow, simplemente le damos clic al botón verde **I understand my workflows, go ahead and enable them**.

14. Una vez activados los workflows nuevamente, podemos apreciar en el panel de la izquierda nuestro workflow **Desplegar Sitio Web**.

    ![Workflow aún sin ejecuciones](img/no-workflow-runs-yet.png)

15. Luego, podremos ver nuestro workflow en el segundo panel (Workflows) de la extensión de GitHub Actions en nuestro entorno de desarrollo (probablemente sea necesario darle clic al botón **Refresh**).

    ![Lanzamos nuestro workflow](img/workflows-updated.png)
    
  Por fin, con este paso tenemos nuestro entorno listo para proceder con el desarrollo del ejercicio a continuación.

## Desarrollo del ejercicio - Artefactos

1. Para iniciar el desarrollo del ejercicio, actualizamos nuestro documento de workflow reemplazando el contenido de la directiva **on**:  [Gist Paso 1](https://gist.github.com/ricardomasabeltsoft/97af3e34900151a1e16214a80d5bdfa4)
   
   	<pre>
    name: Ejercicio con Eventos
    <span style="color:Navy;"><b>on:
      pull_request:
        types:
          - opened
      workflow_dispatch:</b></span>
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Mostrar datos del evento
            run: echo "${{ toJSON(github.event) }}"
          - name: Obtener código
            uses: actions/checkout@v4
          - name: Instalar dependencias
            run: npm ci
          - name: Ejecutar pruebas
            run: npm run test
          - name: Compilar código
            run: npm run build
          - name: Desplegar el proyecto
            run: echo "Desplegando..."</pre>
   
2. Sincronizamos nuestros cambios hacia el repositorio con los siguientes comandos:
   
   <pre>
   git add .
   git commit -m "Adición de tipos de actividades"
   git push</pre>

3. Verificamos en la pestaña **Actions** de nuestro repositorio y vemos que no hay más ejecuciones de nuestro workflow.
   
   ![No hay más ejecuciones de nuestro workflow](img/no-new-workflow-runs.png)

4. Agregamos una nueva rama denominada **dev**:
   
   <pre>
   git checkout -b dev</pre>

5. Hacemos un pequeño cambio en el encabezado en nuestro archivo **App.jsx**. [Gist Paso 5](https://gist.github.com/ricardomasabeltsoft/83c123fc6549e6f8dcb2d85c157ba5e6)

   ```
   import MainContent from './components/MainContent';
   import logo from './assets/images/logo.png';

   function App() {
     return (
       <>
         <header>
           <div id="logo-img">
             <img src={logo} />
           </div>
           <h1>Fundamentos de GitHub Actions y Eventos</h1>
         </header>
         <MainContent />
       </>
     );
   }

   export default App;
   ```
   
6. Sincronizamos nuestros cambios hacia una nueva rama en el repositorio con los siguientes comandos:
   
   <pre>
   git add .
   git commit -m "Cambio de encabezado"
   git push origin dev</pre>

7. Volvemos a nuestro repositorio y cambiamos a la pestaña **Code**. Se nos mostrará una notificación de push reciente a la rama dev, y hacemos clic en el botón verde **Compare & pull request**.
   
   ![Notificación de push reciente a dev](img/dev-recent-push.png)

8. En la configuración del pull request nos aseguramos de seleccionar en ambos casos nuestro repositorio (no de aquel que hicimos fork). Y en la vista de comparación de cambios confirmamos la creación del pull request dando clic en el botón verde **Create pull request**.
   
   ![Comparación de cambios](img/comparing-changes.png)

9. Cambiamos a la pestaña **Actions** y ahora sí vemos la nueva ejecución gatillada al crear el pull request.
   
   ![Nueva ejecución de nuestro workflow](img/new-workflow-run.png)

10. Igual, en nuestro entorno de desarrollo también podemos ver la nueva ejecución en el panel **Workflows** de la extensión de GitHub Actions.
   
    ![Nueva ejecución de nuestro workflow en VS Code](img/new-workflow-run-vscode.png)

11. Volvemos a nuestro repositorio y cambiamos a la pestaña **Pull requests** y veremos que aparece listado nuestro reciente pull request, y hacemos clic en su nombre **Cambio de encabezado**.
   
    ![Listado de pull requests](img/pull-requests-list.png)

12. Para probar el evento de cierre del pull request y validar si se ejecuta o no nuestro workflow, vamos a hacer clic en el botón verde **Merge pull request**.
   
    ![Detalles del pull request](img/merge-pull-request.png)

13. Paso seguido, hacemos clic en el botón verde **Confirm merge**.
   
    ![Detalles del pull request](img/confirm-merge-pull-request.png)

14. Se nos muestra la confirmación del pull request cerrado.
   
    ![Detalles del pull request](img/pull-request-closed.png)

15. Volvemos a nuestra pestaña **Actions** y, efectivamente, no hay nuevas ejecuciones.
    
    ![No hay nuevas ejecuciones de nuestro workflow](img/new-workflow-run.png)

## Desarrollo del ejercicio - Filtros de Eventos

16. Para continuar con el ejercicio, volvemos a nuestro ambiente de desarrollo creado en la clase anterior.
   
    ![Codespaces existentes](img/existing-codespaces.png)

17. Nos aseguramos de cambiar de contexto a la rama **main** mientras mantenemos los cambios actualizados.
   
    <pre>
    git fetch
    git checkout main
    git pull
    </pre>

18. Actualizamos la definición de nuestro workflow añadiendo los filtros de ramas y de rutas a los eventos **pull_request** y **push**. [Gist Paso 18](https://gist.github.com/ricardomasabeltsoft/9fd2eec9a9e28dc4b84e1d846d91f443)

    <pre>
    name: Ejercicio con Eventos
    on:
      <span style="color:Navy;"><b>pull_request:
        types:
          - opened
        branches:
          - main # main
          - 'dev-*' # dev-nuevo dev-esto-es-nuevo
          - 'feat/**' # feat/nuevo feat/nuevo/boton
      workflow_dispatch:
      push:
        branches:
          - main # main
          - 'dev-*' # dev-nuevo dev-esto-es-nuevo
          - 'feat/**' # feat/nuevo feat/nuevo/boton
          # developer-1
        paths-ignore:
          - '.github/workflows/*'</b></span>
    jobs:
      ...</pre>
   
19. Pusheamos nuestros cambios hacia nuestra rama **main**:
   
   <pre>
   git add .
   git commit -m "Workflow actualizado"
   git push
   </pre>

20. Volvemos a nuestra pestaña **Actions** y, efectivamente, no hay nuevas ejecuciones de nuestro workflow.
    
    ![No hay nuevas ejecuciones de nuestro workflow](img/new-workflow-run.png)

## Desarrollo del ejercicio - Pull Requests entre Repositorios (Opcional)

21. Para simular un colaborador externo, procedemos a crear otro fork desde nuestro repositorio, pero esta vez utilizando otra cuenta personal.
   
   	![Crear fork](img/fork-repo-2.png)

22. Luego, en los detalles del fork, seleccionamos nuestra segunda cuenta personal en el desplegable de **Owner** y nos aseguramos que el nombre del repositorio está disponible y con el mensaje en verde, y hacemos clic en el botón verde **Create fork**.
   
   	![Detalles del fork](img/fork-details-2.png)

23. Una vez cargue nuestro nuevo repositorio, lanzamos nuevamente un Codespace en el contexto de este repositorio.
   
   	![Crear codespace](img/create-codespace-2.png)

24. Hacemos un pequeño cambio en el encabezado en nuestro archivo **main.jsx** ubicado en la carpeta **src**. [Gist Paso 24](https://gist.github.com/ricardomasabeltsoft/49fb5e1d90b0e0ea1eea3972a4bccaac)

    <pre>
    import React from 'react';
    import ReactDOM from 'react-dom/client';

    import App from './App';
    import './index.css';

    <span style="color:Navy;"><b>// Esto es un comentario</b></span>

    ReactDOM.createRoot(document.getElementById('root')).render(
    ...
    </pre>
   
25. Sincronizamos nuestros cambios hacia una nueva rama en el repositorio con los siguientes comandos:
   
    <pre>
    git checkout -b un-comentario
    git add .
    git commit -m "Comentario agregado"
    git push origin un-comentario
    </pre>

26. Volvemos a nuestro repositorio, a la pestaña **Code** y veremos una notificación de push reciente a la rama **un-comentario**, y hacemos clic en el botón verde **Compare & pull request**.
   
    ![Notificación de push reciente a un-comentario](img/dev-recent-push-2.png)

27. En la configuración de este nuevo pull request, a diferencia de los casos anteriores, ya no es necesario cambiar los datos del owner, porque en este caso sí queremos realizar el pull request entre repositorios diferentes. Así, en la vista de comparación de cambios directamente confirmamos la creación del pull request dando clic en el botón verde **Create pull request**.
   
    ![Comparación de cambios](img/comparing-changes-2.png)

28. Volvemos ahora al contexto de nuestro repositorio original, a la pestaña **Actions** y ahora sí vemos la nueva ejecución asociada al crear el pull request, pero con un ícono de adevertencia.
   
    ![Nueva ejecución de nuestro workflow](img/new-workflow-run-2.png)

    Esto indica que dicha ejecución se quedó en un estado pendiente, pero no ha procedido. Hacemos clic en el nombre de nuestra ejecución pendiente (**Comentario agregado**) para ver los detalles de dicha ejecución.

29. Una vez en los detalles de dicha ejecución, encontraremos una sección nueva con el botón de **Approve and run**, que permitirá que este usuario pueda gatillar esta y futuras ejecuciones del workflow.
   
    ![Ejecución pendiente de aprobación](img/workflow-pending-for-approval.png)

    Hacemos clic en el botón **Approve and run** para proceder con la ejecución.

30. Efectivamente, el workflow procederá a ejecutarse y a darnos un resultado (exitoso en este caso).
   
    ![Ejecución de workflow aprobada](img/workflow-approved.png)

31. Este proceso de aprobación se aplicará a cualquier usuario externo desconocido. Sin embargo, existe la opción de agregar colaboradores externos a nuestros repositorios. Esto lo encontraremos yendo a la sección **Settings** y luego a **Collaborators**.
   
    ![Ejecución de workflow aprobada](img/collaborators-settings.png)

    Una vez agreguemos aquí a un colaborador, sus pull requests no requerirán de nuestra aprobación para ser ejecutados, debido a que se entiende que son usuarios de confianza.
