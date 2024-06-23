import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'mc-topbar',
  templateUrl: 'topBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent implements OnInit {
  private store = inject(Store);

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  ngOnInit() {}
}
