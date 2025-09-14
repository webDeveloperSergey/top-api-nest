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
import { Products } from './products.model';
import { FindProductsDto } from './dto/find-products.dto';

@Controller('products')
export class ProductsController {
  @Get(':id')
  async get(@Param('id') id: string) {}

  @Post('create')
  async create(@Body() dto: Omit<Products, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Products) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async find(@Body() dto: FindProductsDto) {}
}
