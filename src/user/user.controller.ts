import { Controller, Post, Get, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

// User controller handles incoming HTTP requests for user-related operations
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

   // Handle POST request to register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto.username, createUserDto.email);
    return { message: 'User registered successfully', user };
  }

  // Handle GET request to verify a user's email
  @Get('verify-email/:username/:token')
  async verifyEmail(@Param('username') username: string, @Param('token') token: string) {
    const result = await this.userService.verifyEmail(username, token);
    if (!result) throw new BadRequestException('Verification failed');
    return { message: 'Email verified successfully' };
  }

  // Handle GET request to check if a user's email is verified
  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string) {
    const isVerified = await this.userService.checkVerification(username);
    if (!isVerified) return { message: 'User is not verified' };
    return { message: 'User is verified' };
  }


  //for seeing all users in database - geçici olarak eklendi
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
