import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';
import { ArticleResponse } from 'src/app/shared/types/articleResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class EditArticleService {
  private http = inject(HttpClient);

  updateArticle(
    slug: string,
    articleRequest: ArticleRequest
  ): Observable<Article> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .put<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
