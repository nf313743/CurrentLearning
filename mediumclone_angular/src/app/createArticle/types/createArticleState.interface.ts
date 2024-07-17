import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';

export interface CreateArticleState {
  isSubmiting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
