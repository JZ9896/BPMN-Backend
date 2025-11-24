export interface Workflow {
  id: string;
  name: string;
  description?: string;
  bpmnXml?: string;
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkflowDto {
  name: string;
  description?: string;
  bpmnXml?: string;
}

export interface UpdateWorkflowDto {
  name?: string;
  description?: string;
  bpmnXml?: string;
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
}