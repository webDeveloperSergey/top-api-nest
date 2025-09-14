import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Auth {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
}

// 2. Создаем схему Mongoose
export const AuthSchema = SchemaFactory.createForClass(Auth);

// 3. Типы для использования в сервисах
export type AuthDocument = HydratedDocument<Auth>;
