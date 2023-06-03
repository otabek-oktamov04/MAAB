import { IUser } from "./user";

export interface IReview {
  id: string;
  stationId: string;
  user: IUser;
  rating: number;
  review: string;
  created_time: string;
}

export interface IReviewData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IReview[];
}
