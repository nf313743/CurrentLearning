import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PersistenceService } from 'src/app/shared/services/persistence.services';
import { CurrentUser } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        if (!persistenceService.get('accessToken'))
          return of(authActions.getCurrentUserFailure());

        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUser) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          })
        );
      }),
      catchError(() => {
        return of(authActions.getCurrentUserFailure());
      })
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          })
        );
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(
          authActions.requestFailure({
            errors: errorResponse.error.errors,
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const updateCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({ currentUserRequest }) => {
        return authService.updateCurrentUser(currentUserRequest).pipe(
          map((currentUser: CurrentUser) => {
            return authActions.updateCurrentUserSuccess({ currentUser });
          })
        );
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(
          authActions.updateCurrentUserFailure({
            errors: errorResponse.error.errors,
          })
        );
      })
    );
  },
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistenceService.set('access_token', '');
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
