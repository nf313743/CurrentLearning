import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UserProfileComponent } from './components/userProfile/userProfile.component';
import { UserProfileService } from './services/userProfile.service';
import * as userProileEffects from './store/effects';
import { userProfileFeatureKey, userProfileReducer } from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProileEffects),
    ],
  },
];
