import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema({ _id: false })
export class TopPagesHhData {
  @Prop({ required: true, min: 0 })
  count: number;

  @Prop({ required: true, min: 0 })
  juniorSalary: number;

  @Prop({ required: true, min: 0 })
  middleSalary: number;

  @Prop({ required: true, min: 0 })
  seniorSalary: number;
}

@Schema({ _id: false })
export class TopPagesAdvantage {
  @Prop({ required: true, trim: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, maxlength: 500 })
  description: string;
}

@Schema({
  timestamps: true,
  collection: 'top-pages',
})
export class TopPages {
  @Prop({
    required: true,
    enum: TopLevelCategory,
    type: Number,
  })
  firstCategory: TopLevelCategory;

  @Prop({ required: true, trim: true })
  secondCategory: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  title: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ type: TopPagesHhData })
  hh?: TopPagesHhData;

  @Prop({ type: [TopPagesAdvantage], default: [] })
  advantages: TopPagesAdvantage[];

  @Prop({ maxlength: 2000 })
  seoText: string;

  @Prop({ trim: true, maxlength: 100 })
  tagsTitle: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const TopPagesHhDataSchema = SchemaFactory.createForClass(TopPagesHhData);
export const TopPagesAdvantageSchema =
  SchemaFactory.createForClass(TopPagesAdvantage);
export const TopPagesSchema = SchemaFactory.createForClass(TopPages);

export type TopPagesDocument = HydratedDocument<TopPages>;
