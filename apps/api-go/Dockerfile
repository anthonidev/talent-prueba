# Builder stage - Compilación de la aplicación
FROM golang:1.21-alpine3.19 AS builder

# Instalar dependencias necesarias para compilar
RUN apk add --no-cache git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY go.mod go.sum ./

# Descargar dependencias
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar la aplicación
# CGO_ENABLED=0 para crear un binario estático
# -ldflags="-w -s" para reducir el tamaño del binario
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

# Runtime stage - Imagen final ligera
FROM alpine:3.19

# Instalar certificados CA para peticiones HTTPS
RUN apk --no-cache add ca-certificates

# Crear usuario no-root para ejecutar la aplicación
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser

# Establecer directorio de trabajo
WORKDIR /home/appuser

# Copiar el binario compilado desde el builder
COPY --from=builder /app/main .

# Cambiar propietario del binario
RUN chown appuser:appuser main

# Cambiar a usuario no-root
USER appuser

# Exponer el puerto
EXPOSE 8080

# Variables de entorno por defecto
ENV PORT=8080
ENV NODE_API_URL=http://api-nodejs:3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Comando para ejecutar la aplicación
CMD ["./main"]
