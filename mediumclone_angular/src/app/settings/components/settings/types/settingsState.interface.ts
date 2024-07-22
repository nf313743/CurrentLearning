import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
