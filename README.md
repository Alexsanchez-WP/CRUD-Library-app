# Aplicación CRUD de Biblioteca

Esta aplicación es un sistema de gestión de libros (CRUD: Crear, Leer, Actualizar, Eliminar) que permite a los usuarios administrar una colección de libros. 

Cuenta con un frontend desarrollado en React con TypeScript y Vite, y un backend en Node.js con Express.

## Tecnologías Utilizadas

**Frontend:**
*   React 19
*   TypeScript
*   Vite
*   Axios (para peticiones HTTP)
*   ESLint (para linting de código)

**Backend:**
*   Node.js
*   Express.js
*   `db.json` como base de datos simulada.
*   `cors` para la gestión de Cross-Origin Resource Sharing.
*   `uuid` para generar IDs únicos.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

*   `back/`: Contiene el código del servidor backend.
*   `front/`: Contiene el código de la aplicación frontend.

Adicionalmente, en la raíz del proyecto se encuentra:
*   `swagger.yaml`: Documentación de la API en formato OpenAPI.

## Backend (`back/`)

El backend es una API RESTful construida con Node.js y Express. Proporciona endpoints para gestionar los libros que almacenan en un archivo `db.json`.

### Endpoints de la API

La API sigue las especificaciones definidas en `swagger.yaml`. Los principales endpoints son:

*   **`GET /books`**: Lista todos los libros.
*   **`GET /books/:id`**: Obtiene un libro específico por su ID.
*   **`POST /books`**: Crea un nuevo libro.
    *   **Cuerpo de la solicitud (JSON):**
        ```json
        {
          "title": "Título del Libro",
          "author": "Autor del Libro",
          "description": "Descripción breve",
          "pages": 300,
          "year_published": 2024,
          "publisher": "Editorial X"
        }
        ```
*   **`PUT /books/:id`**: Actualiza un libro existente por su ID.
    *   **Cuerpo de la solicitud (JSON):** Similar al de `POST /books`.
*   **`DELETE /books/:id`**: Elimina un libro por su ID.

### Instalación y Ejecución (Backend)

1.  Navega a la carpeta del backend:
    ```bash
    cd back
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor en modo de desarrollo (con `nodemon` para recarga automática):
    ```bash
    npm run dev
    ```
    O para producción:
    ```bash
    npm start
    ```
    El servidor se ejecutará en `http://localhost:3000` por defecto.

## Frontend (`front/`)

El frontend es una aplicación de página única (SPA) desarrollada con React, TypeScript y Vite que permite a los usuarios interactuar con la API del backend para ver, agregar, editar y eliminar libros.

### Componentes Principales

*   **`App.tsx`**: Componente raíz que maneja el estado general de la aplicación, la lógica de obtención y envío de datos, y la visualización condicional de otros componentes.
*   **`BookList.tsx`**: Muestra la lista de libros obtenidos del backend. Permite la edición y eliminación de cada libro.
*   **`BookForm.tsx`**: Formulario utilizado para crear nuevos libros o editar los existentes.

### Instalación y Ejecución (Frontend)

1.  Navega a la carpeta del frontend:
    ```bash
    cd front
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
    La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que Vite asigne si el 5173 está ocupado).

## Despliegue Local Completo

Para ejecutar la aplicación completa localmente:

1.  **Inicia el Backend:**
    *   Abre una terminal.
    *   Navega a la carpeta `back/`.
    *   Ejecuta `npm install`.
    *   Ejecuta `npm run dev`. El servidor backend estará escuchando en `http://localhost:3000`.

2.  **Inicia el Frontend:**
    *   Abre otra terminal.
    *   Navega a la carpeta `front/`.
    *   Ejecuta `npm install`.
    *   Ejecuta `npm run dev`. La aplicación frontend estará accesible en `http://localhost:5173`.

3.  Abre tu navegador web y visita `http://localhost:5173` para usar la aplicación.
