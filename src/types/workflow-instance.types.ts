export interface WorkflowInstance {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  startedAt: Date;
  finishedAt?: Date;
  variables?: any;
  workflowId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkflowInstanceDto {
  workflowId: string;
  variables?: any;
}

export interface UpdateWorkflowInstanceDto {
  status?: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  variables?: any;
  finishedAt?: Date;
}

export interface WorkflowTask {
  id: string;
  name: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  result?: any;
  instanceId: string;
  createdAt: Date;
  updatedAt: Date;
}