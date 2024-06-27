import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleResponse } from '../types/articleResponse.interface';
import { Article } from '../types/article.interface';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);

  getArticle(slug: string): Observable<Article> {
    const fullUrl = `${environment.apiUrl}/articles${slug}`;
    return this.http.get<ArticleResponse>(fullUrl).pipe(map((x) => x.article));
  }
}
