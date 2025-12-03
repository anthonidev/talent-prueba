# Desafío de Factorización QR de Interseguro

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

Aplicación full-stack para la Factorización de Matrices QR.

## Estructura

- **`apps/api-go`**: Lógica de cálculo QR (Go/Fiber).
- **`apps/api-nodejs`**: Estadísticas y autenticación (Node.js/NestJS).
- **`apps/frontend`**: Interfaz de usuario (Next.js/React).

## Inicio Rápido

### 1. Configuración

Copia las variables de entorno:

```bash
cp .env.example .env
# Windows PowerShell: Copy-Item .env.example .env
```

### 2. Ejecución

**Docker Compose (Recomendado):**

```bash
docker-compose up --build
```

**Scripts de Utilidad:**

| Comando                                     | Descripción       |
| :------------------------------------------ | :---------------- |
| `make start` / `./start.ps1 -Command start` | Iniciar servicios |
| `make stop` / `./start.ps1 -Command stop`   | Detener servicios |
| `make build` / `./start.ps1 -Command build` | Reconstruir       |
| `make test` / `./start.ps1 -Command test`   | Ejecutar tests    |

### 3. Acceso

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Go API**: [http://localhost:8080](http://localhost:8080)
- **Node.js API**: [http://localhost:3000](http://localhost:3000)
