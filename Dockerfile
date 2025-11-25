# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Argument para DATABASE_URL (solo para build)
ARG DATABASE_URL

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente de Prisma (requiere DATABASE_URL aunque no se conecte)
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Etapa 2: Production
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production

# Comando de inicio
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]