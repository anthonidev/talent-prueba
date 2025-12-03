# API Go - QR Factorization Service

API RESTful desarrollada en Go con el framework Fiber que realiza factorización QR de matrices.

## Características

- Factorización QR usando la biblioteca Gonum
- Comunicación HTTP con API de Node.js para cálculo de estadísticas
- Manejo robusto de errores
- Health check endpoint

## Tecnologías

- Go 1.21
- Fiber v2
- Gonum

## Instalación y Ejecución

### Prerrequisitos

- Go 1.21+
- API de Node.js ejecutándose

### Ejecución Local

1.  Instalar dependencias:

    ```bash
    go mod download
    ```

2.  Configurar variables de entorno (`.env`):

    ```env
    PORT=8080
    NODE_API_URL=http://localhost:3000
    ```

3.  Ejecutar:
    ```bash
    go run main.go
    ```

### Ejecución con Docker

```bash
docker build -t api-go .
docker run -p 8080:8080 -e NODE_API_URL=http://api-nodejs:3000 api-go
```

## Endpoints

### POST /api/qr

Factorización QR de una matriz.

**Request:**

```json
{
  "matrix": [
    [12, -51, 4],
    [6, 167, -68],
    [-4, 24, -41]
  ]
}
```

**Response:**

```json
{
  "q": [[...], [...]],
  "r": [[...], [...]],
  "statistics": { "max": 167, "min": -68, "average": 15.5, "sum": 139, "is_diagonal": false }
}
```

### GET /health

Health check.

**Response:** `{"status": "healthy", "service": "api-go"}`

## Testing

```bash
go test ./... -v
```
