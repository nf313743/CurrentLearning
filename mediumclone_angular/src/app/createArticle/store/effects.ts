import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CreateArticleService } from '../services/createArticle.service';
import { createArticleActions } from './actions';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return articleService
          .createArticle(request)
          .pipe(
            map((article) =>
              createArticleActions.createArticleSuccess({ article })
            )
          );
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(
          createArticleActions.createArticleFailure({
            errors: errorResponse.error.errors,
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => router.navigate(['/articles', article.slug]))
    );
  },
  { functional: true, dispatch: false }
);
