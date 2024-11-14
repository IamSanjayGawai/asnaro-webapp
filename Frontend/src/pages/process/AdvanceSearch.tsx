import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/state/hooks";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "@/utils/baseUrl";
import { Category, Subcategory } from "@/types/types";
import Spinner from "@/components/static/Spinner";
import { processSearchThunk } from "@/state/thunks/processThunks";
import dayjs from "dayjs";

const DetailSearch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [categoryLoading, setCategoryLoading] = React.useState<boolean>(true);
  const [cityLoading, setCityLoading] = React.useState<boolean>(true);
  const [selectedStates, setStates] = React.useState<string[]>([]);
  const [selectedState, setSelectedState] = React.useState<string>("all");
  const [cities, setCities] = React.useState<any>([]);
  const [selectedCities, setSelectedCities] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState<string>("all");
  const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
  const [subCategory, setSubCategory] = React.useState<string>("");
  const [keyword, setKeyword] = React.useState<string>(
    queryParams.get("keyword") ? queryParams.get("keyword") : ""
  );
  const [startDate, setStartDate] = React.useState<Date | string>(
    queryParams.get("startDate") ? new Date(queryParams.get("startDate")) : ""
  );
  const [endDate, setEndDate] = React.useState<Date | string>(
    queryParams.get("endDate") ? new Date(queryParams.get("endDate")) : ""
  );

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_URL}/areas/states`);
        setStates(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchStates();
  }, []);

  React.useEffect(() => {
    handleCategoryChange(category);
  }, []);

  React.useEffect(() => {
    handleStatesChange(selectedState);
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${BASE_URL}/categories/all`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleStatesChange = async (state) => {
    setSelectedState(state);
    setCityLoading(true);
    console.log("state selected", state);
    try {
      const response = await axios.get(
        `${BASE_URL}/areas/areas-city/${encodeURIComponent(state)}`
      );
      setCities(response.data);
      setCityLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setCategory(categoryId);
    setCategoryLoading(true);
    try {
      const response = await axios.get<Subcategory[]>(
        `${BASE_URL}/categories/subcategories/${categoryId}`
      );
      setSubcategories(response.data);
      setCategoryLoading(false);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCheckboxChange = (city?: string, area?: string) => {
    if (city === "all") {
      if (
        selectedCities.length ===
        cities?.map((obj) => obj?.cities).flat().length
      ) {
        return setSelectedCities([]);
      } else {
        const allCities = cities.map((obj) => obj.cities).flat();
        return setSelectedCities(allCities.filter((c) => c !== "all"));
      }
    }

    if (city === "area") {
      const selectedArea = cities.find((obj) => obj.area === area);
      const allCities = selectedArea?.cities || [];

      // Remove the area if all its cities are already selected
      if (
        allCities.every((city) => selectedCities.includes(city)) &&
        selectedCities.length > 0
      ) {
        return setSelectedCities(
          selectedCities.filter((c) => !allCities.includes(c))
        );
      }

      // Merge the existing selected cities with the cities for the specific area
      return setSelectedCities((prevCities) => [
        ...prevCities,
        ...allCities.filter((c) => !prevCities.includes(c)),
      ]);
    }

    const isSelected = selectedCities.includes(city);

    if (isSelected) {
      setSelectedCities((prevCities) =>
        prevCities.filter((selectedCity) => selectedCity !== city)
      );
    } else {
      setSelectedCities((prevCities) => [...prevCities, city]);
    }
  };

  const allCategories = categories.map((category) => category.category_id);

  const FormSubmit = (e) => {
    e.preventDefault();
    if (startDate > endDate && endDate !== "") {
      alert("Start date cannot be greater than end date");
      return;
    }
    dispatch(
      processSearchThunk({
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        keyword,
        cat:
          category === "all" ? allCategories : ([category] as unknown as any),
        subCat: subCategory,
        pref: selectedState === "all" ? selectedStates : [selectedState],
        mun: selectedCities === "all" ? selectedCities : [selectedCities],
        pageSize: 12,
      })
    );
    navigate(
      `/process/search-results?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&cat=${
        category === "all" ? allCategories : ([category] as unknown as any)
      }&subCat=${subCategory}&pref=${
        selectedState === "all" ? selectedStates : [selectedState]
      }&mun=${selectedCities === "all" ? selectedCities : [selectedCities]}`
    );
  };

  console.log(selectedState, "selectedState");
  console.log(selectedCities, "selectedCities");
  // console.log(cities, "cities");
  // console.log(allCategories, "categories");
  // console.log(category, "category");

  return (
    <>
      {categoryLoading || cityLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col  items-center border-b border-secondary">
          <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
            <h1 className="text-2xl font-bold text-[#255BB3] my-10 xs:text-center lg:text-left">
              詳細検索
            </h1>

            <form onSubmit={FormSubmit} className="mb-10">
              <div className="mt-4">
                <div className="grid grid-cols-[112px,1fr] sm:gap-8 items-center">
                  <h3 className="text-[#808080] text-sm">キーワード</h3>
                  <input
                    type="text"
                    id="first_name"
                    className="text-tertiary border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0  text-sm sm:w-2/3"
                    placeholder="例：切削加工"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-[112px,1fr] sm:gap-8 items-center">
                  <h3 className="text-[#808080] text-sm">日程</h3>
                  <div className="flex gap-2 sm:flex-wrap items-center  ">
                    <div className="border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0 w-1/2 sm:w-2/5 lg:w-1/6 text-sm cursor-pointer">
                      <DatePicker
                        placeholderText="Start Date"
                        dateFormat={"yyyy-MM-dd"}
                        className="text-tertiary w-full text-center"
                        selected={startDate as unknown as any}
                        onChange={(date) => setStartDate(date)}
                        locale="ja"
                      />
                    </div>

                    <span className="text-[#808080]">&mdash;</span>

                    <div className="border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0 w-1/2 sm:w-2/5  lg:w-1/6 text-sm cursor-pointer">
                      <DatePicker
                        placeholderText="End Date"
                        dateFormat={"yyyy-MM-dd"}
                        className="text-tertiary w-full text-center"
                        selected={endDate as unknown as any}
                        onChange={(date) => setEndDate(date)}
                        locale="ja"
                        minDate={startDate as unknown as any}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <div className="flex items-center flex-wrap gap-3 sm:gap-8 ">
                  <div className=" grid grid-cols-[110px,1fr]  sm:grid-cols-[142px,1fr] items-center  xs:w-full sm:w-[300px] lg:w-[300px] ">
                    <h3 className="text-[#808080] text-sm">カテゴリ</h3>

                    <select
                      id="first_name"
                      className="text-tertiary border-[1px] border-[#DCDCDC] p-2  rounded-[5px] outline-0 text-sm cursor-pointer"
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <option className="text-tertiary" value="all">
                        全て
                      </option>
                      {categories.map((category) => (
                        <option
                          className="text-tertiary"
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-[110px,1fr] sm:grid-cols-[128px,1fr] items-center  xs:w-full sm:w-[200px] lg:w-[200px] ">
                    <h3 className="text-[#808080] text-md">
                      サブカテゴリ
                      <span className="xs:hidden sm:hidden md:inline  lg:inline ">
                        ー
                      </span>{" "}
                    </h3>

                    <select
                      id="first_name"
                      className="text-tertiary border-[1px] border-[#DCDCDC] p-2 rounded-[5px] sm:w-[120px] outline-0 text-sm relative cursor-pointer"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option className="text-tertiary" value="">
                        全て
                      </option>
                      {subcategories.map((subcategory) => (
                        <option
                          className="text-tertiary"
                          key={subcategory.category_id}
                          value={subcategory.category_id}
                        >
                          {subcategory.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center bg-[#FFF4DF] py-5 my-8">
                <button
                  type="submit"
                  className="lg:bg-[#FFAA00]  md:bg-[#FFAA00]   xs:bg-[#255BB3] rounded  text-[#fff] text-sm font-[700] py-3 px-[6em]"
                >
                  この条件で検索する
                </button>
              </div>
            </form>

            <form onSubmit={FormSubmit}>
              <div className="grid grid-cols-[112px,189px] items-center mb-8">
                <h3 className="text-[#808080] text-sm">都道府県</h3>

                <select
                  id="dropdownHoverButton"
                  data-dropdown-toggle="dropdownHover"
                  data-dropdown-trigger="hover"
                  className=" flex justify-between items-center border-[1px] border-[#DCDCDC] text-[#808080] p-2 rounded-[5px] cursor-pointer"
                  value={selectedState}
                  onChange={(e) => handleStatesChange(e.target.value)}
                >
                  <option value="all">全て</option>
                  {selectedStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </select>
              </div>
              <div className="grid grid-cols-[112px,189px] items-center mb-8">
                <h3 className="text-[#808080] text-sm">市区町村</h3>
                <div className="flex items-center gap-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer "
                    checked={
                      selectedCities.length ===
                      cities?.map((obj) => obj?.cities).flat().length
                    }
                    onChange={() => handleCheckboxChange("all")}
                  />
                  <h3 className="text-[#808080] text-sm">全て</h3>
                </div>
              </div>
              {cities &&
                cities.map((obj, index) => (
                  <div key={index}>
                    <div className="bg-[#F8FBFF] p-3 mb-4 ">
                      <div className="xs:w-2/5 sm:w-[18%]  md:w-[20%] lg:w-[12%]">
                        <label className="flex items-center justify-start gap-5 cursor-pointer">
                          <span className="text-[#255BB3] font-[500] text-sm  ">
                            {obj?.area}
                          </span>
                          <input
                            type="checkbox"
                            className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer "
                            checked={
                              obj?.cities.length > 0 &&
                              obj?.cities.every((city) =>
                                selectedCities.includes(city)
                              )
                            }
                            onChange={() =>
                              handleCheckboxChange("area", obj?.area)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
                      {obj?.cities &&
                        obj?.cities.map((label, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <label
                              htmlFor={`${label}-${index}`}
                              className="cursor-pointer flex items-center"
                            >
                              <input
                                id={`${label}-${index}`}
                                type="checkbox"
                                value={selectedCities}
                                className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer"
                                checked={selectedCities.includes(label)}
                                onChange={() => handleCheckboxChange(label)}
                              />
                              <span className="text-[#808080] text-sm ml-1">
                                {label}
                              </span>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              <div className="flex justify-center bg-[#FFF4DF] py-5 mb-20">
                <button
                  type="submit"
                  className="lg:bg-[#FFAA00]  md:bg-[#FFAA00]  xs:bg-[#255BB3] rounded   text-[#fff] text-sm font-[700] py-3 px-[6em]"
                >
                  この条件で検索する
                </button>
              </div>
              <div className="flex justify-center mb-[10em]">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="text-[#fff] rounded bg-[#808080] text-sm font-[700] py-4 px-[9em]"
                >
                  戻る
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailSearch;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "@/state/hooks";
// import { SearchAction, selectProcess } from "@/state/slices/processSlice";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { BASE_URL } from "@/utils/baseUrl";
// import { Category, Subcategory } from "@/types/types";
// import Spinner from "@/components/static/Spinner";

// const DetailSearch = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { search } = useAppSelector(selectProcess);
//   const currentDate = new Date();
//   const [categoryLoading, setCategoryLoading] = React.useState<boolean>(true);
//   const [cityLoading, setCityLoading] = React.useState<boolean>(true);
//   const [selectedStates, setStates] = React.useState<string[]>([]);
//   const [selectedState, setSelectedState] = React.useState<string>("all");
//   const [cities, setCities] = React.useState<any>([]);
//   const [selectedCities, setSelectedCities] = React.useState<any>([]);
//   const [categories, setCategories] = React.useState<Category[]>([]);
//   const [category, setCategory] = React.useState<string>("all");
//   const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
//   const [subCategory, setSubCategory] = React.useState<string>("");
//   const [keyword, setKeyword] = React.useState<string>(
//     search && search?.keyword ? search.keyword : ""
//   );
//   const [startDate, setStartDate] = React.useState<Date>(
//     search && search?.startDate ? new Date(search.startDate) : currentDate
//   );
//   const [endDate, setEndDate] = React.useState<Date>(
//     search && search?.endDate ? new Date(search.endDate) : currentDate
//   );

//   React.useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get<string[]>(`${BASE_URL}/areas/states`);
//         setStates(response?.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchStates();
//   }, []);

//   React.useEffect(() => {
//     handleCategoryChange(category);
//   }, []);

//   React.useEffect(() => {
//     handleStatesChange(selectedState);
//   }, []);

//   React.useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get<Category[]>(
//           `${BASE_URL}/categories/all`
//         );
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleStatesChange = async (state) => {
//     setSelectedState(state);
//     setCityLoading(true);
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/areas/areas-city/${encodeURIComponent(state)}`
//       );
//       setCities(response.data);
//       setCityLoading(false);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const handleCategoryChange = async (categoryId: string) => {
//     setCategory(categoryId);
//     setCategoryLoading(true);
//     try {
//       const response = await axios.get<Subcategory[]>(
//         `${BASE_URL}/categories/subcategories/${categoryId}`
//       );
//       setSubcategories(response.data);
//       setCategoryLoading(false);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   const handleCheckboxChange = (city?: string, area?: string) => {
//     if (city === "all") {
//       if (
//         selectedCities.length ===
//         cities?.map((obj) => obj?.cities).flat().length
//       ) {
//         return setSelectedCities([]);
//       } else {
//         const allCities = cities.map((obj) => obj.cities).flat();
//         return setSelectedCities(allCities.filter((c) => c !== "all"));
//       }
//     }

//     if (city === "area") {
//       const selectedArea = cities.find((obj) => obj.area === area);
//       const allCities = selectedArea?.cities || [];

//       // Remove the area if all its cities are already selected
//       if (
//         allCities.every((city) => selectedCities.includes(city)) &&
//         selectedCities.length > 0
//       ) {
//         return setSelectedCities(
//           selectedCities.filter((c) => !allCities.includes(c))
//         );
//       }

//       // Merge the existing selected cities with the cities for the specific area
//       return setSelectedCities((prevCities) => [
//         ...prevCities,
//         ...allCities.filter((c) => !prevCities.includes(c)),
//       ]);
//     }

//     const isSelected = selectedCities.includes(city);

//     if (isSelected) {
//       setSelectedCities((prevCities) =>
//         prevCities.filter((selectedCity) => selectedCity !== city)
//       );
//     } else {
//       setSelectedCities((prevCities) => [...prevCities, city]);
//     }
//   };

//   const allCategories = categories.map((category) => category.category_id);

//   const FirstFormSubmit = (e) => {
//     e.preventDefault();
//     if (startDate > endDate) {
//       alert("Start date cannot be greater than end date");
//       return;
//     }
//     const searchQuery = {
//       keyword,
//       startDate,
//       endDate,
//       category: category === "all" ? allCategories : [category],
//       subCategory,
//     };
//     console.log(searchQuery);
//     dispatch(SearchAction(searchQuery));
//     navigate("/process/search-results");
//   };

//   const SecondFormSubmit = (e) => {
//     e.preventDefault();
//     const searchQuery = {
//       selectedState: selectedState === "all" ? selectedStates : [selectedState],
//       selectedCities,
//     };
//     console.log(searchQuery);
//     dispatch(SearchAction(searchQuery));
//     navigate("/process/search-results");
//   };

//   console.log(selectedCities, "selectedCities");
//   console.log(cities, "cities");
//   // console.log(allCategories, "categories");
//   // console.log(category, "category");

//   return (
//     <>
//       {categoryLoading || cityLoading ? (
//         <Spinner />
//       ) : (
//         <div className="flex justify-center flex-col  items-center border-b border-secondary">
//           <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
//             <h1 className="text-2xl font-bold text-[#255BB3] my-10 xs:text-center lg:text-left">

//               詳細検索

//           </h1>

//             <form onSubmit={FirstFormSubmit} className="mb-10">
//               <div className="mt-4">
//                 <div className="grid grid-cols-[112px,1fr] sm:gap-8 items-center">
//                   <h3 className="text-[#808080] text-sm">キーワード</h3>
//                   <input
//                     type="text"
//                     id="first_name"
//                     className="text-tertiary border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0  text-sm sm:w-2/3"
//                     placeholder="例：切削加工"
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <div className="grid grid-cols-[112px,1fr] sm:gap-8 items-center">
//                   <h3 className="text-[#808080] text-sm">日程</h3>
//                   <div className="flex gap-2 sm:flex-wrap items-center  ">
//                     <div className="border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0 w-1/2 sm:w-2/5 lg:w-1/6 text-sm cursor-pointer">
//                       <DatePicker
//                         dateFormat={"yyyy-MM-dd"}
//                         className="text-tertiary w-full text-center"
//                         selected={startDate}
//                         onChange={(date) => setStartDate(date)}
//                         locale="ja"
//                       />
//                     </div>

//                     <span className="text-[#808080]">&mdash;</span>

//                     <div className="border-[1px] border-[#DCDCDC] p-2 rounded-[5px] outline-0 w-1/2 sm:w-2/5  lg:w-1/6 text-sm cursor-pointer" >
//                       <DatePicker
//                         dateFormat={"yyyy-MM-dd"}
//                         className="text-tertiary w-full text-center"
//                         selected={endDate}
//                         onChange={(date) => setEndDate(date)}
//                         locale="ja"
//                         minDate={startDate}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 ">
//                 <div className="flex items-center flex-wrap gap-3 sm:gap-8 ">
//                   <div className=" grid grid-cols-[110px,1fr]  sm:grid-cols-[142px,1fr] items-center  xs:w-full sm:w-[300px] lg:w-[300px] ">
//                     <h3 className="text-[#808080] text-sm">カテゴリ</h3>

//                     <select
//                         id="first_name"
//                         className="text-tertiary border-[1px] border-[#DCDCDC] p-2  rounded-[5px] outline-0 text-sm cursor-pointer"
//                         placeholder="全て"
//                         value={category}
//                         onChange={(e) => handleCategoryChange(e.target.value)}
//                       >
//                         <option className="text-tertiary" value="all">
//                           全て
//                         </option>
//                         {categories.map((category) => (
//                           <option
//                             className="text-tertiary"
//                             key={category.category_id}
//                             value={category.category_id}
//                           >
//                             {category.category_name}
//                           </option>
//                         ))}
//                       </select>

//                 </div>

//                 <div className="grid grid-cols-[110px,1fr] sm:grid-cols-[128px,1fr] items-center  xs:w-full sm:w-[200px] lg:w-[200px] ">
//                     <h3 className="text-[#808080] text-md">サブカテゴリ<span className= "xs:hidden sm:hidden md:inline  lg:inline ">ー</span> </h3>

//                     <select
//                         id="first_name"
//                         className="text-tertiary border-[1px] border-[#DCDCDC] p-2 rounded-[5px] sm:w-[120px] outline-0 text-sm relative cursor-pointer"
//                         placeholder="鋳造"
//                         value={subCategory}
//                         onChange={(e) => setSubCategory(e.target.value)}
//                       >
//                         <option className="text-tertiary" value="">
//                           全て
//                         </option>
//                         {subcategories.map((subcategory) => (
//                           <option
//                             className="text-tertiary"
//                             key={subcategory.category_id}
//                             value={subcategory.category_id}
//                           >
//                             {subcategory.category_name}
//                           </option>
//                         ))}
//                       </select>

//                 </div>
//                 </div>
//               </div>
//               <div className="flex justify-center bg-[#FFF4DF] py-5 my-8">
//                 <button
//                   type="submit"
//                   className="lg:bg-[#FFAA00]  md:bg-[#FFAA00]   xs:bg-[#255BB3] rounded  text-[#fff] text-sm font-[700] py-3 px-[6em]"
//                 >
//                   この条件で検索する
//                 </button>
//               </div>
//             </form>

//             <form onSubmit={SecondFormSubmit}>
//               <div className="grid grid-cols-[112px,189px] items-center mb-8">
//                 <h3 className="text-[#808080] text-sm">都道府県</h3>

//                 <select
//                   id="dropdownHoverButton"
//                   data-dropdown-toggle="dropdownHover"
//                   data-dropdown-trigger="hover"
//                   className=" flex justify-between items-center border-[1px] border-[#DCDCDC] text-[#808080] p-2 rounded-[5px] cursor-pointer"
//                   value={selectedState}
//                   onChange={(e) => handleStatesChange(e.target.value)}
//                 >
//                   <option value="all">全て</option>
//                   {selectedStates.map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                   <svg
//                     className="w-2.5 h-2.5 ms-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m1 1 4 4 4-4"
//                     />
//                   </svg>
//                 </select>
//               </div>
//               <div className="grid grid-cols-[112px,189px] items-center mb-8">
//                 <h3  className="text-[#808080] text-sm">市区町村</h3>
//                 <div className="flex items-center gap-4">
//                   <input
//                     id="default-checkbox"
//                     type="checkbox"
//                     className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer "
//                     checked={
//                       selectedCities.length ===
//                       cities?.map((obj) => obj?.cities).flat().length
//                     }
//                     onChange={() => handleCheckboxChange("all")}
//                   />
//                   <h3 className="text-[#808080] text-sm">全て</h3>
//                 </div>
//               </div>
//               {cities &&
//                 cities.map((obj, index) => (
//                   <div key={index}>
//                     <div className="bg-[#F8FBFF] p-3 mb-4 ">
//                       <div className="xs:w-2/5 sm:w-[18%]  md:w-[20%] lg:w-[12%]">
//                         <label className="flex items-center justify-start gap-5 cursor-pointer">
//                         <span className="text-[#255BB3] font-[500] text-sm  ">
//                           {obj?.area}
//                         </span>
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer "
//                           checked={
//                             obj?.cities.length > 0 &&
//                             obj?.cities.every((city) =>
//                               selectedCities.includes(city)
//                             )
//                           }
//                           onChange={() =>
//                             handleCheckboxChange("area", obj?.area)
//                           }
//                         />
//                       </label>
//                       </div>

//                     </div>
//                     <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
//                       {obj?.cities &&
//                         obj?.cities.map((label, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center space-x-2"
//                           >
//                             <label
//                               htmlFor={`${label}-${index}`}
//                               className="cursor-pointer flex items-center"
//                             >
//                               <input
//                                 id={`${label}-${index}`}
//                                 type="checkbox"
//                                 value={selectedCities}
//                                 className="w-4 h-4 outline-none border-none border-[#DCDCDC] rounded cursor-pointer"
//                                 checked={selectedCities.includes(label)}
//                                 onChange={() => handleCheckboxChange(label)}
//                               />
//                               <span className="text-[#808080] text-sm ml-1">
//                                 {label}
//                               </span>
//                             </label>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 ))}

//               <div className="flex justify-center bg-[#FFF4DF] py-5 mb-20">
//                 <button
//                   type="submit"
//                   className="lg:bg-[#FFAA00]  md:bg-[#FFAA00]  xs:bg-[#255BB3] rounded   text-[#fff] text-sm font-[700] py-3 px-[6em]"
//                 >
//                   この条件で検索する
//                 </button>
//               </div>
//               <div className="flex justify-center mb-[10em]">
//                 <button
//                   onClick={() => navigate(-1)}
//                   type="button"
//                   className="text-[#fff] rounded bg-[#808080] text-sm font-[700] py-4 px-[9em]"
//                 >
//                   戻る
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DetailSearch;
