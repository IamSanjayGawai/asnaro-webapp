import React, { createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Modal from "react-modal";
import "cropperjs/dist/cropper.css";

const customStyles = {
  content: {
    display: "block",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "20",
  },
};

Modal.setAppElement("#root");

interface CropToolProps {
  image: string;
  setCropData: (cropData: string) => void;
  isCropperActive: boolean;
  setIsCropperActive: (isCropperActive: boolean) => void;
  isProcess?: boolean;
  setDropZoneImg?: (value: boolean) => void;
}

export const CropTool: React.FC<CropToolProps> = ({
  image,
  setCropData,
  isCropperActive,
  setIsCropperActive,
  isProcess,
  setDropZoneImg,
}) => {
  const cropperRef = createRef<ReactCropperElement>();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  console.log(isProcess);

  React.useEffect(() => {
    if (isCropperActive) {
      openModal();
    }
  }, [isCropperActive]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setDropZoneImg && setDropZoneImg(false);
  }

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setIsCropperActive(false);
    }
    setDropZoneImg && setDropZoneImg(true);
  };

  return (
    <div className="z-[1000]">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <div className="h-screen w-full">
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%", zIndex: 1000 }}
              aspectRatio={isProcess ? 1 / 1 : 16 / 9}
              movable={false}
              preview=".img-preview"
              src={image}
              responsive={true}
              viewMode={1}
              minCropBoxHeight={0}
              minCropBoxWidth={10}
              background={false}
              autoCropArea={1}
              autoCrop={true}
              checkOrientation={false}
              cropBoxResizable={false}
              guides={true}
            />
          </div>
          <div>
            <div
              className="box"
              style={{ width: "50%", float: "right", height: "300px" }}
            >
              <button style={{ float: "right" }} onClick={getCropData}>
                画像を切り取る
              </button>
            </div>
          </div>
          <button onClick={closeModal}>キャンセル</button>
          <br style={{ clear: "both" }} />
        </div>
      </Modal>
    </div>
  );
};

export default CropTool;
