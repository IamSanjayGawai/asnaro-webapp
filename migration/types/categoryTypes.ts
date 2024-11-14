export interface SqlCategory {
  category_id: number;
  category_name: string;
  parent_category_id: number | null;
  level: number;
  creator_id: number;
  create_date: string;
  update_date?: string;
  category_code: string;
}
