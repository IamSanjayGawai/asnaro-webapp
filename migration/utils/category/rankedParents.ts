export const rankedParents = (truncatedCategories: any) => {
  const rankedParentCategories = truncatedCategories
    .filter((category: any) => category.parent_category_id === 0)
    .map((category: any, index: number) => {
      return {
        ...category,
        rank: index + 1,
      };
    });
  return rankedParentCategories;
};
