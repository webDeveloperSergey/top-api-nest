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
import { ProductModule } from './product.module';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Get(':id')
  async get(@Param('id') id: string) {}

  @Post('create')
  async create(@Body() dto: Omit<ProductModule, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModule) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async find(@Body() dto: FindProductDto) {}
}
