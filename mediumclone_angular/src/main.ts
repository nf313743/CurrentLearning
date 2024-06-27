import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.route';
import {
  articleFeatureKey,
  articleReducer,
} from './app/article/store/reducers';
import * as authEffects from './app/auth/store/effects';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import * as feedEffects from './app/shared/components/feed/store/effects';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers';
import * as popularTagsEffects from './app/shared/components/popularTags/store/effects';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/popularTags/store/reducers';
import { authInterceptor } from './app/shared/services/authInterceptor';

import * as articleEffects from './app/article/store/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({ router: routerReducer }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideState(articleFeatureKey, articleReducer),
    provideEffects(
      authEffects,
      feedEffects,
      popularTagsEffects,
      articleEffects
    ),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
