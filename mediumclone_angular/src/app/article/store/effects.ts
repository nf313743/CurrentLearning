import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/types/article.interface';
import { articleActions } from './actions';

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: Article) => {
            return articleActions.getArticleSuccess({ article });
          })
        );
      }),
      catchError(() => {
        return of(articleActions.getArticleFailure());
      })
    );
  },
  { functional: true }
);
