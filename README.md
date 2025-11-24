# 🚀 BPMN Backend - Workflow Management Platform

![CI/CD](https://github.com/tu-usuario/BPMN-Backend/workflows/CI%2FCD%20Pipeline/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-85%25-green.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

Plataforma empresarial de Gestión de Procesos de Negocio (BPM) y automatización de flujos de trabajo construida con Node.js, TypeScript y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Docker](#-docker)
- [CI/CD](#-cicd)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

### Core Features
- ✅ **Autenticación JWT** - Sistema completo de registro, login y autorización
- ✅ **Gestión de Workflows** - CRUD completo con soporte BPMN 2.0
- ✅ **Ejecución de Instancias** - Motor de ejecución de procesos
- ✅ **Sistema de Tareas** - Asignación y seguimiento de tareas
- ✅ **Variables Dinámicas** - Almacenamiento flexible con JSON

### Seguridad
- 🔒 **JWT Authentication** - Tokens seguros con expiración
- 🔐 **Password Hashing** - Bcrypt con salt rounds
- 🛡️ **Rate Limiting** - Protección contra ataques de fuerza bruta
- 🔑 **CORS Configurado** - Control de orígenes permitidos
- 🪖 **Helmet.js** - Headers de seguridad HTTP

### Calidad y Observabilidad
- 📊 **Logging con Winston** - Logs estructurados con rotación diaria
- 📈 **Request Logging** - Trazabilidad completa de peticiones
- ✅ **Validación Robusta** - Express-validator en todas las rutas
- 🧪 **Tests Unitarios** - Jest + Supertest
- 📚 **Swagger Documentation** - API docs interactiva

### DevOps
- 🐳 **Docker Ready** - Containerización completa
- 🔄 **CI/CD Pipeline** - GitHub Actions automatizado
- 📦 **Database Migrations** - Prisma ORM
- 🌱 **Data Seeding** - Datos de prueba automatizados

## 🛠️ Tecnologías

| Categoría | Tecnología |
|-----------|-----------|
| **Runtime** | Node.js 18+ |
| **Lenguaje** | TypeScript 5.0 |
| **Framework** | Express.js |
| **Base de Datos** | PostgreSQL 15+ |
| **ORM** | Prisma 6.0 |
| **Autenticación** | JWT + Bcrypt |
| **Validación** | Express-validator |
| **Logging** | Winston |
| **Testing** | Jest + Supertest |
| **Documentación** | Swagger/OpenAPI 3.0 |
| **Containerización** | Docker + Docker Compose |

## 📦 Requisitos

- **Node.js** >= 18.0.0
- **PostgreSQL** >= 14.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Docker** >= 20.10 (opcional)
- **Docker Compose** >= 2.0 (opcional)

## 🚀 Instalación

### Opción 1: Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/JZ9896/BPMN-Backend.git
cd BPMN-Backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Generar cliente de Prisma
npm run prisma:generate

# 5. Ejecutar migraciones
npm run prisma:migrate

# 6. Poblar base de datos (opcional)
npm run prisma:seed

# 7. Iniciar servidor de desarrollo
npm run dev
```

### Opción 2: Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/JZ9896/BPMN-Backend.git
cd BPMN-Backend

# 2. Iniciar con Docker Compose
npm run docker:up

# 3. Ver logs
npm run docker:logs
```

## ⚙️ Configuración

### Variables de Entorno

```env
# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bpmn_db"

# JWT
JWT_SECRET=366c18bb37e792878ca97f8722d5c913927c44617b3889fbe6603449a4523db45c152268ffda5dede5f0df29da528b0dcc0354a82ebab5e3ddb729f6524eca15
JWT_EXPIRES_IN=7d
```

### Configuración de Base de Datos

```bash
# Crear base de datos
createdb bpmn_db

# O con Docker
docker run --name bpmn-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=bpmn_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

## 📖 Uso

### Iniciar Servidor

```bash
# Desarrollo con hot-reload
npm run dev

# Producción
npm run build
npm start
```

### Acceder a la Aplicación

- **API Base URL:** http://localhost:3000/api
- **API Documentation:** http://localhost:3000/api-docs
- **Health Check:** http://localhost:3000/api/health

### Credenciales de Prueba

Después de ejecutar el seed:

```
Admin: admin@bpmn.com / Password123
User:  user@bpmn.com / Password123
```

## 📚 API Documentation

### Endpoints Principales

#### Authentication

```http
POST   /api/auth/register    # Registrar usuario
POST   /api/auth/login       # Iniciar sesión
GET    /api/auth/profile     # Obtener perfil (requiere auth)
```

#### Workflows

```http
GET    /api/workflows        # Listar workflows
GET    /api/workflows/:id    # Obtener workflow
POST   /api/workflows        # Crear workflow
PUT    /api/workflows/:id    # Actualizar workflow
DELETE /api/workflows/:id    # Eliminar workflow
```

#### Workflow Instances

```http
GET    /api/instances              # Listar instancias
GET    /api/instances/:id          # Obtener instancia
POST   /api/instances              # Crear instancia
PUT    /api/instances/:id          # Actualizar instancia
POST   /api/instances/:id/start    # Iniciar ejecución
POST   /api/instances/:id/cancel   # Cancelar instancia
DELETE /api/instances/:id          # Eliminar instancia
```

### Ejemplos de Uso

**Registrar Usuario:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "Password123",
    "name": "Nuevo Usuario"
  }'
```

**Crear Workflow:**
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Mi Proceso",
    "description": "Descripción del proceso",
    "bpmnXml": "<xml>...</xml>"
  }'
```

**Documentación Completa:** http://localhost:3000/api-docs

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Solo tests unitarios
npm run test:unit

# Solo tests de integración
npm run test:integration
```

### Estructura de Tests

```
tests/
├── unit/
│   ├── utils/
│   │   ├── jwt.util.test.ts
│   │   └── password.util.test.ts
│   └── services/
│       └── auth.service.test.ts
├── integration/
│   ├── auth.test.ts
│   └── workflow.test.ts
└── setup.ts
```

## 🐳 Docker

### Comandos Docker

```bash
# Desarrollo (solo BD)
npm run docker:dev
npm run docker:dev:down

# Producción (aplicación completa)
npm run docker:build
npm run docker:up
npm run docker:down

# Ver logs
npm run docker:logs

# Ejecutar comandos en contenedor
docker exec -it bpmn-backend sh
```

### Docker Compose Services

- **postgres** - PostgreSQL 15
- **app** - Node.js application
- **redis** - Redis (para futuras features)

## 🔄 CI/CD

### GitHub Actions Workflows

- **CI/CD Pipeline** - Ejecuta en cada push/PR
  - ✅ Lint y Type Check
  - 🏗️ Build
  - 🧪 Tests
  - 🐳 Docker Build
  - 🔒 Security Scan

- **Deploy** - Ejecuta en push a main
  - 🚀 Deploy automático

### Configurar CI/CD

1. Fork el repositorio
2. Configurar secrets en GitHub:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `SERVER_HOST` (opcional)

## 📁 Estructura del Proyecto

```
BPMN-Backend/
├── .github/
│   └── workflows/          # GitHub Actions
├── prisma/
│   ├── migrations/         # Migraciones de BD
│   ├── schema.prisma       # Schema de Prisma
│   └── seed.ts            # Datos de prueba
├── src/
│   ├── config/            # Configuraciones
│   ├── controllers/       # Controladores de rutas
│   ├── services/          # Lógica de negocio
│   ├── routes/            # Definición de rutas
│   ├── middlewares/       # Middlewares personalizados
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilidades
│   └── index.ts           # Punto de entrada
├── tests/                 # Tests
├── logs/                  # Logs de la aplicación
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── tsconfig.json
└── package.json
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Roadmap

- [ ] Tests E2E con Playwright
- [ ] Integración con motor BPMN (Camunda)
- [ ] Sistema de notificaciones (Email/Push)
- [ ] Webhooks para eventos
- [ ] Panel de analytics
- [ ] Versionamiento de workflows
- [ ] Auditoría de cambios
- [ ] Rate limiting por usuario
- [ ] GraphQL API

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Jesus Zambrano** - *Trabajo Inicial* - [JZ9896](https://github.com/JZ9896)

## 🙏 Agradecimientos

- Express.js Team
- Prisma Team
- BPMN.io Community

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

**Documentación Adicional:**
- [Docker Setup](README.Docker.md)
- [API Reference](http://localhost:3000/api-docs)
- [Contributing Guide](CONTRIBUTING.md)