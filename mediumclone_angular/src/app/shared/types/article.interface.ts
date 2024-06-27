import { PopularTag } from './popularTag.type';
import { Profile } from './profile.interface';

export interface Article {
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCounter: number;
  slug: string;
  tagList: PopularTag[];
  title: string;
  updatedAt: string;
  author: Profile;
}
