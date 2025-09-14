import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false }) // Отключаем _id для вложенной схемы
class ProductsCharacteristic {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

// "timestamps: true" - автоматически добавит createdAt и updatedAt
@Schema({ timestamps: true })
export class Products {
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

  @Prop({ type: [ProductsCharacteristic], default: [] })
  characteristics: ProductsCharacteristic[];
}

export const ProductsCharacteristicSchema = SchemaFactory.createForClass(
  ProductsCharacteristic,
);
export const ProductsSchema = SchemaFactory.createForClass(Products);

export type ProductsDocument = HydratedDocument<Products>;
