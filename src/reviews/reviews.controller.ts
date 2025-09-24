import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { REVIEW_NOT_FOUND } from './reviews.constants';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:id')
  async getByProduct(
    @Param('id') productId: string,
    @UserEmail() email: string,
  ) {
    console.log('email', email);
    return await this.reviewsService.findByProductId(productId);
  }

  @Post('create')
  async create(@Body() reviewData: CreateReviewsDto) {
    return await this.reviewsService.create(reviewData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewsService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return { status: 'deleted' };
  }
}
