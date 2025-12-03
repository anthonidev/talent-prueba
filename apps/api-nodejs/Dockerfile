# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el código fuente
COPY . .

# Compilar la aplicación TypeScript
RUN pnpm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm y solo dependencias de producción
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

# Copiar el código compilado desde el builder
COPY --from=builder /app/dist ./dist

# Usar usuario node existente (UID/GID 1000)
# Cambiar propietario de los archivos
RUN chown -R node:node /app

# Cambiar a usuario no-root
USER node

# Exponer el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV PORT=3000
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/statistics/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
