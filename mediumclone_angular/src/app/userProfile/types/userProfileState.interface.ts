import { UserProfile } from './userProfile.interface';

export interface UserProfileState {
  data: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
