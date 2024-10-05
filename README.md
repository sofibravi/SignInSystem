# Social Media Albums App - SignInSystem

## Descripción

Este es un proyecto de **Angular** que simula una red social simple para la visualización y gestión de álbumes de fotos y publicaciones. Los usuarios tienen diferentes permisos dependiendo de su rol: `admin` o `user`.

El objetivo de la aplicación es mostrar los álbumes y las fotos, así como las publicaciones correspondientes, representando una especie de red social para sus usuarios. Los usuarios pueden navegar por los álbumes, que contienen botones para visualizar tanto listados de fotos como de publicaciones asociadas.

El proyecto cuenta con un sistema de autenticación, utilizando un guard para proteger las rutas y un interceptor que genera un token con una duración de 1 hora. Los usuarios tienen diferentes permisos dependiendo de su rol.

**Para este proyecto se utilizó la librería PRIMENG para utilizar componentes compartidos y funcionalidades como modales, mensajes, cards y botones**

- Se utilizó Sass como lenguaje de procesador de CSS.
- Angular v17.3
- Node v20.17
- PRIMENG v17.18.11
- PrimeNG icons v7

## Tabla de Contenidos

1. [Usuarios y Roles](#usuarios-y-roles)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Características](#características)

## Usuarios y Roles

La aplicación cuenta con dos tipos de usuarios:

1. **Admin**:

   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
   - **Permisos**:
     - Ver listados de álbumes, fotos y publicaciones.
     - Editar y eliminar publicaciones.
     - Eliminar fotos.

2. **User**:
   - **Usuario**: `user`
   - **Contraseña**: `user123`
   - **Permisos**:
     - Solo puede ver los listados de álbumes, fotos y publicaciones.
     - No puede realizar modificaciones.

## Instalación

### Prerrequisitos

Antes de empezar, asegúrate de tener los siguientes requisitos instalados:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Pasos para instalar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/sofibravi/SignInSystem.git
   ```

2. Ve a la carpeta del proyecto:

   ```bash
   cd SignInSystem
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   ng serve
   ```

5. Abre el navegador en `http://localhost:4200/`.

## Uso

### Acceso a la aplicación:

1. **Autenticación**:

   - Al iniciar la aplicación, se mostrará el módulo de login. Inicia sesión con uno de los siguientes usuarios:
     - **Admin**: `admin` / `admin123`
     - **User**: `user` / `user123`

2. **Navegación**:

   - Una vez autenticado, serás redirigido a la página principal donde podrás ver un **listado de álbumes**.
   - Cada álbum contiene botones para visualizar un **listado de fotos** y un **listado de publicaciones**.

3. **Permisos según el rol**:

   - El usuario con rol `admin` puede **editar** y **eliminar publicaciones**, así como **eliminar fotos**.
   - El usuario con rol `user` solo puede **ver** los listados, pero no puede realizar modificaciones.

4. **Seguridad**:
   - El acceso a las rutas está protegido con un **AuthGuard** que valida si el usuario está autenticado.
   - Un **Interceptor** genera un token con una expiración de 1 hora cuando el usuario inicia sesión.

## Características

- **Módulo de login**: Autenticación de usuarios con roles diferenciados (`admin` y `user`).
- **Listados**: Visualización de álbumes, fotos y publicaciones.
- **Control de Acceso por Roles**:
  - El rol `admin` tiene permisos para editar y eliminar contenido.
  - El rol `user` solo tiene permisos de visualización.
- **Protección de Rutas**: Utilización de un **AuthGuard** para redirigir al login si el usuario no está autenticado.
- **Token de Autenticación**: Implementación de un interceptor que genera un token con expiración de 1 hora.
- **Paginación de listados**: Se agrega al final de cada listado una paginación.
