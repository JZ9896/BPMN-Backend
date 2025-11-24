import { Router, Request, Response } from 'express';
import workflowRoutes from './workflow.routes';
import authRoutes from './auth.routes';
import workflowInstanceRoutes from './workflow-instance.routes';

const router = Router();

// Ruta de bienvenida
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'BPMN Backend API',
    version: '1.0.0',
    status: 'running'
  });
});

// Ruta de health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de workflows
router.use('/workflows', workflowRoutes);

// Rutas de workflow instances
router.use('/instances', workflowInstanceRoutes);

export default router;