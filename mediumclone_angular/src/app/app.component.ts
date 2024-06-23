import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';
import { TopBarComponent } from './shared/components/topbar/topBar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
