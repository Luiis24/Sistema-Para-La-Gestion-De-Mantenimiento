Descripción del Proyecto:
Contexto del Proyecto:

Este proyecto tiene como objetivo facilitar la gestión del mantenimiento de maquinaria industrial en entornos diversos.
Se trata de crear una plataforma robusta y escalable que permita gestionar eficientemente el estado y mantenimiento de equipos industriales.

Funcionalidades Principales:

- Registro detallado de maquinaria, componentes y sus estados.
- Seguimiento del mantenimiento preventivo y correctivo.
- Gestión de instructores y aprendices para la realización de inspecciones y reparaciones.

Arquitectura y Tecnologías Utilizadas:

Backend:

Utiliza Node.js como entorno de ejecución para el servidor backend.
PostgreSQL se emplea como el sistema de gestión de bases de datos relacional.

- Axios: Una biblioteca para hacer solicitudes HTTP desde el lado del cliente.
- Bcrypt: Utilizado comúnmente para el cifrado de contraseñas.
- Cors: Middleware para habilitar el manejo de solicitudes de origen cruzado (CORS) en Node.js.
- pg: Un cliente PostgreSQL para Node.js.

Frontend:

La interfaz de usuario se construye con React.js, una biblioteca de JavaScript para construir interfaces de usuario interactivas.
Para el diseño y estilo, incorporamos:

- React y React-DOM: Framework de interfaz de usuario para construir componentes reutilizables y manejar la interfaz de usuario en la web.
- React Router DOM: Para la gestión de enrutamiento en una aplicación React.
- React Toastify: Biblioteca para mostrar notificaciones toast en la interfaz de usuario de React.

Comunicación Frontend-Backend:

La comunicación entre el frontend y el backend se realiza a través de solicitudes HTTP utilizando axios para manejar las peticiones.
Estructura de la Base de Datos:

Modelo de Datos:

Se usa una base de datos relacional utilizando PostgreSQL para almacenar información crucial.
La estructura de las tablas incluye:

- Tablas para:
- Aprendices.
- Instructoes.
- Componentes de la maquina.
- Variedad de tablas usadas para el registro de todos los datos de la maquinaria.

Desarrollo Continuo:

Estado Actual y Futuro:

Actualmente, el proyecto se encuentra en fase de desarrollo activo.
Estamos trabajando en terminar el desarollo del proyecto.
