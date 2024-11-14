import Spinner from "@/components/static/Spinner";

const RefundStepperMessage = ({
  admin,
  initiateRefund,
  buyername,
  sellername,
  handleCancelAgree,
  netAgreedToCancel,
  agreedToCancel,
  handleRequestRefund,
  transactionRefundStatus,
  handleRefundTermsAgree,
  refundTransferred,
  handleReviewModalShow,
  ratingByBuyer,
  ratingBySeller,
  handleRefundCancel,
  invoiceLoading,
  transactionCancelledStatus,
  netRefundRequested,
  netRefundTermsAgreed,
  refundCancelLoading,
  cancelAgreeLoading,
  requestRefundLoading,
}) => {
  return (
    <>
      {initiateRefund?.generatedBy === "buyer" ? (
        <>
          {buyername &&
          initiateRefund?.IsTrue &&
          !netAgreedToCancel &&
          !netRefundRequested &&
          !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2 ">
                          出品者さまに取引のキャンセルを依頼しました。
                          <br />
                          出品者さまがキャンセルに合意するまでお待ちください。
                        </span>
                        <div className="w-[40%] flex justify-end ">
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5  ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            !netRefundRequested &&
            !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          返金内容を入力し、出品者さまへ返金依頼を申請してください。
                          キャンセルを取り消す場合は、「キャンセルを取り消す」ボタンを押してください。
                        </span>
                        <div className="w-[40%] lg:justify-end    xs:items-end gap-2 flex lg:flex-row xs:flex-col">
                          <span
                            onClick={!admin && handleRequestRefund}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              requestRefundLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {requestRefundLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金を依頼する"
                            )}
                          </span>
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-tertiary h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] lg:mt-5 ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            netRefundRequested &&
            !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまへ返金内容を提示しました。
                          <br />
                          返金内容を変更する場合は、条件を修正し「返金を再依頼する」ボタンを押してください。
                        </span>
                        <div className="w-[40%] flex lg:justify-end gap-2 xs:items-end lg:flex-row xs:flex-col">
                          <span
                            onClick={!admin && handleRequestRefund}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              requestRefundLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {requestRefundLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金を再依頼する"
                            )}
                          </span>
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-tertiary h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            netRefundRequested &&
            netRefundTermsAgreed &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまが返金内容に合意しました。後日ASNAROより返金金額をお振込みいたします。
                          <br />
                          最後に出品者さまの評価をお願いします
                        </span>
                        <div className="w-[40%] flex justify-end gap-2">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            agreedToCancel &&
            refundTransferred &&
            ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          評価が完了しました。
                          <br />
                          この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            !netAgreedToCancel &&
            !netRefundRequested &&
            !transactionCancelledStatus ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          発注者さまが取引のキャンセルを依頼しました。
                          <br />
                          内容を確認し、問題なければキャンセルに合意するボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleCancelAgree}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              cancelAgreeLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {cancelAgreeLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルに合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            !netRefundRequested &&
            !netRefundTermsAgreed &&
            !transactionCancelledStatus ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまからの返金内容の提案をお待ちください。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netRefundRequested &&
            !netRefundTermsAgreed &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまが返金内容を提示しました。
                          <br />
                          内容を確認し、問題なければ返金内容に合意するボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleRefundTermsAgree}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              invoiceLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {invoiceLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金内容に合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netRefundTermsAgreed &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[180px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[70%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          取引をキャンセルしました。後日ASNAROより手数料を差し引いた金額をお振込みいたします。
                          <br />
                          最後に依頼者さまの評価をお願いします。
                        </span>
                        <div className="w-[30%] flex justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername && initiateRefund?.IsTrue && ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          評価が完了しました。
                          <br />
                          この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            !transactionRefundStatus &&
            transactionCancelledStatus &&
            refundTransferred &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[160px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          取引をキャンセルし、返金請求書を発行しました。後日ASNAROより手数料を差し引いた金額をお振込みいたし
                          <br />
                          ます。最後に依頼者さまの評価をお願いします
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[150px] xs:w-[90px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : (
            sellername &&
            initiateRefund?.IsTrue &&
            !transactionRefundStatus &&
            transactionCancelledStatus &&
            refundTransferred &&
            ratingBySeller && (
              <div className="flex justify-start mb-[20px] ">
                <div className="flex justify-center w-full ">
                  <span
                    className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 57% 20%, 56% 0, 55% 20%, 1% 20%)",
                    }}
                  >
                    <span
                      className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                      style={{
                        clipPath:
                          "polygon(1% 100%, 99% 100%, 99% 20%, 57% 20%, 56% 0, 55% 20%, 1% 20%)",
                      }}
                    >
                      <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            評価が完了しました。
                            <br />
                            この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                          </span>
                        </>
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <>
          {sellername &&
          initiateRefund?.IsTrue &&
          !netAgreedToCancel &&
          !netRefundRequested &&
          !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまに取引のキャンセルを依頼しました。
                          <br />
                          依頼者さまがキャンセルに合意するまでお待ちください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5  ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            !netRefundRequested &&
            !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまからの返金内容の提案をお待ちください。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            netRefundRequested &&
            !netRefundTermsAgreed ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまが返金内容を提示しました。
                          <br />
                          内容を確認し、問題なければ返金内容に合意するボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleRefundTermsAgree}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              invoiceLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {invoiceLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金内容に合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            netRefundRequested &&
            netRefundTermsAgreed &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[180px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          取引をキャンセルしました。後日ASNAROより手数料を差し引いた金額をお振込みいたします。
                          <br />
                          最後に依頼者さまの評価をお願いします。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            initiateRefund?.IsTrue &&
            agreedToCancel &&
            refundTransferred &&
            ratingBySeller ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          評価が完了しました。
                          <br />
                          この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            !netAgreedToCancel &&
            !netRefundRequested &&
            !transactionCancelledStatus ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 8% 20%, 7% 0, 6% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまが取引のキャンセルを依頼しました。
                          <br />
                          内容を確認し、問題なければキャンセルに合意するボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleCancelAgree}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[150px] xs:w-[90px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              cancelAgreeLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {cancelAgreeLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルに合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netAgreedToCancel &&
            !netRefundRequested &&
            !netRefundTermsAgreed &&
            !transactionCancelledStatus ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          返金内容を入力し、出品者さまへ返金依頼を申請してください。
                          <br />
                          キャンセルを取り消す場合は、「キャンセルを取り消す」ボタンを押してください。
                        </span>
                        <div className="w-[40%] lg:justify-end  xs:items-end gap-2 flex lg:flex-row xs:flex-col">
                          <span
                            onClick={!admin && handleRequestRefund}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              requestRefundLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {requestRefundLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金を依頼する"
                            )}
                          </span>
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-tertiary h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを キャンセルを 取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netRefundRequested &&
            !netRefundTermsAgreed &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 24% 20%, 23% 0, 22% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまへ返金内容を提示しました。
                          <br />
                          返金内容を変更する場合は、条件を修正し「返金を再依頼する」ボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end gap-2">
                          <span
                            onClick={!admin && handleRequestRefund}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[150px] xs:w-[90px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              requestRefundLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {requestRefundLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "返金を再依頼する"
                            )}
                          </span>
                          <span
                            onClick={!admin && handleRefundCancel}
                            className={`bg-tertiary h-[20px] lg:w-[150px] xs:w-[90px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              refundCancelLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {refundCancelLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "キャンセルを キャンセルを 取り消す"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            netRefundTermsAgreed &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[180px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 0, 40% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          取引をキャンセルしました。後日ASNAROより手数料を差し引いた金額をお振込みいたします。
                          <br />
                          最後に依頼者さまの評価をお願いします。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername && initiateRefund?.IsTrue && ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 59% 20%, 58% 0, 57% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          評価が完了しました。
                          <br />
                          この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            initiateRefund?.IsTrue &&
            !transactionRefundStatus &&
            transactionCancelledStatus &&
            refundTransferred &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px] ">
              <div className="flex justify-center w-full ">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 40% 20%, 39% 0, 38% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          取引をキャンセルし、返金請求書を発行しました。後日ASNAROより手数料を差し引いた金額をお振込みいたし
                          <br />
                          ます。最後に依頼者さまの評価をお願いします
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[150px] xs:w-[90px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            評価を記入する
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : (
            buyername &&
            initiateRefund?.IsTrue &&
            !transactionRefundStatus &&
            transactionCancelledStatus &&
            refundTransferred &&
            ratingByBuyer && (
              <div className="flex justify-start mb-[20px] ">
                <div className="flex justify-center w-full ">
                  <span
                    className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 57% 20%, 56% 0, 55% 20%, 1% 20%)",
                    }}
                  >
                    <span
                      className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                      style={{
                        clipPath:
                          "polygon(1% 100%, 99% 100%, 99% 20%, 57% 20%, 56% 0, 55% 20%, 1% 20%)",
                      }}
                    >
                      <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            評価が完了しました。
                            <br />
                            この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                          </span>
                        </>
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default RefundStepperMessage;
