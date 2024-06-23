import { GetFeedResonse } from './getFeedResponse.interface';

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResonse | null;
}
