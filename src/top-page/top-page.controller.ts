import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Get(':id')
  async get(@Param('id') id: string) {}

  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModule) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async find(@Body() dto: FindTopPageDto) {}
}
