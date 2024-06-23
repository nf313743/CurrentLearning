import { IArticle } from 'src/app/shared/types/article.interface';

export interface GetFeedResonse {
  articles: IArticle[];
  articlesCount: number;
}
