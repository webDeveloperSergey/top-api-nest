import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { Reviews, ReviewsDocument } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name)
    private readonly reviewsModel: Model<ReviewsDocument>,
  ) {}

  async create(reviewData: CreateReviewsDto): Promise<ReviewsDocument> {
    return this.reviewsModel.create(reviewData);
  }

  async delete(id: string): Promise<ReviewsDocument | null> {
    return this.reviewsModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewsDocument[]> {
    return this.reviewsModel.find({ productId }).exec();
  }

  async deletedByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewsModel.deleteMany({ productId }).exec();
  }
}
