import { Request, Response } from 'express';
import workflowService from '../services/workflow.service';

class WorkflowController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const workflows = await workflowService.getAllWorkflows(userId);
      
      res.json({
        success: true,
        data: workflows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workflows',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const workflow = await workflowService.getWorkflowById(id, userId);
      
      if (!workflow) {
        res.status(404).json({
          success: false,
          message: 'Workflow not found',
        });
        return;
      }
      
      res.json({
        success: true,
        data: workflow,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workflow',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const workflow = await workflowService.createWorkflow(req.body, userId);
      
      res.status(201).json({
        success: true,
        data: workflow,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating workflow',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const workflow = await workflowService.updateWorkflow(id, req.body, userId);
      
      if (!workflow) {
        res.status(404).json({
          success: false,
          message: 'Workflow not found',
        });
        return;
      }
      
      res.json({
        success: true,
        data: workflow,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating workflow',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const deleted = await workflowService.deleteWorkflow(id, userId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Workflow not found',
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Workflow deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting workflow',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new WorkflowController();