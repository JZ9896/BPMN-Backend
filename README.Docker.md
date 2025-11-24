# Docker Setup

## Desarrollo Local

### Iniciar solo la base de datos:
```bash
npm run docker:dev
```

Esto iniciará PostgreSQL y Redis en contenedores. La aplicación se ejecuta localmente con `npm run dev`.

### Configurar variables de entorno:
```bash
DATABASE_URL="postgresql://bpmn_user:bpmn_password@localhost:5432/bpmn_db"
```

### Ejecutar migraciones:
```bash
npm run prisma:migrate
npm run prisma:seed
```

### Detener servicios:
```bash
npm run docker:dev:down
```

## Producción

### Construir y levantar todos los servicios:
```bash
npm run docker:build
npm run docker:up
```

### Ver logs:
```bash
npm run docker:logs
```

### Acceder a la aplicación:
- API: http://localhost:3000
- Docs: http://localhost:3000/api-docs

### Detener servicios:
```bash
npm run docker:down
```

## Comandos útiles

### Ejecutar comando en contenedor:
```bash
docker exec -it bpmn-backend sh
```

### Ver logs de PostgreSQL:
```bash
docker logs bpmn-postgres
```

### Conectar a PostgreSQL:
```bash
docker exec -it bpmn-postgres psql -U bpmn_user -d bpmn_db
```

### Limpiar volúmenes (⚠️ elimina datos):
```bash
docker-compose down -v
```