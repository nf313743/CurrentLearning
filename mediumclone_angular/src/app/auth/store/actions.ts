import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../types/backendErrors.interface';
import { LogingRequestInterface as LoginRequestInterface } from '../types/loginRequest.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Request failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),
  },
});
