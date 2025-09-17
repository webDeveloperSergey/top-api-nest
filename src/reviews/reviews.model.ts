import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({
    type: Types.ObjectId, // ← MongoDB ObjectId (24 символа hex)
    ref: 'Products', // ← Ссылается на модель Product
    required: true,
    index: true, // ← Индекс для быстрого поиска отзывов по товару
  })
  productId: Types.ObjectId;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);

export type ReviewsDocument = HydratedDocument<Reviews>;
