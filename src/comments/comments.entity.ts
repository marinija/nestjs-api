import { ArticleEntity } from '@app/article/article.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column({ default: '' })
  body: string;

  @ManyToOne(() => ArticleEntity, (article) => article.author)
  author: ArticleEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
