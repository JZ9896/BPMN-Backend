import prisma from '../config/database';
import { CreateWorkflowDto, UpdateWorkflowDto } from '../types/workflow.types';

class WorkflowService {
  async getAllWorkflows(userId: string) {
    return await prisma.workflow.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWorkflowById(id: string, userId: string) {
    return await prisma.workflow.findFirst({
      where: { 
        id,
        userId,
      },
    });
  }

  async createWorkflow(data: CreateWorkflowDto, userId: string) {
    return await prisma.workflow.create({
      data: {
        name: data.name,
        description: data.description,
        bpmnXml: data.bpmnXml,
        userId,
      },
    });
  }

  async updateWorkflow(id: string, data: UpdateWorkflowDto, userId: string) {
    // Verificar que el workflow pertenece al usuario
    const workflow = await this.getWorkflowById(id, userId);
    
    if (!workflow) {
      return null;
    }

    return await prisma.workflow.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        bpmnXml: data.bpmnXml,
        status: data.status,
      },
    });
  }

  async deleteWorkflow(id: string, userId: string) {
    // Verificar que el workflow pertenece al usuario
    const workflow = await this.getWorkflowById(id, userId);
    
    if (!workflow) {
      return false;
    }

    await prisma.workflow.delete({
      where: { id },
    });
    
    return true;
  }
}

export default new WorkflowService();