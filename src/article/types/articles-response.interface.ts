import { ArticleType } from './articles.type';

export interface IArticlesResponse {
  articles: Array<ArticleType>;
  articlesCount: number;
}
