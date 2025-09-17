import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';
import { Reviews, ReviewsDocument } from './reviews.model';
import { CreateReviewsDto } from './dto/create-reviews.dto';

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
    return this.reviewsModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deletedByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewsModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}
