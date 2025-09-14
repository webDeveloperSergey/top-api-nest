import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Reviews } from './reviews.model';

@Controller('reviews')
export class ReviewsController {
  @Get('byProduct/:id')
  async getByProduct(@Param('id') productId: string) {}

  @Post('create')
  async create(@Body() dto: Omit<Reviews, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
