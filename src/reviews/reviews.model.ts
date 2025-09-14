import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Reviews {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, maxlength: 1000 })
  description: string;

  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);

export type ReviewsDocument = HydratedDocument<Reviews>;
