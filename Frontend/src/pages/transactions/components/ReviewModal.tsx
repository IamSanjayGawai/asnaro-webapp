import { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  ShowReviewModalThunk,
  selectTransaction,
} from "@/state/slices/transactionSlice";
import {
  fetchTransactionThunk,
  createRefundRatingToSellerThunk,
  createRefundRatingToBuyerThunk,
} from "@/state/thunks/transactionThunks";
import Spinner from "@/components/static/Spinner";
import { socket } from "@/state/store";

export default function HalfRating({
  reviewModalShow,
  transaction,
  buyerName,
}) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { ratingLoading } = useAppSelector(selectTransaction);
  const [ratingProcess, setRatingProcess] = useState(0);
  const [ratingBuyer, setRatingBuyer] = useState(0);
  const [ratingSeller, setRatingSeller] = useState(0);
  const [buyerComment, setBuyerComment] = useState("");
  const [buyerCommentToProcess, setBuyerCommentToProcess] = useState("");
  const [sellerComment, setSellerComment] = useState("");
  const [, setBuyerRatingComments] = useState({});
  const [_, setSellerRatingComments] = useState({});
console.log(buyerCommentToProcess, "buyerCommentToProcess")
  const handleRatingChangeProcess = (event, newValue) => {
    console.log(event);
    setRatingProcess(newValue);
  };

  const handleRatingChangeBuyer = (event, newValue) => {
    console.log(event);
    setRatingBuyer(newValue);
  };

  const handleRatingChangeSeller = (event, newValue) => {
    console.log(event);
    setRatingSeller(newValue);
  };

  const handelBuyerCommentToProcessChange = (e) => {
    setBuyerCommentToProcess(e.target.value);
   
};

  const handelBuyerCommentChange = (e) => {
    setBuyerComment(e.target.value);
    setBuyerRatingComments({
      ratingToProcess: ratingProcess,
      ratingToSeller: ratingBuyer,
      commentToSeller: buyerComment,
      commentToProcess: buyerCommentToProcess,
      
    });
  };



  const handelSellerCommentChange = (e) => {
    setSellerComment(e.target.value);
    setSellerRatingComments({
      ratingToBuyer: ratingSeller,
      commentToBuyer: sellerComment,
    });
  };

  console.log(id, ratingProcess, ratingBuyer, buyerComment, buyerCommentToProcess, "id, ratingProcess, ratingBuyer, buyerComment, buyerCommentToProcess");
  const handleSubmit = async () => {
   
    await dispatch(
      createRefundRatingToSellerThunk({
        transactionId: id,
        seller_id: transaction?.transaction?.seller_id?._id,
        process_id: transaction?.transaction?.process_id?._id,
        ratingToProcess: ratingProcess,
        ratingToSeller: ratingBuyer,
        commentToSeller: buyerComment,
        commentToProcess: buyerCommentToProcess,

      })
    
    );

    socket.emit("buyerRating", { id }, async () => {
      console.log("emit");
      dispatch(ShowReviewModalThunk(false));
      await dispatch(fetchTransactionThunk(id));
    });
  };

  const handleSellerRatingSubmit = async () => {
    await dispatch(
      createRefundRatingToBuyerThunk({
        transactionId: id,
        customer_id: transaction?.transaction?.customer_id?._id,
        ratingToBuyer: ratingSeller,
        commentToBuyer: sellerComment,
      })
    );
    socket.emit("sellerRating", { id }, async () => {
      console.log("emit");
      dispatch(ShowReviewModalThunk(false));
      await dispatch(fetchTransactionThunk(id));
    });
  };

  return (
    reviewModalShow &&
    (buyerName ? (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl border">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-4 rounded">
              <button
                onClick={() => dispatch(ShowReviewModalThunk(false))}
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <RxCross2 />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/*body*/}
              <span className="text-center mt-1 lg:text-[24px] xs:text-[18px] text-[#255BB3] font-bold">
                評価レビュー記入フォーム
              </span>
              <div className="p-4 lg:w-[600px] xs:w-[400px] flex flex-col justify-center items-center  ">
                <Stack spacing={1} className="flex lg:px-20 xs:px-10 py-4 ">
                  <span className="mb-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    見直してみましょう {transaction?.transaction?.process_name}{" "}
                    の加工機です.
                  </span>
                  <div className="flex flex-col mt-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    評価点数
                    <Rating
                      name="process-rating"
                      value={ratingProcess}
                      precision={0.5}
                      size="large"
                      onChange={handleRatingChangeProcess}
                      className="mb-1 mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm lg:text-[18px] xs:text-[14px] text-[#808080]  ">
                      コメント
                    </label>
                    <textarea
                      value={buyerCommentToProcess}
                      onChange={handelBuyerCommentToProcessChange}
                      className="border border-gray-300 rounded p-2 w-full h-[50px]   resize-none "
                    ></textarea>
                  </div>
                  <span className="mb-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    株式 {transaction?.seller_name} <br />{" "}
                    様に対する評価レビューをしましょう
                  </span>
                  <div className="flex flex-col mt-5 lg:text-[18px] xs:text-[14px] text-[#808080]" >
                    評価点数
                    <Rating
                      name="buyer-rating"
                      value={ratingBuyer}
                      precision={0.5}
                      size="large"
                      onChange={handleRatingChangeBuyer}
                      className="mb-1 mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm lg:text-[18px] xs:text-[14px] text-[#808080]  ">
                      コメント
                    </label>
                    <textarea
                      value={buyerComment}
                      onChange={handelBuyerCommentChange}
                      className="border border-gray-300 rounded p-2 w-full h-[100px] mt-2  resize-none "
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#FFAA00] text-white  py-2 px-4 mt-5"
                  >
                    {ratingLoading ? (
                      <Spinner className="h-full" />
                    ) : (
                      "評価する"
                    )}
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl border">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-4 rounded">
              <button
                onClick={() => dispatch(ShowReviewModalThunk(false))}
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <RxCross2 />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/*body*/}
              <span className="text-center mt-1 lg:text-[24px] xs:text-[14px] text-[#255BB3] font-bold">
                評価レビュー記入フォーム
              </span>
              <div className="p-4 lg:w-[600px] xs:w-[400px] flex flex-col justify-center items-center  ">
                <Stack spacing={1} className="flex lg:px-20 xs:px-10 py-4 ">
                  <span className="mb-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    見直してみましょう {transaction?.transaction?.process_name}{" "}
                    の加工機です.
                  </span>
                  <span className="mb-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    株式 {transaction?.customer_name} <br />{" "}
                    評価レビューをしましょう
                  </span>
                  <div className="flex flex-col mt-5 lg:text-[18px] xs:text-[14px] text-[#808080]">
                    評価点数
                    <Rating
                      name="seller-rating"
                      value={ratingSeller}
                      precision={0.5}
                      size="large"
                      onChange={handleRatingChangeSeller}
                      className="mb-3 mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm lg:text-[18px] xs:text-[14px] text-[#808080]  ">
                      コメント
                    </label>
                    <textarea
                      value={sellerComment}
                      onChange={handelSellerCommentChange}
                      className="border border-gray-300 rounded p-2 w-full h-[100px] mt-2  resize-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSellerRatingSubmit}
                    className="bg-[#FFAA00] text-white  py-2 px-4 mt-5"
                  >
                    {ratingLoading ? (
                      <Spinner className="h-full" />
                    ) : (
                      "評価する"
                    )}
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
