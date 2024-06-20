import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { getModelToken } from '@nestjs/sequelize';
import { MailService } from './mail/mail.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
        const result: User[] = [

            {   username: 'testuser', email: 'testuser@example.com',
                verificationToken: '123456', isVerified: false    },
             
          ] as User[];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);

      expect(await userController.getAllUsers()).toBe(result);
    });
  });
});