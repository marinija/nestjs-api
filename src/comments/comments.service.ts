import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { ArticleEntity } from '@app/article/article.entity';
import { ArticleService } from '@app/article/article.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private articleService: ArticleService,
  ) {}

  async getComments(slug: string): Promise<any[]> {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comments = await this.commentsRepository.find({
      where: { articleId: article.id },
    });

    const data = comments.map((x) => ({ ...x, author: article.author }));

    return data;
  }

  async addComment(
    slug: string,
    createCommentDto: CreateCommentsDto,
  ): Promise<CommentsEntity> {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comment = new CommentsEntity();

    Object.assign(comment, createCommentDto, {
      userId: article.author.id,
      articleId: article.id,
      author: article.author,
    });

    return await this.commentsRepository.save(comment);
  }

  buildCommentResponse(comments: CommentsEntity) {
    return { comments };
  }

  async deleteComment(slug: string, commentId: number) {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist ', HttpStatus.NOT_FOUND);
    }

    return await this.commentsRepository.delete({ id: commentId });
  }
}
