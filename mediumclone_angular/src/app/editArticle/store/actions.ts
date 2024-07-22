import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';

export const editArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: Article }>(),
    'Get article failure': emptyProps(),

    'Update article': props<{ request: ArticleRequest; slug: string }>(),
    'Update article success': props<{ article: Article }>(),
    'Update article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
