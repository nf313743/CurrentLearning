import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';
import { ArticleResponse } from 'src/app/shared/types/articleResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreateArticleService {
  private http = inject(HttpClient);

  createArticle(articleRequest: ArticleRequest): Observable<Article> {
    const fullUrl = environment.apiUrl + '/articles';

    return this.http
      .post<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
