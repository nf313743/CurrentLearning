import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { EditArticleState } from '../types/editArticleState.interface';
import { editArticleActions } from './actions';

const initialState: EditArticleState = {
  article: null,
  isLoading: false,
  isSubmiting: false,
  validationErrors: null,
};

const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(editArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(editArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(editArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(editArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmiting: true,
    })),
    on(editArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmiting: false,
    })),
    on(editArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmiting: false,
      validationErrors: action.errors,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmiting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = editArticleFeature;
