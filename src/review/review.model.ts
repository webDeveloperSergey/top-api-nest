import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, maxlength: 1000 })
  description: string;

  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

export type ReviewDocument = HydratedDocument<Review>;
