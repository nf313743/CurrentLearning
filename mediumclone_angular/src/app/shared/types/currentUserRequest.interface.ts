import { CurrentUser } from './currentUser.interface';

export interface CurrentUserRequest {
  user: CurrentUser & { password: string };
}
