import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from 'src/app/shared/types/article.interface';

export const addToFavoritesActions = createActionGroup({
  source: 'Add to favorites',
  events: {
    'Add to favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add to favourites success': props<{ article: Article }>(),
    'Add to favourites failure': emptyProps(),
  },
});
