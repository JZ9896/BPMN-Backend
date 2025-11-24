# Guía de Contribución

¡Gracias por tu interés en contribuir a BPMN Backend! 🎉

## Código de Conducta

Este proyecto sigue un código de conducta. Al participar, se espera que mantengas este código.

## ¿Cómo puedo contribuir?

### Reportar Bugs

Los bugs se rastrean como issues de GitHub. Crea un issue y proporciona:

- Título claro y descriptivo
- Pasos exactos para reproducir el problema
- Comportamiento esperado vs actual
- Screenshots si es posible
- Versión de Node.js y sistema operativo

### Sugerir Mejoras

Las mejoras también se rastrean como issues. Incluye:

- Título claro y descriptivo
- Descripción detallada de la mejora
- Casos de uso
- Beneficios esperados

### Pull Requests

1. Fork el repo y crea tu rama desde `develop`
2. Agrega tests si agregas código
3. Asegúrate de que los tests pasen
4. Actualiza la documentación
5. Sigue el estilo de código del proyecto

## Desarrollo

### Setup

```bash
git clone https://github.com/JZ9896/BPMN-Backend.git
cd BPMN-Backend
npm install
npm run docker:dev
npm run dev
```

### Tests

```bash
npm test
npm run test:coverage
```

### Estándares de Código

- TypeScript estricto
- ESLint + Prettier
- Convenciones de nombres descriptivos
- Comentarios en funciones complejas

### Commits

Usa commits semánticos:

```
feat: Agregar nueva funcionalidad
fix: Corregir bug
docs: Cambios en documentación
style: Formato, punto y coma faltantes, etc
refactor: Refactorización de código
test: Agregar tests
chore: Actualizar dependencias
```

## Preguntas?

Abre un issue o contacta a [jazambrano@urbe.edu.ve](mailto:jazambrano@urbe.edu.ve)