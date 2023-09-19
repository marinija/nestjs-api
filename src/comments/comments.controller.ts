import {
  Controller,
  Get,
  Param,
  Body,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { CommentsEntity } from './comments.entity';

@Controller('articles')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':slug/comments')
  async getComments(
    @Param('slug') slug: string,
  ): Promise<{ comments: CommentsEntity[] }> {
    const comments = await this.commentsService.getComments(slug);
    console.log(comments);
    return { comments };
  }

  @Post(':slug/comments')
  @UseGuards(AuthGuard)
  async addComment(
    @Param('slug') slug: string,
    @Body('comment') createCommentDto: CreateCommentsDto,
  ) {
    const comment = await this.commentsService.addComment(
      slug,
      createCommentDto,
    );
    return this.commentsService.buildCommentResponse(comment);
  }

  @Delete(':slug/comments/:id')
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') commentId: number,
  ) {
    return await this.commentsService.deleteComment(slug, commentId);
  }
}
