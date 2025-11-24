import { body, param, query } from 'express-validator';

export const createInstanceValidation = [
  body('workflowId')
    .notEmpty()
    .withMessage('Workflow ID is required')
    .isUUID()
    .withMessage('Invalid workflow ID format'),
  
  body('variables')
    .optional()
    .isObject()
    .withMessage('Variables must be an object'),
];

export const updateInstanceValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid instance ID format'),
  
  body('status')
    .optional()
    .isIn(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED'])
    .withMessage('Invalid status value'),
  
  body('variables')
    .optional()
    .isObject()
    .withMessage('Variables must be an object'),
];

export const instanceIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid instance ID format'),
];

export const workflowIdQueryValidation = [
  query('workflowId')
    .optional()
    .isUUID()
    .withMessage('Invalid workflow ID format'),
];