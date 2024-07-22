import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/articleForm/articleForm.component';
import { ArticleFormValues } from 'src/app/shared/components/articleForm/types/articleFormValues.interface';
import { Article } from 'src/app/shared/types/article.interface';
import { ArticleRequest } from 'src/app/shared/types/articleRequest.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { editArticleActions } from '../../store/actions';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmiting,
  selectValidationErrors,
} from '../../store/reducers';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private slug = this.route.snapshot.paramMap.get('slug') ?? '';

  initialValues$: Observable<ArticleFormValues> = this.store.pipe(
    select(selectArticle),
    filter((article): article is Article => article !== null),
    map((article: Article) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmiting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValues): void {
    const request: ArticleRequest = {
      article: articleFormValues,
    };

    this.store.dispatch(
      editArticleActions.updateArticle({ request, slug: this.slug })
    );
  }
}
