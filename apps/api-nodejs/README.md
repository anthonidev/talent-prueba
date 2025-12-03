# API Node.js - Statistics Service

API RESTful desarrollada en Node.js con NestJS que calcula estadísticas de matrices.

## Características

- Cálculo de estadísticas (máximo, mínimo, promedio, suma, diagonal)
- Validación de variables de entorno con Joi
- Autenticación JWT (preparada para expansión)
- Arquitectura modular con NestJS

## Tecnologías

- Node.js
- NestJS
- TypeScript
- Joi (Validación de configuración)
- Passport & JWT

## Estructura del Proyecto

```
api-nodejs/
├── src/
│   ├── auth/          # Módulo de autenticación
│   ├── config/        # Configuración y variables de entorno
│   ├── statistics/    # Lógica de cálculo de estadísticas
│   ├── app.module.ts  # Módulo principal
│   └── main.ts        # Punto de entrada
├── test/              # Tests E2E
├── package.json
└── README.md
```

## Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación de dependencias

```bash
cd api-nodejs
pnpm install
```

### Variables de entorno

Crear un archivo `.env` basado en `.env.example`:

```env
PORT=3000
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
```

### Ejecutar localmente

```bash
# Desarrollo
pnpm run start:dev

# Producción
pnpm run start:prod
```

## Endpoints

### POST /statistics

Calcula estadísticas de las matrices Q y R recibidas.

**Request:**

```json
{
  "q": [[...]],
  "r": [[...]]
}
```

**Response:**

```json
{
  "max": 167,
  "min": -68,
  "average": 15.5,
  "sum": 139,
  "is_diagonal": false
}
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm run test:e2e

# Coverage
pnpm run test:cov
```
