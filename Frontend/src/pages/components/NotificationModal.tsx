interface DataProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const NotificationModal = ({ showModal, setShowModal }: DataProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="flex items-end justify-end min-h-screen pt-4 pr-4 pb-20 sm:block sm:p-0">
              {/* Background Overlay */}
              <div
                className="fixed inset-0 b"
                onClick={() => setShowModal(false)}
              ></div>

              {/* Modal */}
              <div
                className={`fixed top-20 ${
                  window.innerWidth < 600 ? "right-0" : "right-20"
                }  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}
                style={{
                  width: `${window.innerWidth < 600 ? "22rem" : "30rem"}`,
                }} // Adjust maxWidth as needed
              >
                {/* Modal Content */}
                <div className="p-6">
                  <div>
                    <div className="flex flex-row">
                      <div className="w-[15%]">
                        <div className="rounded-full bg-slate-400 h-[2.5rem] w-[2.5rem] "></div>
                      </div>

                      <div className="w-[80%]">
                        <div className="flex justify-between">
                          <span>Asnaro</span>
                          <span className="bg-[#FFF4DF] text-yellow-400 px-4">
                            重要
                          </span>
                        </div>
                        <span>
                          通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト
                        </span>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NotificationModal;
