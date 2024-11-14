import { QueryResult } from "mysql2";
import Category from "../models/Category";
import { rankedParents } from "../utils/category/rankedParents";
import { rankedChildren } from "../utils/category/rankedChildren";
import { SqlCategory } from "../types/categoryTypes";

export const categoryMigration = async (sqlCategories: QueryResult) => {
  const categoriesArray = Array.isArray(sqlCategories)
    ? (sqlCategories as unknown as SqlCategory[])
    : [];
  const truncatedCategories =
    categoriesArray.length > 0
      ? categoriesArray.map((category: SqlCategory) => {
          return {
            category_id: category.category_id,
            category_name: category.category_name,
            parent_category_id: category.parent_category_id,
            level: category.level,
            rank: 0,
            creator_id: category.creator_id,
            create_date: new Date(category.create_date),
            update_date: category.update_date
              ? new Date(category.update_date)
              : new Date(),
            category_code: category.category_code,
          };
        })
      : [];

  const rankedParentCategories = rankedParents(truncatedCategories);
  const rankedChildSubcategories = rankedChildren(
    rankedParentCategories,
    truncatedCategories
  );

  const allSubcategories = Array.isArray(rankedChildSubcategories)
    ? rankedChildSubcategories.reduce((acc, curr) => {
        return curr.subcategories.concat(acc);
      }, [] as SqlCategory[])
    : [];
  const allCategories = rankedParentCategories.concat(allSubcategories);

  const categories = await Promise.all(
    allCategories.map((category: SqlCategory) => Category.create(category))
  );

  return {
    categories,
  };
};
