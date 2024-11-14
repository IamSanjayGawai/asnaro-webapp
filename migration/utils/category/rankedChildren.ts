export const rankedChildren = (
  rankedParentCategories: any,
  truncatedCategories: any
) => {
  const rankedChildSubcategories = rankedParentCategories.map(
    (category: any) => {
      const subcategories = truncatedCategories.filter(
        (subcategory: any) =>
          subcategory.parent_category_id === category.category_id
      );
      return {
        parentCategory: category.category_id,
        subcategories:
          subcategories.length > 0
            ? subcategories.map((subcategory: any, index: number) => {
                return {
                  ...subcategory,
                  rank: index + 1,
                };
              })
            : [],
        length: subcategories.length,
      };
    }
  );
  return rankedChildSubcategories;
};
