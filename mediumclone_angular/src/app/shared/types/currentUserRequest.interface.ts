export interface CurrentUserRequest {
  user: CurrentUserRequest & { password: string };
}
