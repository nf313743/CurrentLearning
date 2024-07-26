import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUserProfileResponse } from '../types/getUserProfileResponse.interface';
import { UserProfile } from '../types/userProfile.interface';

@Injectable()
export class UserProfileService {
  private http = inject(HttpClient);

  getUserProfile(slug: string): Observable<UserProfile> {
    const url = `${environment.apiUrl}/profiles/${slug}`;
    return this.http
      .get<GetUserProfileResponse>(url)
      .pipe(map((response) => response.profile));
  }
}
