import prisma from '../config/database';
import { CreateWorkflowInstanceDto, UpdateWorkflowInstanceDto } from '../types/workflow-instance.types';

class WorkflowInstanceService {
  async getAllInstances(userId: string, workflowId?: string) {
    return await prisma.workflowInstance.findMany({
      where: {
        userId,
        ...(workflowId && { workflowId }),
      },
      include: {
        workflow: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        tasks: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInstanceById(id: string, userId: string) {
    return await prisma.workflowInstance.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        workflow: true,
        tasks: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async createInstance(data: CreateWorkflowInstanceDto, userId: string) {
    // Verificar que el workflow existe y pertenece al usuario
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: data.workflowId,
        userId,
      },
    });

    if (!workflow) {
      throw new Error('Workflow not found');
    }

    if (workflow.status !== 'ACTIVE') {
      throw new Error('Workflow must be active to create instances');
    }

    return await prisma.workflowInstance.create({
      data: {
        workflowId: data.workflowId,
        userId,
        variables: data.variables,
        status: 'PENDING',
      },
      include: {
        workflow: true,
      },
    });
  }

  async updateInstance(id: string, data: UpdateWorkflowInstanceDto, userId: string) {
    const instance = await this.getInstanceById(id, userId);

    if (!instance) {
      return null;
    }

    return await prisma.workflowInstance.update({
      where: { id },
      data: {
        status: data.status,
        variables: data.variables,
        finishedAt: data.finishedAt,
      },
      include: {
        workflow: true,
        tasks: true,
      },
    });
  }

  async startInstance(id: string, userId: string) {
    const instance = await this.getInstanceById(id, userId);

    if (!instance) {
      throw new Error('Instance not found');
    }

    if (instance.status !== 'PENDING') {
      throw new Error('Instance must be in PENDING status to start');
    }

    return await prisma.workflowInstance.update({
      where: { id },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
      },
    });
  }

  async cancelInstance(id: string, userId: string) {
    const instance = await this.getInstanceById(id, userId);

    if (!instance) {
      throw new Error('Instance not found');
    }

    if (instance.status === 'COMPLETED' || instance.status === 'CANCELLED') {
      throw new Error('Cannot cancel completed or already cancelled instance');
    }

    return await prisma.workflowInstance.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        finishedAt: new Date(),
      },
    });
  }

  async deleteInstance(id: string, userId: string) {
    const instance = await this.getInstanceById(id, userId);

    if (!instance) {
      return false;
    }

    await prisma.workflowInstance.delete({
      where: { id },
    });

    return true;
  }
}

export default new WorkflowInstanceService();