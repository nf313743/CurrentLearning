import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { FeedComponent } from '../shared/components/feed/feed.component';
import { FeedTogglerComponent } from '../shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from '../shared/components/popularTags/popularTags.component';

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  private route = inject(ActivatedRoute);

  apiUrl = '';
  tagName = '';

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
