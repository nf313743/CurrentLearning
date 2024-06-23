import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTag } from 'src/app/shared/types/popularTag.type';
import { environment } from 'src/environments/environment';
import { GetPopularTagsResponse } from '../types/getPopularTagsResponse.interface';

@Injectable({ providedIn: 'root' })
export class PopularTagService {
  private http = inject(HttpClient);

  getPopularTags(): Observable<PopularTag[]> {
    const url = environment.apiUrl + '/tags';
    return this.http.get<GetPopularTagsResponse>(url).pipe(map((x) => x.tags));
  }
}
