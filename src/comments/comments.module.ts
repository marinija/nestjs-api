import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { ArticleModule } from '@app/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, ArticleEntity]),
    ArticleModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
