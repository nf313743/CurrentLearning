import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { CurrentUser } from 'src/app/shared/types/currentUser.interface';
import { userProfileActions } from '../../store/actions';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../../store/reducers';
import { UserProfile } from '../../types/userProfile.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = '';
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUser => Boolean(currentUser))
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfile => Boolean(userProfile))
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      return currentUser.username === userProfile.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
