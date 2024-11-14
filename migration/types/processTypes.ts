import mongoose from "mongoose";

export type Process = {
  process_id: number;
  _id: mongoose.Types.ObjectId;
  years_type: string;
  status: string;
  pref: string;
  mun: string;
  user: mongoose.Types.ObjectId;
  parent_category: string;
  child_category: string;
  reviews: any[];
  totalRatingSum: number;
  totalReviews: number;
  tags: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

export interface SqlProcess {
  process_counter: number;
  cost_price: number;
  hourly_price: number;
  image_path: string;
  search_word: string;
  city: string;
  review: string;
  create_date: string;
  update_date: string;
  parent_category_id: number;
  children_category: number;
  customer_id: number;
  years_type: number;
  status: number;
  [key: string]: any;
  process_id: number;
}

export interface SqlReview {
  [key: string]: any;
}

export interface SqlPref {
  [key: string]: any;
}

export interface User {
  customer_id?: string;
  _id: mongoose.Types.ObjectId;
}
