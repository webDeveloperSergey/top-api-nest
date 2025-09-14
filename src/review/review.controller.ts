import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Get('byProduct/:id')
  async getByProduct(@Param('id') productId: string) {}

  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
