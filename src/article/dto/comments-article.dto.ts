import { IsNotEmpty } from 'class-validator';

export class CommentsArticleDto {
  id: number;

  @IsNotEmpty()
  comment: string;

  userId: number;

  articleId: number;
}
