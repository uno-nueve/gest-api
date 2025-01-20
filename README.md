# 🧑‍🎓*GEst: API de Gestión Estudiantil*

API sencilla para gestionar el registro de estudiantes. Construída con **Express** y **MongoDB**.

## Características

-   Gestión de estudiantes: **Crear, leer, actualizar y eliminar** registros de estudiantes.
-   Soporte para filtros de búsqueda: Filtra estudiantes por curso.
-   Carga de imágenes de perfil para estudiantes.

## Tecnologías usadas

-   Node.js con Express
-   MongoDB con Mongoose
-   Multer
-   Typescript

## Uso

1. Clonar el repositorio.

```bash
git clone git@github.com:uno-nueve/gest-api.git
cd gest-api
```

2. Instalar dependencias.

```bash
npm install
```

3. Configurar variables de entorno en archivo `.env`.

```bash
MONGO_URI= tu_string_de_conexion
```

4. Ejecutar el servidor

```bash
npm run dev
```

**Link a la API desplegada en Vercel:** https://gest-api.vercel.app/

## Endpoints

| Método     | Endpoint              | Descripción                                                                  |
| ---------- | --------------------- | ---------------------------------------------------------------------------- |
| **GET**    | `api/estudiantes`     | Obtiene todos los estudiantes. Si se añade un filtro, solo los que coincidan |
| **GET**    | `api/estudiantes/:id` | Obtiene un estudiante por ID                                                 |
| **POST**   | `api/estudiantes`     | Crea un estudiante                                                           |
| **PUT**    | `api/estudiantes/:id` | Actualiza un estudiante por ID                                               |
| **DELETE** | `api/estudiantes`     | Elimina un estudiante por ID                                                 |
| **PATCH**  | `api/estudiantes`     | Añade una imágen de perfil a un estudiante                                   |

### Ejemplos de uso

**Obtener todos los estudiantes**

-   **GET** `api/estudiantes`
-   Query Params (opcional):
    -   `curso`: filtra estudiantes inscritos en un curso específico.
-   **Respuesta:**

```json
[
    {
        "_id": "64e7f12345abc",
        "nombre": "Juan",
        "apellido": "Pérez",
        "email": "juan.perez@example.com",
        "cursos": ["Matemática", "Arte"]
    },
    {
        "_id": "64e7f1234oor1",
        "nombre": "María",
        "apellido": "Gomez",
        "email": "margomez@example.com",
        "cursos": ["Historia", "Ciencias"]
    }
]
```

**Obtener un estudiante por ID**

-   **GET** `api/estudiantes/:id`
-   **Respuesta:**

```json
{
    "_id": "64e7f12345abc",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "cursos": ["Matemática", "Arte"],
    "imagen": {
        "_id": "64e7f6789xyz",
        "data": "BASE64_STRING"
    }
}
```

**Crear un estudiante**

-   **POST** `api/estudiantes`
-   **Body:**

```json
{
    "nombre": "Antonio",
    "apellido": "Guerra",
    "email": "guerra.antonio@example.com",
    "cursos": ["Historia"]
}
```

-   **Respuesta:**

```json
{
    "_id": "64e7f12345abc",
    "nombre": "Antonio",
    "apellido": "Guerra",
    "email": "guerra.antonio@example.com",
    "cursos": ["Historia"]
}
```

**Actualizar un estudiante**

-   **PUT** `api/estudiantes/:id`
-   **Body:** Campos a actualizar (e.g. `"curso": ["Historia", "Arte"]`)
-   **Respuesta:**

```json
{
    "_id": "64e7f12345abc",
    "nombre": "Antonio",
    "apellido": "Guerra",
    "email": "guerra.antonio@example.com",
    "cursos": ["Historia", "Arte"]
}
```

**Eliminar un estudiante**

-   **GET** `api/estudiantes/:id`
-   **Respuesta:**

```json
{
    "message": "✅ Registro eliminado exitosamente"
}
```

**Subir imágen de perfil**

-   **PATCH** `api/estudiantes/:id/avatar`
-   **Form Data:**
    -   `imagen`: archivo de imágen.
-   **Respuesta:**

```json
{
    "message": "✅ Imagen subida exitosamente",
    "estudiante": {
        "_id": "64e7f12345abc",
        "nombre": "Antonio",
        "apellido": "Guerra",
        "email": "guerra.antonio@example.com",
        "cursos": ["Historia", "Arte"],
        "imagen": "64e7f6789xyz"
    }
}
```

## Próximos pasos

-   Integrar autenticación de usuarios.
-   Integrar servicio de almacenamiento en la nube e.g. [uploadthing](https://uploadthing.com/).
-   Crear interfaz de usuario con React.

## Créditos

**Desarrollado por Luciano Montilla**
