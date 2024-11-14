import { selectAdmin } from "@/state/slices/adminSlice";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/components/static/Spinner";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  getAllUsageFeeThunk,
  createUpperLimitRateThunk,
  createTaxRateThunk,
  getAllTaxRateThunk,
  getAllCategoriesThunk,
  getUpperlimitThunk,
  createCommerciaActThunk,
  getCommercialActThunk,
  getMailTemplatesThunk,
  makeDefaultUsageFeeThunk,
} from "@/state/thunks/adminThunks";
import AddUsageModal from "@/Admin/components/AddUsageModal";
import AddCategoryModal from "@/Admin/components/AddCategoryModal";
import AddSubCategory from "@/Admin/components/AddSubCategory";
import DeleteModal from "@/Admin/components/DeleteModal";
import EditCategory from "@/Admin/components/EditCategory";
import EditUsageModal from "@/Admin/components/EditUsageModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { MailType } from "@/types/types";
import { updateMailTemplate } from "@/api/admin";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/utils/StrictModeDroppable";
import axios from "axios";
import SubCategoryList from "@/Admin/components/SubCategoryList";

interface InputFormType {
  distributor: string;
  operationManager: string;
  postCode: string;
  location: string;
  telephone: string;
  fax: string;
  email: string;
  url: string;
  requiredFees: string;
  howToOrder: string;
  paymentMethod: string;
  dueDateForPayment: string;
  deliveryTime: string;
  aboutReturnExchange: string;
}

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const MasterManagement = () => {
  const {
    loading,
    usagefee,
    makeDefaultUsage,
    usageFeeCreated,
    usageFeeUpdated,
    usageFeeDeleted,
    parentCategoryCreated,
    subcategoryCreated,
    deletedCategory,
    updatedCategory,
    getAllCategories,
    taxRates,
    upperlimitRate,
    commercialAct,
    mailTemplate,
  } = useAppSelector(selectAdmin);
  const dispatch = useAppDispatch();
  const [upperLimit, setUpperLimitRate] = useState(upperlimitRate?.amount);
  const [taxRate, setTaxRate] = useState(taxRates?.tax);
  const [showModal, setShowModal] = useState(false);
  const [showUsageEditModal, setShowUsageEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [usage_names, setUsageName] = useState("");
  const [rates, setRate] = useState("");
  const [isChildCatBtn, setIsChildCatBtn] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState();
  const [id, setId] = useState();
  const [updateCatName, setUpdateCatName] = useState();
  const [isEditCatModal, setIsEditCatModal] = useState(false);
  const [deleteUsage, setDeleteUsage] = useState(false);
  const [mailTemplateArray, setMailTemplateArray] = useState<MailType[]>([]);
  const [template, setTemplate] = useState("registration");
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailHeader, setEmailHeader] = useState("");
  const [emailFooter, setEmailFooter] = useState("");
  const [emailDetail, setEmailDetail] = useState("");
  const [draggedItems, setDraggedItems] = useState([]);
  const [childDraggedItems, setChildDraggedItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log("taxRate", taxRate);
  console.log("upperLimit", upperLimit);

  //   handle upper limit rate
  const handleUpperlimitRate = (upperLimit) => {
    dispatch(createUpperLimitRateThunk({ upperLimit }));
  };

  const handleTaxRate = (taxRate) => {
    dispatch(createTaxRateThunk({ taxRate }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUsageFeeThunk({}));
      await dispatch(getAllCategoriesThunk({}));
      await dispatch(getCommercialActThunk({}));
      await dispatch(getAllTaxRateThunk({}));
      await dispatch(getUpperlimitThunk({}));
      await dispatch(getMailTemplatesThunk({}));
    };
    fetchData();
  }, [
    makeDefaultUsage,
    usageFeeCreated,
    usageFeeUpdated,
    usageFeeDeleted,
    parentCategoryCreated,
    subcategoryCreated,
    deletedCategory,
    updatedCategory,
    dispatch,
    refresh,
  ]);

  useEffect(() => {
    if (getAllCategories) setDraggedItems(getAllCategories?.data);
  }, [getAllCategories]);

  const [openCategoryId, setOpenCategoryId] = useState(null);

  const toggleDropdown = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  const { register, handleSubmit, setValue } = useForm<InputFormType>();

  const onSubmit: SubmitHandler<InputFormType> = (data) => {
    console.log(data);
    dispatch(createCommerciaActThunk({ actData: data }));
  };

  useEffect(() => {
    if (commercialAct?.data) {
      commercialAct.data.forEach((act) => {
        setValue("distributor", act.distributor);
        setValue("operationManager", act.operationManager);
        setValue("postCode", act.postCode);
        setValue("location", act.location);
        setValue("telephone", act.telephone);
        setValue("fax", act.fax);
        setValue("email", act.email);
        setValue("url", act.url);
        setValue("requiredFees", act.requiredFees);
        setValue("howToOrder", act.howToOrder);
        setValue("paymentMethod", act.paymentMethod);
        setValue("dueDateForPayment", act.dueDateForPayment);
        setValue("deliveryTime", act.deliveryTime);
        setValue("aboutReturnExchange", act.aboutReturnExchange);
      });
    }
  }, [commercialAct, setValue]);

  useEffect(() => {
    if (upperlimitRate && upperlimitRate.amount !== undefined) {
      setUpperLimitRate(upperlimitRate?.amount);
    }
  }, [upperlimitRate]);

  useEffect(() => {
    if (taxRates && taxRates.tax !== undefined) {
      setTaxRate(taxRates.tax);
    }
  }, [taxRates]);

  useEffect(() => {
    if (mailTemplate) {
      setMailTemplateArray(mailTemplate.data);
    }
  }, [mailTemplate]);

  useEffect(() => {
    const foundMailTemplate = mailTemplateArray.find(
      (mail) => mail.template === template
    );
    setEmailSubject(convertHtmlToText(foundMailTemplate?.subject || ""));
    setEmailHeader(convertHtmlToText(foundMailTemplate?.header || ""));
    setEmailFooter(convertHtmlToText(foundMailTemplate?.footer || ""));
    setEmailDetail(convertHtmlToText(foundMailTemplate?.detail || ""));
    template === "registration"
      ? setTagsArray(["CUSTOMER_NAME", "CUSTOMER_CHARGE", "VERIFICATION_LINK"])
      : template === "resetPassword"
      ? setTagsArray(["CUSTOMER_NAME", "CUSTOMER_CHARGE", "PASSWORD_LINK"])
      : template === "contact"
      ? setTagsArray([
          "DATE",
          "CUSTOMER_NAME",
          "CUSTOMER_COMPANY",
          "FILE_LINK",
          "CUSTOMER_EMAIL",
          "CONTACT_PHONE",
          "CONTACT_SUBJECT",
          "CONTACT_MESSAGE",
        ])
      : template === "message" &&
        setTagsArray([
          "SENDER_NAME",
          "PROCESS_NAME",
          "MESSAGE",
          "TRANSACTION_LINK",
        ]);
  }, [mailTemplateArray, template]);

  const insertTag = (tag: string) => {
    if (tag === "タグを埋めこむ") {
      return;
    }
    if (textareaRef.current) {
      const startPos = textareaRef.current.selectionStart;
      const endPos = textareaRef.current.selectionEnd;
      const textBefore = emailDetail.substring(0, startPos);
      const textAfter = emailDetail.substring(endPos, emailDetail.length);
      setEmailDetail(textBefore + tag + textAfter);

      setTimeout(() => {
        textareaRef.current.selectionStart = startPos + tag.length;
        textareaRef.current.selectionEnd = startPos + tag.length;
        textareaRef.current.focus();
      }, 0);
    }
  };

  const convertTextToHtml = (text) => {
    const trimmedText = text.replace(/\s+$/g, "");

    const specialTags = [
      "TRANSACTION_LINK",
      "PASSWORD_LINK",
      "PROCESS_NAME",
      "VERIFICATION_LINK",
      "FILE_LINK",
      "MESSAGE",
    ];
    const specialTagRegex = new RegExp(specialTags.join("|"), "g");

    const paragraphs = trimmedText.split(/\n\n+/).map((para) => {
      const lines = para.split("\n").map((line) => {
        const placeholders = {};
        let placeholderCount = 0;
        line = line.replace(specialTagRegex, (match) => {
          const placeholder = `__PLACEHOLDER_${placeholderCount}__`;
          placeholders[placeholder] = match;
          placeholderCount++;
          return placeholder;
        });

        const parts = line.split(":").map((part) => part.trim());

        if (
          parts.length > 1 &&
          Object.values(placeholders).includes(parts[1])
        ) {
          const beforeLink = parts[0];
          const linkText = parts[1];
          if (linkText === "MESSAGE") {
            return `<p>${beforeLink}:</p><p>${linkText}</p>`;
          }
          return `<p>${beforeLink}:</p><a href="${linkText}">${linkText}</a>`;
        }

        return line.replace(
          /__PLACEHOLDER_\d+__/g,
          (match) => placeholders[match]
        );
      });
      return `<p>${lines.join("<br>")}</p>`;
    });

    return paragraphs.join("<br>");
  };

  const convertHtmlToText = (html) => {
    let text = html.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/p>/gi, "\n").replace(/<p>/gi, "");
    text = text.replace(
      /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
      "$1"
    );
    text = text.trim();
    return text;
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processedSubject = escapeHtml(convertTextToHtml(emailSubject));
    const processedHeader = escapeHtml(convertTextToHtml(emailHeader));
    const processedFooter = escapeHtml(convertTextToHtml(emailFooter));
    const processedDetail = escapeHtml(convertTextToHtml(emailDetail));

    const data = {
      data: {
        template,
        subject: processedSubject,
        header: processedHeader,
        footer: processedFooter,
        detail: processedDetail,
      },
    };
    console.log("Sending data : ", data);
    await updateMailTemplate(data);
    setRefresh(!refresh);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    if (result.type === "categories") {
      const reorderedItems = Array.from(draggedItems);
      const [movedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, movedItem);

      const rankedItems = reorderedItems.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      });
      setDraggedItems(rankedItems);
      await axios.post(`${BASE_URL}/categories/category-sort-rank`, {
        rankedCategories: rankedItems,
      });
    } else {
      const reorderedItems = Array.from(childDraggedItems);
      const [movedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, movedItem);

      const rankedItems = reorderedItems.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      });
      setChildDraggedItems(rankedItems);
      await axios.post(`${BASE_URL}/categories/category-sort-rank`, {
        rankedCategories: rankedItems,
      });
    }
  };

  // console.log("usagefee", usagefee);
  console.log("draggedItems", draggedItems);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
            <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
              <h1 className="text-[#808080] font-[700] text-[24px] mb-[9px]">
                マスター管理
              </h1>
              {/* system usage fe setting */}
              <h1 className="text-[#808080] ">システム利用料設定</h1>
              {/*  */}
              <form className="mt-[9px] w-full border h-auto py-5 bg-[#F8F8F8]">
                <div className="flex flex-col justify-center items-center px-4 ">
                  <div className="flex justify-around items-center w-full ">
                    <span className="lg:text-[14px] xs:text-[12px] text-[#808080] ">
                      システム利用料
                    </span>
                    <span className="lg:text-[14px] xs:text-[12px] text-[#808080] ">
                      システム利用料(率)
                    </span>
                    <span className="lg:text-[14px] xs:text-[12px] text-[#808080] ">
                      削除
                    </span>
                  </div>
                  <hr className="text-center w-[90%] h-[2px] my-2  border-0  bg-[#808080]" />
                </div>
                {/* tables and buttons */}

                <div className="flex justify-around flex-col items-center w-full   gap-5">
                  <div className="flex justify-around flex-col items-center w-full   gap-5 ">
                    {usagefee && usagefee?.data?.length > 0 ? (
                      usagefee?.data?.map((fee, index) => (
                        <div
                          key={index}
                          className="flex  justify-around  w-full  lg:gap-5 xs:gap-1"
                        >
                          <input
                            type="text"
                            className="border lg:w-[263px] md:w-[200px] xs:w-[80px] h-[33px] border-[#E0E0E0]  bg-[#fff] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                            value={fee.usage_name}
                            disabled
                          />
                          <div>
                            <input
                              type="text"
                              className="border lg:w-[135px] xs:w-[50px] h-[33px] border-[#E0E0E0] bg-[#fff] px-4 text-right lg:text-[14px] xs:text-[12px] text-[#808080]"
                              value={fee.rate}
                              disabled
                            />
                            <span className="lg:ml-2 xs:ml-1 lg:text-[14px] xs:text-[10px] text-[#808080]">
                              %
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center lg:gap-5 xs:gap-1">
                              <div className="flex flex-col lg:gap-5 xs:gap-1 border">
                                <span
                                  className="lg:w-[80px] xs:w-[50px] h-[30px] bg-[#808080] lg:text-[14px] xs:text-[12px] text-white text-center py-1 cursor-pointer "
                                  onClick={() => {
                                    setShowUsageEditModal(true);
                                    setUsageName(fee.usage_name);
                                    setRate(fee.rate);
                                    setId(fee._id);
                                  }}
                                >
                                  編集
                                </span>
                              </div>

                              <div className="flex flex-col gap-5 border">
                                <span
                                  className="lg:w-[80px] xs:w-[50px] h-[30px] bg-[#808080] lg:text-[14px] xs:text-[12px] text-white text-center py-1 cursor-pointer"
                                  onClick={() => {
                                    setIsDeleteModal(true);
                                    setDeleteUsage(true);
                                    setId(fee._id);
                                    console.log(fee?._id);
                                  }}
                                >
                                  削除
                                </span>
                              </div>

                              <div className="flex flex-col gap-5 border">
                                {fee && fee?.default ? (
                                  <span
                                    onClick={() => {
                                      dispatch(
                                        makeDefaultUsageFeeThunk({
                                          id: fee._id,
                                          isDefault: false,
                                        })
                                      );
                                    }}
                                    className="lg:w-[150px] xs:w-[100px] h-[30px] bg-[#255BB3] lg:text-[14px] xs:text-[12px] text-white text-center py-1 cursor-pointer"
                                  >
                                    デフォルト
                                  </span>
                                ) : (
                                  <span
                                    className={`lg:w-[150px] xs:w-[100px] h-[30px] ${
                                      fee?.default
                                        ? "bg-[#255BB3]"
                                        : "bg-[#808080]"
                                    } lg:text-[14px] xs:text-[12px] text-white text-center py-1 cursor-pointer`}
                                    onClick={() => {
                                      dispatch(
                                        makeDefaultUsageFeeThunk({
                                          id: fee._id,
                                          isDefault: true,
                                        })
                                      );
                                    }}
                                  >
                                    作る デフォルト
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No usage fee data available.</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-center justify-center gap-6 mt-[28px]">
                  <span
                    className=" lg:w-[132px] xs:w-[80px]  h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white text-center py-1 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    追加
                  </span>
                </div>
              </form>

              {/* Tax rate setting */}
              <h1 className="mt-[17px] lg:text-[16px] xs:text-[14px]  font-bold text-[#808080]">
                税率設定
              </h1>
              <div className="w-full bg-[#F8F8F8] ">
                <div className="flex justify-around items-center py-6 lg:w-[80%] xs:w-[100%] ">
                  <span className="lg:text-[14px] xs:text-[12px]">
                    現在の税率
                  </span>
                  <div>
                    <input
                      type="text"
                      className=" border lg:w-[135px]  xs:w-[90px]  h-[33px] border-[#E0E0E0] px-4 text-right lg:text-[14px] xs:text-[12px] text-[#808080]"
                      placeholder="10"
                      value={taxRate}
                      onChange={(e) => {
                        setTaxRate(e.target.value);
                      }}
                    />
                    <span className="ml-2 text-[#808080] lg:text-[14px] xs:text-[10px]">
                      %
                    </span>
                  </div>
                  <button
                    className="lg:w-[132px] xs:w-[80px]  h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white "
                    onClick={() => {
                      console.log(taxRate);
                      handleTaxRate(taxRate);
                    }}
                  >
                    登録
                  </button>
                </div>
              </div>

              {/* Transaction upper limit amount */}
              <h1 className="mt-[17px] lg:text-[16px] xs:text-[14px]  font-bold text-[#808080]">
                取引上限金額
              </h1>
              <div className="w-full bg-[#F8F8F8] ">
                <div className="flex justify-around items-center py-6 lg:w-[80%] xs:w-[100%] ">
                  <span className="lg:text-[14px] xs:text-[12px]">
                    取引上限金額
                  </span>
                  <div>
                    <input
                      type="text"
                      className=" border lg:w-[135px]  xs:w-[90px]  h-[33px] border-[#E0E0E0] px-4 text-right lg:text-[14px] xs:text-[12px] text-[#808080]"
                      placeholder="1,000,000"
                      value={upperLimit}
                      onChange={(e) => {
                        setUpperLimitRate(e.target.value);
                      }}
                    />
                    <span className="ml-2 lg:text-[14px] xs:text-[10px] text-[#808080] ">
                      Yen
                    </span>
                  </div>
                  <button
                    className="lg:w-[132px] xs:w-[80px]  h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white"
                    onClick={() => {
                      handleUpperlimitRate(upperLimit);
                    }}
                  >
                    登録
                  </button>
                </div>
              </div>
              {/* Category settings */}
              <div className="flex justify-between items-center w-[80%] py-2 ">
                <h1 className=" lg:text-[16px] xs:text-[14px]  font-bold text-[#808080]">
                  カテゴリ設定
                </h1>

                {/* design */}

                {/* Quotation */}

                {/* material */}

                {/*Casting  */}

                <div className="flex items-center ">
                  <button
                    className="lg:w-[132px] xs:w-[80px] h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white"
                    onClick={() => {
                      setShowCategoryModal(true);
                    }}
                  >
                    カテゴリ追加
                  </button>
                </div>
              </div>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <StrictModeDroppable
                  droppableId="droppable-list"
                  type="categories"
                >
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ listStyleType: "none", padding: 0 }}
                    >
                      {draggedItems.length > 0 &&
                        draggedItems.map((category, index) => (
                          <Draggable
                            draggableId={category?.category_id?.toString()}
                            index={index}
                            key={category?.category_id?.toString()}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundColor: snapshot.isDragging
                                    ? "#f0f0f0"
                                    : "#ffffff",
                                  boxShadow: snapshot.isDragging
                                    ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                                    : "none",
                                }}
                                className="lg:w-[80%] xs:w-[100%] py-2 border-t border-b"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <svg
                                      version="1.1"
                                      id="Layer_1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 512 512"
                                      fill="#808080"
                                      style={{
                                        background: "new 0 0 512 512",
                                        width: "15px",
                                        height: "15px",
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <g>
                                        <path d="M96,192h128v128H96V192z M96,0h128v128H96V0z M96,384h128v128H96V384z M288,192h128v128H288V192z M288,0h128v128H288V0z M288,384h128v128H288V384z" />
                                      </g>
                                    </svg>
                                    <button
                                      onClick={() =>
                                        toggleDropdown(category?.category_id)
                                      }
                                      className="text-[#808080] mr-5 ml-3"
                                    >
                                      {openCategoryId === category?.category_id
                                        ? String.fromCharCode(9660)
                                        : String.fromCharCode(9654)}
                                    </button>
                                    <span className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                                      {category.category_name}
                                    </span>
                                  </div>

                                  <div className="flex gap-6">
                                    <button
                                      className="bg-[#808080] py-1 px-6 text-white lg:text-[14px] xs:text-[12px]"
                                      onClick={() => {
                                        setIsEditCatModal(true);
                                        setId(category?.category_id);
                                        setUpdateCatName(
                                          category?.category_name
                                        );
                                      }}
                                    >
                                      編集
                                    </button>
                                    <button
                                      className="bg-[#D9D9D9] py-1 px-6 text-[#808080] lg:text-[14px] xs:text-[12px]"
                                      onClick={() => {
                                        setIsDeleteModal(true);
                                        setId(category?.category_id);
                                      }}
                                    >
                                      削除
                                    </button>
                                  </div>
                                </div>

                                {openCategoryId === category?.category_id && (
                                  <>
                                    <SubCategoryList
                                      draggedItems={childDraggedItems}
                                      setDraggedItems={setChildDraggedItems}
                                      category={category}
                                      setIsEditCatModal={setIsEditCatModal}
                                      setId={setId}
                                      setUpdateCatName={setUpdateCatName}
                                      setIsDeleteModal={setIsDeleteModal}
                                      setDeleteUsage={setDeleteUsage}
                                    />
                                    <div className="flex justify-center items-center w-[80%] py-2">
                                      <div className="flex items-center w-[80%]">
                                        <button
                                          className="lg:w-[132px] xs:w-[80px] h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white"
                                          onClick={() => {
                                            setIsChildCatBtn(true);
                                            setParentCategoryId(
                                              category?.category_id
                                            );
                                          }}
                                        >
                                          カテゴリ追加
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </StrictModeDroppable>
              </DragDropContext>

              {/* 3D printing */}

              {/* Add category btn end*/}

              {/* Email settings *Automatic email text */}

              <h1 className="text-[#808080] font-[700] text-[24px] mt-[72px]">
                メール設定 *自動メール文面{" "}
              </h1>
              <form
                onSubmit={handleEmailSubmit}
                className="mt-[26px] lg:w-[80%] xs:w-[100%]"
              >
                <div className="flex  justify-between flex-col gap-6">
                  <div className="flex  justify-between ">
                    <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                      テンプレート
                    </label>
                    <select
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      id="first_name"
                      className="border w-[85%] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px]"
                    >
                      {mailTemplateArray.map((mail) => (
                        <option
                          key={mail._id}
                          className="text-tertiary lg:text-[14px] xs:text-[12px]"
                          value={mail.template}
                        >
                          {mail.template}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex  justify-between ">
                    <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                      タイトル
                    </label>
                    <input
                      type="text"
                      value={emailSubject || ""}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="border w-[85%]  h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px]"
                      placeholder="ASNARO:本会員登録が完了しました。"
                      name="subject"
                    />
                  </div>
                  <div className="flex  justify-between lg:w-[100%] xs:w-[100%]">
                    <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                      メッセージ
                    </label>
                    <div className="flex flex-col lg:w-[85%] xs:w-[100%]  gap-3 ">
                      <select
                        value={tag}
                        onChange={(e) => {
                          setTag(e.target.value);
                          insertTag(e.target.value);
                        }}
                        className="bg-[#808080] py-1 px-3 text-white lg:text-[14px] xs:text-[12px] w-[140px]  text-center "
                      >
                        <option className="bg-white text-tertiary lg:text-[14px] xs:text-[12px]">
                          タグを埋めこむ
                        </option>
                        {tagsArray.map((tag) => (
                          <option
                            key={tag}
                            value={tag}
                            className="text-tertiary bg-white lg:text-[14px] xs:text-[12px]"
                          >
                            {tag}
                          </option>
                        ))}
                      </select>
                      <textarea
                        ref={textareaRef}
                        value={emailDetail || ""}
                        onChange={(e) => setEmailDetail(e.target.value)}
                        className="border w-[100%]  h-[234px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none"
                        placeholder="@[CONTRACTOR_NAME]　様
                      製造業受発注サイトASNAROでございます。
                      この度は会員登録依頼をいただきましてまことに有り難うございます。
                      本会員登録が完了いたしました。
                      今後ともどうぞASNAROをよろしくお願い申し上げます。
                      工程登録など工程の受注業務を行う場合は、別途運営よりパートナー登録が必要になります。
                      ご希望の場合はお問い合わせやメッセージをご利用いただきご連絡ください。
                      @[CONTACT_MAIL]"
                      />
                    </div>
                  </div>
                  <div className="flex  justify-between ">
                    <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                      フッター
                    </label>
                    <textarea
                      value={emailFooter || ""}
                      onChange={(e) => setEmailFooter(e.target.value)}
                      className="border w-[85%]  h-[270px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none"
                      placeholder="
                ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                　※本メールは、ASNAROより会員登録を希望された方に
                お送りしています。
                　もしお心当たりが無い場合は、
                またその旨info_asnaro@asnaro.co.jpまで
                     ご連絡いただければ幸いです。
                ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                ※本メールは自動配信メールです。
                　等幅フォント(MSゴシック12ポイント、Osaka-等幅など)で最適にご覧になれます。
                "
                    />
                  </div>
                  <div className="flex justify-center p-2">
                    <button
                      type="submit"
                      className="lg:w-[132px] xs:w-[80px]  h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white mt-6 p-1"
                    >
                      この内容で登録する
                    </button>
                  </div>
                </div>
              </form>

              {/* Description based on Specified Commercial Transactions Law */}

              <h1 className="text-[#808080] font-[700] text-[24px] mt-[72px]">
                特定商取引法に基づく表記
              </h1>
              <form
                className="mt-[26px] lg:w-[80%] xs:w-[100%] "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex  justify-between flex-col gap-6">
                  <>
                    {" "}
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        販売業者
                      </label>
                      <input
                        type="text"
                        className="border w-[85%] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="株式会社丸菱製作所"
                        {...register("distributor")}
                        onChange={(e) => e.target.value}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        運営責任者
                      </label>
                      <input
                        type="text"
                        className="border w-[85%]  h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px ] text-[#808080]"
                        placeholder="戸松精三"
                        {...register("operationManager")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        郵便番号
                      </label>
                      <input
                        type="text"
                        className="border w-[85%] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="486-0807"
                        {...register("postCode")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        所在地
                      </label>
                      <input
                        type="text"
                        className="border w-[85%]  h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="愛知県春日井市大手町字川内1045番地"
                        {...register("location")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        TEL
                      </label>
                      <input
                        type="text"
                        className="border w-[85%] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="0568-31-8414"
                        {...register("telephone")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        FAX
                      </label>
                      <input
                        type="text"
                        className="border w-[85%]  h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="0568-31-8489"
                        {...register("fax")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        E-mail
                      </label>
                      <input
                        type="text"
                        className="border w-[85%] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="info_asnaro@asnaro.co.jp"
                        {...register("email")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        URL
                      </label>
                      <input
                        type="text"
                        className="border w-[85%]  h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] text-[#808080]"
                        placeholder="http://www.marubishi-co-ltd.com/index.html"
                        {...register("url")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        商品代金以外の必要料金
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="受注した場合は受注金額に応じたシステム利用料
                                 発注時に銀行振込で支払う場合は振込手数料 運搬費用"
                        {...register("requiredFees")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        注文方法
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="当サイトからのご注文のみ承っております"
                        {...register("howToOrder")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        支払方法
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="銀行振込またはクレジットカード"
                        {...register("paymentMethod")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        支払期限
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="見積もり合意後１週間以内"
                        {...register("dueDateForPayment")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        引き渡し 時期
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="発注書に記載された納期に準ずる"
                        {...register("deliveryTime")}
                      />
                    </div>
                    <div className="flex  justify-between ">
                      <label className="text-[#808080] bg-[#F8F8F8] lg:text-[14px] xs:text-[12px] p-2 w-[100px] text-center">
                        返品・交換 について
                      </label>
                      <textarea
                        className="border w-[85%]  h-[84px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px] resize-none text-[#808080]"
                        placeholder="図面品質に合わないものについては差戻し、再納品をしていただきます。
                                 品質の合格が不可能な場合、キャンセルおよび運営から返金となります。"
                        {...register("aboutReturnExchange")}
                      />
                    </div>
                  </>

                  <div className="flex justify-center p-2">
                    <button
                      type="submit"
                      className="lg:w-[200px] xs:w-[150px]  h-[30px] bg-[#FFAA00] lg:text-[14px] xs:text-[12px] text-white mt-6"
                    >
                      この内容で登録する
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {showModal ? (
            <AddUsageModal showModal={showModal} setShowModal={setShowModal} />
          ) : (
            ""
          )}

          {showUsageEditModal ? (
            <EditUsageModal
              showUsageEditModal={showUsageEditModal}
              setShowUsageEditModal={setShowUsageEditModal}
              id={id}
              usage_names={usage_names}
              rates={rates}
            />
          ) : (
            ""
          )}

          {showCategoryModal ? (
            <AddCategoryModal
              showCategoryModal={showCategoryModal}
              setShowCategoryModal={setShowCategoryModal}
            />
          ) : (
            ""
          )}

          {isChildCatBtn ? (
            <AddSubCategory
              isChildCatBtn={isChildCatBtn}
              setIsChildCatBtn={setIsChildCatBtn}
              parentCategoryId={parentCategoryId}
            />
          ) : (
            ""
          )}

          {isDeleteModal ? (
            <DeleteModal
              id={id}
              isDeleteModal={isDeleteModal}
              setDeleteUsage={setDeleteUsage}
              setIsDeleteModal={setIsDeleteModal}
              deleteUsage={deleteUsage}
            />
          ) : (
            ""
          )}

          {isEditCatModal ? (
            <EditCategory
              id={id}
              isEditCatModal={isEditCatModal}
              setIsEditCatModal={setIsEditCatModal}
              updateCatName={updateCatName}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
export default MasterManagement;
