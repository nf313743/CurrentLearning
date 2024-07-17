import { createActionGroup, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{ request: ArticleRequest }>(),
    'Create article success': props<{ article: Article }>(),
    'Create article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
