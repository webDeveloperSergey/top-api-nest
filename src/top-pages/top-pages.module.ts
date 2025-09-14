import { Module } from '@nestjs/common';
import { TopPagesController } from './top-pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPages, TopPagesSchema } from './top-pages.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPages.name, schema: TopPagesSchema }]),
  ],
  controllers: [TopPagesController],
})
export class TopPagesModule {}
