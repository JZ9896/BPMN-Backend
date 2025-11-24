import { PrismaClient } from '@prisma/client';

// Mock de Prisma para tests
jest.mock('../src/config/database', () => ({
  __esModule: true,
  default: new PrismaClient(),
}));

// Variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';