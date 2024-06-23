import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { FeedComponent } from '../shared/components/feed/feed.component';

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
})
export class GlobalFeedComponent implements OnInit {
  apiUrl = '/articles';

  ngOnInit() {}
}
