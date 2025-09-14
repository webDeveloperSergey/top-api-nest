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
import { Products } from '../products/products.model';
import { TopPages } from './top-pages.model';
import { FindTopPagesDto } from './dto/find-top-pages.dto';

@Controller('top-pages')
export class TopPagesController {
  @Get(':id')
  async get(@Param('id') id: string) {}

  @Post('create')
  async create(@Body() dto: Omit<TopPages, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Products) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async find(@Body() dto: FindTopPagesDto) {}
}
