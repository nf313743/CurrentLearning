import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTag } from 'src/app/shared/types/popularTag.type';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{ popularTags: PopularTag[] }>(),
    'Get popular tags failure': emptyProps(),
  },
});
