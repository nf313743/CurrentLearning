import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../types/userProfile.interface';

export const userProfileActions = createActionGroup({
  source: ' User Profile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get user profile success': props<{ userProfile: UserProfile }>(),
    'Get user profile failure': emptyProps(),
  },
});
