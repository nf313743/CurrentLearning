import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CreateArticleState } from '../types/createArticleState.interface';
import { createArticleActions } from './actions';

const initialState: CreateArticleState = {
  isSubmiting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmiting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state) => ({
      ...state,
      isSubmiting: false,
      validationErrors: null,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmiting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmiting,
  selectValidationErrors,
} = createArticleFeature;
