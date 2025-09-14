import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  async register(@Body() dto: UsersDto) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: UsersDto) {}
}
