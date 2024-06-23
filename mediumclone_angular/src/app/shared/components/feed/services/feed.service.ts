import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetFeedResonse } from '../types/getFeedResponse.interface';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private http = inject(HttpClient);

  getFeed(url: string): Observable<GetFeedResonse> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<GetFeedResonse>(fullUrl);
  }
}
