import { Test } from '@nestjs/testing';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService],
      }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
        const result: User[] = [

            {   username: 'testuser', email: 'testuser@example.com',
                verificationToken: '123456', isVerified: false    },
             
          ] as User[];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);

      expect(await userController.getAllUsers()).toBe(result);
    });
  });
});