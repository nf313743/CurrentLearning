import { PopularTag } from 'src/app/shared/types/popularTag.type';

export interface PopularTagsState {
  isLoading: boolean;
  error: string | null;
  data: PopularTag[] | null;
}
