import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GetFeedResonse } from '../types/getFeedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get feed': props<{ url: string }>(),
    'Get feed success': props<{ feed: GetFeedResonse }>(),
    'Get feed failure': emptyProps(),
  },
});
