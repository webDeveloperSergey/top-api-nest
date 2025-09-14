import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false }) // Отключаем _id для вложенной схемы
class ProductCharacteristic {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

// "timestamps: true" - автоматически добавит createdAt и updatedAt
@Schema({ timestamps: true })
export class Product {
  // _id: string; // автоматически создается MongoDB, не нужно описывать

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0 })
  oldPrice: number;

  @Prop({ min: 0, max: 5, default: 0 })
  calculateRated: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  advantages?: string;

  @Prop()
  desAdvantages?: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [ProductCharacteristic], default: [] })
  characteristics: ProductCharacteristic[];
}

export const ProductCharacteristicSchema = SchemaFactory.createForClass(
  ProductCharacteristic,
);
export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDocument = HydratedDocument<Product>;
