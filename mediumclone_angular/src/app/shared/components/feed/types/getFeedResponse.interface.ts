import { Article } from 'src/app/shared/types/article.interface';

export interface GetFeedResonse {
  articles: Article[];
  articlesCount: number;
}
