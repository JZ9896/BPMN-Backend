import { Request, Response } from 'express';
import workflowInstanceService from '../services/workflow-instance.service';

class WorkflowInstanceController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const workflowId = req.query.workflowId as string | undefined;
      
      const instances = await workflowInstanceService.getAllInstances(userId, workflowId);
      
      res.json({
        success: true,
        data: instances,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workflow instances',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const instance = await workflowInstanceService.getInstanceById(id, userId);
      
      if (!instance) {
        res.status(404).json({
          success: false,
          message: 'Workflow instance not found',
        });
        return;
      }
      
      res.json({
        success: true,
        data: instance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workflow instance',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const instance = await workflowInstanceService.createInstance(req.body, userId);
      
      res.status(201).json({
        success: true,
        data: instance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating workflow instance',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const instance = await workflowInstanceService.updateInstance(id, req.body, userId);
      
      if (!instance) {
        res.status(404).json({
          success: false,
          message: 'Workflow instance not found',
        });
        return;
      }
      
      res.json({
        success: true,
        data: instance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating workflow instance',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async start(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const instance = await workflowInstanceService.startInstance(id, userId);
      
      res.json({
        success: true,
        message: 'Workflow instance started successfully',
        data: instance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error starting workflow instance',
      });
    }
  }

  async cancel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const instance = await workflowInstanceService.cancelInstance(id, userId);
      
      res.json({
        success: true,
        message: 'Workflow instance cancelled successfully',
        data: instance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error cancelling workflow instance',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const deleted = await workflowInstanceService.deleteInstance(id, userId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Workflow instance not found',
        });
        return;
      }
      
      res.json({
        success: true,
        message: 'Workflow instance deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting workflow instance',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new WorkflowInstanceController();