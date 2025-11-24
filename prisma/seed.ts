import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Limpiar datos existentes
  await prisma.workflowTask.deleteMany();
  await prisma.workflowInstance.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios de prueba
  const hashedPassword = await bcrypt.hash('Password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@bpmn.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@bpmn.com',
      password: hashedPassword,
      name: 'Regular User',
      role: 'USER',
    },
  });

  console.log('✅ Users created:', { adminUser: adminUser.email, regularUser: regularUser.email });

  // Crear workflows de ejemplo
  const approvalWorkflow = await prisma.workflow.create({
    data: {
      name: 'Proceso de Aprobación',
      description: 'Workflow para aprobar solicitudes de compra',
      status: 'ACTIVE',
      userId: adminUser.id,
      bpmnXml: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <process id="approval-process" name="Approval Process">
    <startEvent id="start" />
    <userTask id="review" name="Review Request" />
    <userTask id="approve" name="Approve Request" />
    <endEvent id="end" />
  </process>
</definitions>`,
    },
  });

  const onboardingWorkflow = await prisma.workflow.create({
    data: {
      name: 'Proceso de Onboarding',
      description: 'Workflow para incorporar nuevos empleados',
      status: 'ACTIVE',
      userId: adminUser.id,
      bpmnXml: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <process id="onboarding-process" name="Onboarding Process">
    <startEvent id="start" />
    <userTask id="setup" name="Setup Equipment" />
    <userTask id="training" name="Training" />
    <endEvent id="end" />
  </process>
</definitions>`,
    },
  });

  const orderWorkflow = await prisma.workflow.create({
    data: {
      name: 'Proceso de Pedidos',
      description: 'Workflow para procesar pedidos de clientes',
      status: 'DRAFT',
      userId: regularUser.id,
    },
  });

  console.log('✅ Workflows created:', { 
    approvalWorkflow: approvalWorkflow.name, 
    onboardingWorkflow: onboardingWorkflow.name,
    orderWorkflow: orderWorkflow.name,
  });

  // Crear instancias de workflow
  const instance1 = await prisma.workflowInstance.create({
    data: {
      workflowId: approvalWorkflow.id,
      userId: adminUser.id,
      status: 'RUNNING',
      variables: {
        requestId: 'REQ-001',
        amount: 5000,
        requester: 'John Doe',
      },
    },
  });

  const instance2 = await prisma.workflowInstance.create({
    data: {
      workflowId: approvalWorkflow.id,
      userId: adminUser.id,
      status: 'COMPLETED',
      variables: {
        requestId: 'REQ-002',
        amount: 1500,
        requester: 'Jane Smith',
      },
      finishedAt: new Date(),
    },
  });

  const instance3 = await prisma.workflowInstance.create({
    data: {
      workflowId: onboardingWorkflow.id,
      userId: adminUser.id,
      status: 'PENDING',
      variables: {
        employeeName: 'Alice Johnson',
        department: 'Engineering',
        startDate: '2024-01-15',
      },
    },
  });

  console.log('✅ Workflow instances created:', { 
    instance1: instance1.id, 
    instance2: instance2.id,
    instance3: instance3.id,
  });

  // Crear tareas para las instancias
  await prisma.workflowTask.createMany({
    data: [
      {
        name: 'Revisar Solicitud',
        description: 'Revisar la solicitud de compra',
        status: 'COMPLETED',
        instanceId: instance1.id,
        completedAt: new Date(),
        result: { approved: true, comments: 'Aprobado' },
      },
      {
        name: 'Aprobar Solicitud',
        description: 'Aprobar o rechazar la solicitud',
        status: 'IN_PROGRESS',
        instanceId: instance1.id,
        assignedTo: adminUser.id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días
      },
      {
        name: 'Configurar Equipo',
        description: 'Configurar laptop y accesos',
        status: 'PENDING',
        instanceId: instance3.id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días
      },
    ],
  });

  console.log('✅ Workflow tasks created');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📧 Test credentials:');
  console.log('   Admin: admin@bpmn.com / Password123');
  console.log('   User:  user@bpmn.com / Password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });