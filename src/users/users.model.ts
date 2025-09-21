import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
@Schema()
export class Users {
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
export const UsersSchema = SchemaFactory.createForClass(Users);

// 3. Типы для использования в сервисах
export type UsersDocument = HydratedDocument<Users>;
