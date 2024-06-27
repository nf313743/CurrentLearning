import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from 'src/app/shared/types/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: Article }>(),
    'Get article failure': emptyProps(),
  },
});
