# 🧑‍🎓 API de Gestión Estudiantil

API sencilla para gestionar el registro de estudiantes. Construída con **Express** y **MongoDB**.

## Características

-   Gestión de estudiantes: **Crear, leer, actualizar y eliminar** registros de estudiantes.
-   Soporte para filtros de búsqueda: Filtra estudiantes por curso.
-   Carga de imágenes de perfil para estudiantes.

## Acceso

**Link a la API desplegada en Vercel:** https://gest-api.vercel.app/

## Endpoints

### Estudiantes

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

## Tecnologías usadas

-   Node.js con Express
-   MongoDB con Mongoose
-   Multer
-   Typescript
