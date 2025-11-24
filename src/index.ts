import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { swaggerSpec } from './config/swagger';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rate-limit.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import logger from './config/logger';

const app = express();

// Seguridad
app.use(helmet());

// CORS
app.use(cors({
  origin: config.corsOrigins.split(','),
  credentials: true,
}));

// Request logging
app.use(requestLogger);

// Rate limiting
app.use('/api/', apiLimiter);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'BPMN Backend API Docs',
}));

// Rutas
app.use('/api', routes);

// Middleware para rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar servidor
app.listen(config.port, () => {
  logger.info(`🚀 BPMN Backend running on http://localhost:${config.port}`);
  logger.info(`📦 Environment: ${config.nodeEnv}`);
  logger.info(`📝 API Version: ${config.apiVersion}`);
  logger.info(`📚 API Docs: http://localhost:${config.port}/api-docs`);
});