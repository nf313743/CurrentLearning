import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { authActions } from '../../store/actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'mc-register',
  templateUrl: 'register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  ngOnInit() {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
