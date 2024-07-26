import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleResponse } from 'src/app/shared/types/articleResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddToFavoritesService {
  private http = inject(HttpClient);

  addToFavorites(slug: string): Observable<Article> {
    const url = this.getUrl(slug);

    return this.http.post<ArticleResponse>(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<Article> {
    const url = this.getUrl(slug);

    return this.http
      .delete<ArticleResponse>(url, {})
      .pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponse): Article {
    return response.article;
  }
}
