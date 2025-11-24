import { body, param } from 'express-validator';

export const createWorkflowValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('bpmnXml')
    .optional()
    .isString()
    .withMessage('BPMN XML must be a string'),
];

export const updateWorkflowValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid workflow ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('bpmnXml')
    .optional()
    .isString()
    .withMessage('BPMN XML must be a string'),
  
  body('status')
    .optional()
    .isIn(['DRAFT', 'ACTIVE', 'INACTIVE'])
    .withMessage('Status must be DRAFT, ACTIVE, or INACTIVE'),
];

export const idParamValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid workflow ID format'),
];