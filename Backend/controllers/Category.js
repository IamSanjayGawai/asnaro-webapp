import Category from "../models/Category.js";

export const getAllMainCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent_category_id: 0 });
    const sortedCategories = categories.sort((a, b) => {
      if (a.rank && b.rank) {
        return a.rank - b.rank;
      }
      if (a.rank) {
        return -1;
      }
      if (b.rank) {
        return 1;
      }
      return 0;
    });
    res.json(sortedCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const RegisterParentDisplayId = async (req, res) => {
  try {
    const { display_id, category_name } = req.body;
    const newCategory = await Category.find({ category_name });
    newCategory.forEach((category) => {
      category.parent_sort_id = display_id;
      category.save();
    });
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubcategoriesByCategoryId = async (req, res) => {
  try {
    if (req.params.categoryId === "all") {
      const subcategories = await Category.find({});
      const sortedCategories = subcategories.sort((a, b) => {
        if (a.rank && b.rank) {
          return a.rank - b.rank;
        }
        if (a.rank) {
          return -1;
        }
        if (b.rank) {
          return 1;
        }
        return 0;
      });
      return res.json(sortedCategories);
    }
    const categoryId = parseInt(req.params.categoryId);
    const subcategories = await Category.find({
      parent_category_id: categoryId,
    });
    const sortedCategories = subcategories.sort((a, b) => {
      if (a.rank && b.rank) {
        return a.rank - b.rank;
      }
      if (a.rank) {
        return -1;
      }
      if (b.rank) {
        return 1;
      }
      return 0;
    });

    return res.json(sortedCategories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const setSortOrderForCategoriesToZero = async (req, res) => {
  try {
    const categories = await Category.find({});
    await Promise.all(categories.map(async(category)=>{
      return await Category.findByIdAndUpdate(category._id,{
        rank : 0
      })
    }));
    return res.status(200).json({
      message : "Categories sorting updated"
    })
  } catch (error) {
    console.log("Error setting sort orders", error);
    return res.status(500).json({
      message : "Something went wrong",
      error,
    })
  }
}

export const setSortOrderForCategories = async (req, res) => {
  try {
    const {rankedCategories} = req.body;
    await Promise.all(rankedCategories.map(async(category)=>{
      return await Category.findByIdAndUpdate(category._id,{
        rank : category.rank
      })
    }));
    return res.status(200).json({
      message : "Categories sorting updated"
    })
  } catch (error) {
    console.log("Error setting sort orders", error);
    return res.status(500).json({
      message : "Something went wrong",
      error,
    })
  }
}
