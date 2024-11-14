import { useEffect } from "react";
import { useAppSelector } from "@/state/hooks";
import { selectAdmin } from "@/state/slices/adminSlice";
import {  Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/utils/StrictModeDroppable";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export default function SubCategoryList({
  draggedItems,
  setDraggedItems,
  category,
  setIsEditCatModal,
  setId,
  setUpdateCatName,
  setIsDeleteModal,
  setDeleteUsage,
}) {
  const { getAllCategories } = useAppSelector(selectAdmin);

  useEffect(() => {
    if (getAllCategories) setDraggedItems(category?.child_Categories);
  }, [getAllCategories]);


  return (
    <StrictModeDroppable droppableId="droppable-list-1" type="subcategories">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ listStyleType: "none", padding: 0 }}
        >
          <div className="lg:w-[80%] xs:w-[100%] flex justify-end">
            <div className="w-[95%] flex flex-col">
              {draggedItems.length > 0 &&
                draggedItems.map((subcategory, index) => (
                  <Draggable
                    draggableId={subcategory?.category_id.toString()}
                    index={index}
                    key={subcategory?.category_id.toString()}
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
                        key={subcategory.category_id}
                        className="flex justify-between items-center w-full py-2 border-t border-b"
                      >
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
                              marginRight: "20px",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <path d="M96,192h128v128H96V192z M96,0h128v128H96V0z M96,384h128v128H96V384z M288,192h128v128H288V192z M288,0h128v128H288V0z M288,384h128v128H288V384z" />
                            </g>
                          </svg>
                          <span className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                            {subcategory.category_name}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <button
                            className="bg-[#808080] py-1 px-6 text-white lg:text-[14px] xs:text-[12px]"
                            onClick={() => {
                              setIsEditCatModal(true);
                              setId(subcategory?.category_id);
                              setUpdateCatName(subcategory?.category_name);
                            }}
                          >
                            編集
                          </button>
                          <button
                            className="bg-[#D9D9D9] py-1 px-6 text-[#808080] lg:text-[14px] xs:text-[12px]"
                            onClick={() => {
                              setIsDeleteModal(true);
                              setDeleteUsage(false);
                              setId(subcategory?.category_id);
                            }}
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          </div>
          {provided.placeholder}
        </ul>
      )}
    </StrictModeDroppable>
  );
}
