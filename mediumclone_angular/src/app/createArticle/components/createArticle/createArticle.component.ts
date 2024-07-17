import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/articleForm/articleForm.component';
import { ArticleFormValues } from 'src/app/shared/components/articleForm/types/articleFormValues.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import {
  selectIsSubmiting,
  selectValidationErrors,
} from '../../store/reducers';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  private store = inject(Store);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmiting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  onSubmit(articleFormValues: ArticleFormValues): void {
    const request: ArticleRequest = {
      article: articleFormValues,
    };

    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
