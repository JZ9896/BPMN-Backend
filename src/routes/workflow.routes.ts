import { Router } from 'express';
import workflowController from '../controllers/workflow.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { 
  createWorkflowValidation, 
  updateWorkflowValidation, 
  idParamValidation 
} from '../middlewares/workflow.validation';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Obtener todos los workflows del usuario
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de workflows
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
 *                     $ref: '#/components/schemas/Workflow'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', workflowController.getAll);

/**
 * @swagger
 * /api/workflows/{id}:
 *   get:
 *     summary: Obtener workflow por ID
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del workflow
 *     responses:
 *       200:
 *         description: Workflow encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Workflow'
 *       404:
 *         description: Workflow no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', idParamValidation, validateRequest, workflowController.getById);

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Crear nuevo workflow
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Proceso de Aprobación
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Workflow para aprobar solicitudes
 *               bpmnXml:
 *                 type: string
 *                 example: <?xml version="1.0" encoding="UTF-8"?>...
 *     responses:
 *       201:
 *         description: Workflow creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Workflow'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createWorkflowValidation, validateRequest, workflowController.create);

/**
 * @swagger
 * /api/workflows/{id}:
 *   put:
 *     summary: Actualizar workflow
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del workflow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Proceso Actualizado
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Descripción actualizada
 *               bpmnXml:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DRAFT, ACTIVE, INACTIVE]
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Workflow actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Workflow'
 *       404:
 *         description: Workflow no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', updateWorkflowValidation, validateRequest, workflowController.update);

/**
 * @swagger
 * /api/workflows/{id}:
 *   delete:
 *     summary: Eliminar workflow
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del workflow
 *     responses:
 *       200:
 *         description: Workflow eliminado exitosamente
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
 *                   example: Workflow deleted successfully
 *       404:
 *         description: Workflow no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', idParamValidation, validateRequest, workflowController.delete);

export default router;