import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { ReviewsService } from './reviews.service';
import { REVIEW_NOT_FOUND } from './reviews.constants';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('byProduct/:id')
  async getByProduct(@Param('id') productId: string) {
    return await this.reviewsService.findByProductId(productId);
  }

  @Post('create')
  async create(@Body() reviewData: CreateReviewsDto) {
    return await this.reviewsService.create(reviewData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewsService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return { status: 'deleted' };
  }
}
