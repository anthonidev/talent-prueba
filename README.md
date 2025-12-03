# Desafío de Factorización QR de Interseguro

Una aplicación full-stack para la Factorización de Matrices QR, que consta de una API en Go para el cálculo, una API en Node.js para estadísticas y un Frontend en Next.js para la interacción del usuario.

## Estructura del Proyecto

- **apps/api-go**: Servicio en Go (Fiber) para la lógica de descomposición QR.
- **apps/api-nodejs**: Servicio en Node.js (NestJS) para el cálculo de estadísticas y autenticación JWT.
- **apps/frontend**: Frontend en Next.js (React) con una interfaz moderna y tema oscuro.

## Requisitos Previos

- [Docker](https://www.docker.com/) y Docker Compose
- [Make](https://www.gnu.org/software/make/) (opcional, para Linux/Mac)
- PowerShell (opcional, para Windows)

## Inicio Rápido

### Usando Docker Compose (Recomendado)

Para construir e iniciar todos los servicios:

```bash
docker-compose up --build
```

Los servicios estarán disponibles en:

- **Frontend**: http://localhost:3001
- **Go API**: http://localhost:8080
- **Node.js API**: http://localhost:3000

### Usando Make (Linux/Mac)

```bash
make start         # Iniciar todos los servicios
make stop          # Detener todos los servicios
make build         # Reconstruir servicios
make logs          # Ver registros (logs)
make test          # Ejecutar todos los tests
make test-go       # Tests de API Go
make test-node     # Tests de API Node.js
make test-frontend # Tests de Frontend
make lint          # Linting del Frontend
```

### Usando PowerShell (Windows)

```powershell
./start.ps1 -Command start   # Iniciar todos los servicios
./start.ps1 -Command stop    # Detener todos los servicios
./start.ps1 -Command build   # Reconstruir servicios
./start.ps1 -Command logs    # Ver registros (logs)
./start.ps1 -Command test    # Ejecutar todos los tests
```

## Desarrollo

Si deseas ejecutar los servicios individualmente sin Docker, consulta el `README.md` en cada subdirectorio:

- [apps/api-go/README.md](apps/api-go/README.md)
- [apps/api-nodejs/README.md](apps/api-nodejs/README.md)
- [apps/frontend/README.md](apps/frontend/README.md)
