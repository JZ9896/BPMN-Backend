import { Router } from 'express';
import workflowInstanceController from '../controllers/workflow-instance.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  createInstanceValidation,
  updateInstanceValidation,
  instanceIdValidation,
  workflowIdQueryValidation,
} from '../middlewares/workflow-instance.validation';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

/**
 * @swagger
 * /api/instances:
 *   get:
 *     summary: Obtener todas las instancias de workflows
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: workflowId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de workflow (opcional)
 *     responses:
 *       200:
 *         description: Lista de instancias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkflowInstance'
 */
router.get('/', workflowIdQueryValidation, validateRequest, workflowInstanceController.getAll);

/**
 * @swagger
 * /api/instances/{id}:
 *   get:
 *     summary: Obtener instancia por ID
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la instancia
 *     responses:
 *       200:
 *         description: Instancia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WorkflowInstance'
 *       404:
 *         description: Instancia no encontrada
 */
router.get('/:id', instanceIdValidation, validateRequest, workflowInstanceController.getById);

/**
 * @swagger
 * /api/instances:
 *   post:
 *     summary: Crear nueva instancia de workflow
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workflowId
 *             properties:
 *               workflowId:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               variables:
 *                 type: object
 *                 example:
 *                   orderAmount: 1000
 *                   customerName: Juan Perez
 *     responses:
 *       201:
 *         description: Instancia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WorkflowInstance'
 *       400:
 *         description: Error de validación o workflow no encontrado
 */
router.post('/', createInstanceValidation, validateRequest, workflowInstanceController.create);

/**
 * @swagger
 * /api/instances/{id}:
 *   put:
 *     summary: Actualizar instancia de workflow
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la instancia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, RUNNING, COMPLETED, FAILED, CANCELLED]
 *                 example: RUNNING
 *               variables:
 *                 type: object
 *                 example:
 *                   approved: true
 *     responses:
 *       200:
 *         description: Instancia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WorkflowInstance'
 *       404:
 *         description: Instancia no encontrada
 */
router.put('/:id', updateInstanceValidation, validateRequest, workflowInstanceController.update);

/**
 * @swagger
 * /api/instances/{id}/start:
 *   post:
 *     summary: Iniciar ejecución de instancia
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la instancia
 *     responses:
 *       200:
 *         description: Instancia iniciada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Workflow instance started successfully
 *                 data:
 *                   $ref: '#/components/schemas/WorkflowInstance'
 *       400:
 *         description: Error al iniciar instancia (estado inválido)
 */
router.post('/:id/start', instanceIdValidation, validateRequest, workflowInstanceController.start);

/**
 * @swagger
 * /api/instances/{id}/cancel:
 *   post:
 *     summary: Cancelar instancia de workflow
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la instancia
 *     responses:
 *       200:
 *         description: Instancia cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Workflow instance cancelled successfully
 *                 data:
 *                   $ref: '#/components/schemas/WorkflowInstance'
 *       400:
 *         description: No se puede cancelar la instancia (ya completada o cancelada)
 */
router.post('/:id/cancel', instanceIdValidation, validateRequest, workflowInstanceController.cancel);

/**
 * @swagger
 * /api/instances/{id}:
 *   delete:
 *     summary: Eliminar instancia de workflow
 *     tags: [Workflow Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la instancia
 *     responses:
 *       200:
 *         description: Instancia eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Workflow instance deleted successfully
 *       404:
 *         description: Instancia no encontrada
 */
router.delete('/:id', instanceIdValidation, validateRequest, workflowInstanceController.delete);

export default router;