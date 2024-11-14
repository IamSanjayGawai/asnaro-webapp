import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/state/hooks";
import { showPaymentModal } from "@/state/slices/transactionSlice";
import Spinner from "@/components/static/Spinner";

const StepperMessage = ({
  admin,
  buyername,
  quotation,
  ordererAgree,
  handleContract,
  contract_agree,
  sellername,
  paymentDeposit,
  transactionId,
  handleDeliveryCompleted,
  handleDeliverySentBack,
  handleDeliveryAccepted,
  deliveryStatus,
  handleReviewModalShow,
  ratingByBuyer,
  ratingBySeller,
  estimateTable,
  submitQuotation,
  handleAgreeToTerms,
  handleRequestReQuotation,
  netQuotationRequested,
  netQuotationSent,
  netQuotationReceived,
  netReQuoteRequested,
  netReQuoteReceived,
  netReQuoteSent,
  netTermsAgreed,
  netContractSigned,
  netPaymentDone,
  netDeliveryDone,
  netDeliveryOK,
  estimateLoading,
  reQuoteLoading,
  agreeLoading,
  concludeLoading,
  delivery,
  sentBackLoading,
  acceptedLoading,
}) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const handlePaymentNavigate = () => {
    router(`/transaction/${transactionId}/payment`);
    dispatch(showPaymentModal(true));
  };

  // console.log("deliveryStatus", deliveryStatus);
  // console.log("quotationRequested", quotationRequested);
  // console.log("netReQuoteRequested", netReQuoteRequested);
  // console.log("netReQuoteSent", netReQuoteSent);
  // console.log("netTermsAgreed", netTermsAgreed);
  console.log("netDeliveryOk", netDeliveryOK);

  return (
    <>
      {buyername ? (
        <>
          {!netQuotationRequested &&
          !netQuotationReceived &&
          !netReQuoteRequested &&
          !netReQuoteSent &&
          !netTermsAgreed &&
          !netContractSigned &&
          !netPaymentDone &&
          !quotation &&
          !netDeliveryDone &&
          !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまへ見積を依頼しましょう。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[40%] flex justify-end"></div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            !netQuotationReceived &&
            !netReQuoteRequested &&
            !netReQuoteSent &&
            !netTermsAgreed &&
            !netContractSigned &&
            !quotation &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまに見積を依頼しました。条件を修正する場合は再見積を依頼しましょう。
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleRequestReQuotation}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5  ${
                              reQuoteLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {reQuoteLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "再見積を依頼する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            !netReQuoteRequested &&
            !netReQuoteSent &&
            !netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 8% 0, 9% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 8% 0, 9% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        {
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            出品者さまから見積書が届きました。見積内容に問題がないか確認しましょう。
                            <br />
                            問題がなければ「合意する」ボタンを押してください。
                          </span>
                        }
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleAgreeToTerms}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              agreeLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {agreeLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netReQuoteRequested &&
            !netReQuoteSent &&
            !netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[70%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまに再見積を依頼しました。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[30%] flex justify-end">
                          <span
                            onClick={!admin && handleRequestReQuotation}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              reQuoteLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {reQuoteLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "再見積を依頼する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netReQuoteRequested &&
            netReQuoteSent &&
            !netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          売主から再見積書を受け取りました。見積書に問題がないか確認してください。
                          問題なければ「同意する」ボタンをクリックしてください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleAgreeToTerms}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              agreeLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {agreeLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "合意する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 25% 20%, 26% 0, 27% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 25% 20%, 26% 0, 27% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          見積内容に合意しました。現在出品者さまが契約手続き対応中です。
                          <br />
                          条件を修正する場合は再見積を依頼しましょう。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[30%] flex justify-end">
                          <span
                            onClick={!admin && handleRequestReQuotation}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[150px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              reQuoteLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {reQuoteLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "再見積を依頼する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 42% 0, 43% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 42% 0, 43% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまと契約を締結しました。仮払請求書を発行しましたので、仮払いのご対応をお願いいたします。
                          <br />
                          仮払いが完了するまでは出品者さまに作業を依頼しないようお願いいたします。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handlePaymentNavigate}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              admin ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            仮払いする
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 56% 20%, 57% 0, 58% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 56% 20%, 57% 0, 58% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          仮払いが完了しました。これより出品者さまの作業開始となります。出品者さまからの納品を待ちましょう。
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 73% 20%, 74% 0, 75% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 73% 20%, 74% 0, 75% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[70%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          出品者さまから制作物が納品されました。受領書を発行し、納品物に問題がないか
                          <br />
                          確認しましょう。問題がなければ「検収完了」ボタンを押してください。
                          <br />
                          不備があれば、「差し戻す」ボタンを押してください。
                        </span>
                        <div className="w-[30%] flex gap-2 justify-end">
                          <span
                            onClick={!admin && handleDeliverySentBack}
                            className={`bg-tertiary h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              sentBackLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {sentBackLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "差し戻す"
                            )}
                          </span>
                          <span
                            onClick={!admin && handleDeliveryAccepted}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                              acceptedLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {acceptedLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "検収を完了する"
                            )}
                          </span>
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryOK &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 90% 20%, 91% 0, 92% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 90% 20%, 91% 0, 92% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          決済が完了し、取引が完了しました。最後に出品者さまの評価をお願いします
                        </span>
                        <div className="w-[40%] flex gap-2 justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-fourth h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
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
            netQuotationRequested &&
            netQuotationReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryOK &&
            ratingByBuyer && (
              <div className="flex justify-start mb-[20px]">
                <div className="flex justify-center w-full">
                  <span
                    className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 93% 20%, 92% 0, 91% 20%, 1% 20%)",
                    }}
                  >
                    <span
                      className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                      style={{
                        clipPath:
                          "polygon(1% 100%, 99% 100%, 99% 20%, 93% 20%, 92% 0, 91% 20%, 1% 20%)",
                      }}
                    >
                      <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                        <>
                          <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
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
          !netQuotationSent &&
          !netReQuoteReceived &&
          !netTermsAgreed &&
          !netContractSigned &&
          !netPaymentDone &&
          !netDeliveryDone ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[80%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまからの見積希望内容を確認し、見積金額の入力をお願いいたします。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[20%] flex justify-end">
                          {estimateTable && (
                            <span
                              onClick={
                                !admin &&
                                estimateTable &&
                                Array.isArray(estimateTable) &&
                                estimateTable.length > 0
                                  ? submitQuotation
                                  : null
                              }
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5   ${
                                (estimateTable &&
                                  Array.isArray(estimateTable) &&
                                  estimateTable.length > 0 &&
                                  !estimateLoading) ||
                                admin
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              } `}
                            >
                              {estimateLoading ? (
                                <Spinner className="h-full" />
                              ) : (
                                "見積を送信する"
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            netQuotationSent &&
            !netReQuoteReceived &&
            !netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[80%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまに見積を提出しました。内容変更の際は条件を修正して再度見積を提出しましょう。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[20%] flex justify-end">
                          {estimateTable && (
                            <span
                              onClick={
                                !admin &&
                                estimateTable &&
                                Array.isArray(estimateTable) &&
                                estimateTable.length > 0
                                  ? submitQuotation
                                  : null
                              }
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                                (estimateTable &&
                                  Array.isArray(estimateTable) &&
                                  estimateTable.length > 0 &&
                                  !estimateLoading) ||
                                admin
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              } `}
                            >
                              {estimateLoading ? (
                                <Spinner className="h-full" />
                              ) : (
                                "見積を送信する"
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            netReQuoteReceived &&
            !netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 7% 20%, 6% 0, 5% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまから再見積の依頼がありました。内容変更の際は条件を修正して再度見積を提出しましょう。
                          <br />
                          詳細な仕様やその他ご要望についてはメッセージスペースでご相談ください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          {estimateTable && (
                            <span
                              onClick={
                                !admin &&
                                estimateTable &&
                                Array.isArray(estimateTable) &&
                                estimateTable.length > 0
                                  ? submitQuotation
                                  : null
                              }
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5   ${
                                (estimateTable &&
                                  Array.isArray(estimateTable) &&
                                  estimateTable.length > 0 &&
                                  !estimateLoading) ||
                                admin
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              } `}
                            >
                              {estimateLoading ? (
                                <Spinner className="h-full" />
                              ) : (
                                "見積を送信する"
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            !netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 28% 20%, 29% 0, 30% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 28% 20%, 29% 0, 30% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまが見積内容に合意しました。再度条件に問題がないか確認しましょう。
                          <br />
                          問題がなければ「契約締結する」ボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleContract}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 cursor-pointer ${
                              concludeLoading || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {concludeLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "契約締結する"
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
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            netContractSigned &&
            !netPaymentDone &&
            !netDeliveryDone ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 28% 20%, 29% 0, 30% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 28% 20%, 29% 0, 30% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまが仮払い対応中です。依頼者さまの仮払いが完了するまで作業を開始しないようお願いいたします。
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            !netDeliveryDone &&
            !netDeliveryOK ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 48% 20%, 49% 0, 50% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 48% 20%, 49% 0, 50% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          納期までに依頼された制作物を制作し、依頼者さまへ納品しましょう。
                          <br />
                          納品したら「納品する」ボタンを押してください。
                        </span>
                        <div className="w-[40%] flex justify-end">
                          <span
                            onClick={!admin && handleDeliveryCompleted}
                            className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 cursor-pointer ${
                              delivery || admin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {delivery ? (
                              <Spinner className="h-full" />
                            ) : (
                              "納品する"
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
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryDone &&
            !netDeliveryOK &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 68% 20%, 69% 0, 70% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 68% 20%, 69% 0, 70% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          現在依頼者さまが検収対応をしています。検収完了までしばらくお待ちください。
                        </span>
                      </>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryDone &&
            netDeliveryOK &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 68% 20%, 69% 0, 70% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 68% 20%, 69% 0, 70% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-[80%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                          依頼者さまが検収を完了しました。後日ASNAROより手数料を差し引いた金額をお振込みいたします。
                          <br />
                          取引請求書・システム利用料請求書を発行しましたので、帳票一覧よりご確認ください。
                          <br />
                          最後に依頼者さまの評価をお願いします。
                        </span>
                        <div className="w-[20%] flex gap-2 justify-end">
                          <span
                            onClick={!admin && handleReviewModalShow}
                            className={`bg-fourth h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
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
            netQuotationSent &&
            !netReQuoteReceived &&
            netTermsAgreed &&
            netContractSigned &&
            netPaymentDone &&
            netDeliveryDone &&
            netDeliveryOK &&
            ratingBySeller ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 91% 20%, 90% 0, 89% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 91% 20%, 90% 0, 89% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      <>
                        <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
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
          ) : sellername && ordererAgree && !contract_agree ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 22% 20%, 21% 0, 20% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 22% 20%, 21% 0, 20% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[80%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            出品者さまと契約を締結しました。仮払請求書を発行しましたので、仮払いのご対応をお願いいたします。
                            仮払いが完了するまでは出品者さまに作業を依頼しないようお願いいたします。
                          </span>
                          <div className="w-[20%] flex justify-end">
                            <span
                              onClick={!admin && handleContract}
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 cursor-pointer ${
                                concludeLoading || admin
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              {concludeLoading ? (
                                <Spinner className="h-full" />
                              ) : (
                                "契約締結する"
                              )}
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : ordererAgree && contract_agree && !paymentDeposit ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 25% 20%, 24% 0, 23% 20%, 1% 20%)",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 25% 20%, 24% 0, 23% 20%, 1% 20%)",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            納期までに依頼された制作物を制作し、依頼者さまへ納品しましょう。
                            納品したら「納品する」ボタンを押してください。
                          </span>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            (deliveryStatus === 0 || deliveryStatus === 2) ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 1%, 40% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 42% 20%, 41% 1%, 40% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            納期までに依頼された制作物を制作し、依頼者さまへ納品しましょう。
                            納品したら「納品する」ボタンを押してください。
                          </span>
                          <div className="w-[40%] flex justify-end">
                            <span
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 cursor-pointer ${
                                delivery || admin
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              onClick={!admin && handleDeliveryCompleted}
                            >
                              {delivery ? (
                                <Spinner className="h-full" />
                              ) : (
                                "納品する"
                              )}
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 1 ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 58% 20%, 57% 0, 56% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 58% 20%, 57% 0, 56% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            現在依頼者さまが検収対応をしています。検収完了までしばらくお待ちください。
                          </span>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 3 &&
            !ratingBySeller ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 88% 20%, 89% 0, 90% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 88% 20%, 89% 0, 90% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="lg:w-[80%] xs:w-[70%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            依頼者さまが検収を完了しました。後日ASNAROより手数料を差し引いた金額をお振込みいたします。
                            取引請求書・システム利用料請求書を発行しましたので、帳票一覧よりご確認ください。
                            最後に依頼者さまの評価をお願いします。
                          </span>
                          <div className="lw-[20%] xs:w-[30%] flex justify-end">
                            <span
                              className={`bg-[#FFAA00] h-[20px] lg:w-[200px] xs:w-[100px] lg:py-5 xs:py-4 font-bold text-center flex justify-center items-center text-white lg:text-[18px] xs:text-[12px] mt-5 ${
                                admin ? "cursor-not-allowed" : "cursor-pointer"
                              }`}
                              onClick={!admin && handleReviewModalShow}
                            >
                              評価を記入する
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : sellername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 3 &&
            ratingBySeller ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 91% 20%, 90% 0, 89% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 91% 20%, 90% 0, 89% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <div className="flex flex-col ">
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            評価が完了しました。
                          </span>
                          <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:ml-10 xs:ml-2">
                            この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                          </span>
                        </div>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 1 ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            現在依頼者さまが検収対応をしています。検収完了までしばらくお待ちください。
                          </span>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : buyername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 3 &&
            !ratingByBuyer ? (
            <div className="flex justify-start mb-[20px]">
              <div className="flex justify-center w-full">
                <span
                  className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                  style={{
                    clipPath:
                      "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                  }}
                >
                  <span
                    className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                    }}
                  >
                    <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                      {
                        <>
                          <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                            決済が完了し、取引が完了しました。最後に出品者さまの評価をお願いします
                          </span>
                        </>
                      }
                    </div>
                  </span>
                </span>
              </div>
            </div>
          ) : (
            buyername &&
            ordererAgree &&
            contract_agree &&
            paymentDeposit &&
            deliveryStatus === 3 &&
            ratingByBuyer && (
              <div className="flex justify-start mb-[20px]">
                <div className="flex justify-center w-full">
                  <span
                    className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center"
                    style={{
                      clipPath:
                        "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                    }}
                  >
                    <span
                      className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                      style={{
                        clipPath:
                          "polygon(1% 100%, 99% 100%, 99% 20%, 41% 20%, 40% 0, 39% 20%, 1% 20%) ",
                      }}
                    >
                      <div className="h-full w-full flex flex-row items-center lg:p-5 xs:p-4 xs:px-2 md:px-5 sm:px-5 border">
                        {
                          <div className="flex flex-col ">
                            <span className="w-[60%] lg:text-[18px] xs:text-[12px] overflow-hidden lg:mt-5 xs:mt-6 lg:ml-10 xs:ml-2">
                              評価が完了しました。
                            </span>
                            <span className="w-full lg:text-[18px] xs:text-[12px] overflow-hidden lg:ml-10 xs:ml-2">
                              この度はASNAROをご利用いただきありがとうございました。またのご利用をお待ちしております
                            </span>
                          </div>
                        }
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

export default StepperMessage;
