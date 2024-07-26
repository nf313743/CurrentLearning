import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserProfileService } from '../services/userProfile.service';
import { UserProfile } from '../types/userProfile.interface';
import { userProfileActions } from './actions';

export const getUserProfileEffect = createEffect(
  (actions$ = inject(Actions), service = inject(UserProfileService)) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return service.getUserProfile(slug).pipe(
          map((userProfile: UserProfile) => {
            return userProfileActions.getUserProfileSuccess({ userProfile });
          })
        );
      }),
      catchError(() => {
        return of(userProfileActions.getUserProfileFailure());
      })
    );
  },
  { functional: true }
);
