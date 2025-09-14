import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reviews, ReviewsSchema } from './reviews.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reviews.name, schema: ReviewsSchema }]),
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
