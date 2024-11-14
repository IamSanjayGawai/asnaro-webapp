import React from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import { FileError } from "@/types/types";
import { fileToBase64 as FileConverter } from "@/utils/base64convert";
import CropTool from "./Cropper";

interface FileRejection {
  file: FileWithPath;
  errors: FileError[];
}

interface DropzoneProps {
  setValue: any;
  id?: number;
  onFileSelect?: (file: File, id: number) => void;
  isReset?: boolean;
  isProcess?: boolean;
  dropped?: boolean;
  setDropped?: (value: boolean) => void;
  setDropZoneImg?: (value: boolean) => void;
}

const baseStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  height: "100%",
};

export default function Dropzone({
  setValue,
  id,
  onFileSelect,
  isReset,
  isProcess,
  dropped,
  setDropped,
  setDropZoneImg,
}: DropzoneProps) {
  const [image, setImage] = React.useState<string>("");
  const [cropData, setCropData] = React.useState<string>("");
  const [isCropperActive, setIsCropperActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isReset) {
      setImage("");
      setCropData("");
    }
  }, [isReset]);

  React.useEffect(() => {
    setValue(
      id === 1
        ? "img1"
        : id === 2
          ? "img2"
          : id === 3
            ? "img3"
            : id === 4
              ? "profile_img"
              : "image",
      cropData
    );
    onFileSelect(cropData as unknown as File, id as number);
  }, [cropData]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: async (acceptedFiles) => {
        if (fileRejectionItems.length === 0) {
          setIsCropperActive(true);
          const baseString = await FileConverter(acceptedFiles[0]);
          setImage(baseString);
          setDropped(true);
        }
      },
    });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
    }),
    [baseStyle]
  );

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: FileRejection) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

  return (
    <section className="container w-full h-full">
      {cropData.length === 0 && (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.91079 29.1169C6.33925 29.1169 5.84998 28.9192 5.44297 28.5237C5.03596 28.1283 4.83246 27.6529 4.83246 27.0977V6.90535C4.83246 6.35007 5.03596 5.87471 5.44297 5.47927C5.84998 5.08384 6.33925 4.88612 6.91079 4.88612H21.0781V6.90535H6.91079V27.0977H27.6941V13.3669H29.7725V27.0977C29.7725 27.6529 29.569 28.1283 29.162 28.5237C28.755 28.9192 28.2657 29.1169 27.6941 29.1169H6.91079ZM24.923 12.3573V9.63132H22.1173V7.61208H24.923V4.88612H27.0014V7.61208H29.8071V9.63132H27.0014V12.3573H24.923ZM8.98913 23.665H25.6158L20.6278 17.2034L16.2287 22.8236L12.9726 18.6505L8.98913 23.665Z"
              fill="#E6E6E6"
            />
          </svg>
        </div>
      )}
      {acceptedFiles.length > 0 && (
        <div className="w-full h-full">
          {isCropperActive ? (
            <CropTool
              image={image}
              setDropZoneImg={setDropZoneImg}
              setCropData={setCropData}
              isCropperActive={isCropperActive}
              setIsCropperActive={setIsCropperActive}
              isProcess={isProcess}
            />
          ) : (
            <div className="w-full h-full">
              {cropData.length > 0 && (
                <div className="w-full h-full flex justify-center items-center relative">
                  <img
                    src={cropData}
                    className={`w-full h-full ${
                      dropped ? "rounded-[100%]" : ""
                    } object-cover`}
                    alt=""
                  />
                  <svg
                    className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setCropData("");
                      setDropped(false);
                      setDropZoneImg && setDropZoneImg(false);
                    }}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="black"
                      fillOpacity="0.5"
                    />
                    <line
                      x1="14.3536"
                      y1="5.35355"
                      x2="5.35355"
                      y2="14.3536"
                      stroke="white"
                    />
                    <line
                      y1="-0.5"
                      x2="12.7279"
                      y2="-0.5"
                      transform="matrix(0.707107 0.707107 0.707107 -0.707107 6 5)"
                      stroke="white"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <aside>
        {fileRejectionItems.length > 0 && (
          <>
            <h4>Only image files accepted</h4>
          </>
        )}
      </aside>
    </section>
  );
}
