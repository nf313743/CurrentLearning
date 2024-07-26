import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/types/article.interface';
import { AddToFavoritesService } from '../services/AddToFavoritesService';
import { addToFavoritesActions } from './actions';

export const addToFavoritesEffect = createEffect(
  (actions$ = inject(Actions), service = inject(AddToFavoritesService)) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? service.removeFromFavorites(slug)
          : service.addToFavorites(slug);

        return article$.pipe(
          map((article: Article) => {
            return addToFavoritesActions.addToFavouritesSuccess({ article });
          })
        );
      }),
      catchError(() => {
        return of(addToFavoritesActions.addToFavouritesFailure());
      })
    );
  },
  { functional: true }
);
