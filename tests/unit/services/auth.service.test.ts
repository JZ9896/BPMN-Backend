import authService from '../../../src/services/auth.service';
import prisma from '../../../src/config/database';
import { RegisterDto, LoginDto } from '../../../src/types/auth.types';

// Mock de Prisma
jest.mock('../../../src/config/database', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'Password123',
      name: 'Test User',
    };

    it('should register a new user successfully', async () => {
      const mockUser = {
        id: '123',
        email: registerDto.email,
        name: registerDto.name,
        role: 'USER',
        password: 'hashedPassword',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register(registerDto);

      expect(result).toBeDefined();
      expect(result.user.email).toBe(registerDto.email);
      expect(result.user.name).toBe(registerDto.name);
      expect(result.token).toBeDefined();
    });

    it('should throw error if user already exists', async () => {
      const existingUser = {
        id: '123',
        email: registerDto.email,
        name: registerDto.name,
        role: 'USER',
        password: 'hashedPassword',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      await expect(authService.register(registerDto)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'Password123',
    };

    it('should throw error if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow('Invalid credentials');
    });

    it('should throw error if user is inactive', async () => {
      const inactiveUser = {
        id: '123',
        email: loginDto.email,
        password: 'hashedPassword',
        isActive: false,
        role: 'USER',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(inactiveUser);

      await expect(authService.login(loginDto)).rejects.toThrow();
    });
  });
});