import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, Subscription } from 'rxjs';
import { authActions } from 'src/app/auth/store/actions';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUser } from 'src/app/shared/types/currentUser.interface';
import { CurrentUserRequest } from 'src/app/shared/types/currentUserRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from './store/reducers';

@Component({
  selector: 'mc-settings',
  templateUrl: 'settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  store = inject(Store);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUser;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  currentUserSubscription?: Subscription;

  ngOnInit() {
    this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currecntUser) => {
        this.currentUser = currecntUser;

        this.initialiseForm();
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  initialiseForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  submit() {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }

    const currentUserRequest: CurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }
}
