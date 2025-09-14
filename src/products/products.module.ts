import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
