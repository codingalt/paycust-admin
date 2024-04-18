import React, { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import p1 from "../../../../assets/Customer/Store/p1.jpg";
import p2 from "../../../../assets/Customer/Store/p2.jpg";
import p3 from "../../../../assets/Customer/Store/p3.jpg";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const UploadImages = ({ selectedImages, setSelectedImages }) => {
  const imageRef = useRef();
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState();

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      console.log(selectedImages);
      let selectedCount = 0;
      if (filesArray.length > 3 || selectedImages.length >= 3) {
        setError("You can upload only 3 images");
        return;
      } else {
        setError(null);
        filesArray.forEach((item) => {
          // Check if the file size is within the limit (2MB)
          if (item.size <= 2 * 1024 * 1024) {
            selectedCount++;
            if (selectedCount <= 3) {
              setSelectedImages((prevValue) => [...prevValue, item]);
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImages((prevValue) => [...prevValue, reader.result]);
              };
              reader.readAsDataURL(item);
            } else {
              setError("You can only select up to 3 images.");
              return;
            }
          } else {
            setError("File size exceeds the limit of 2MB.");
            return;
          }
        });
      }
    } else {
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setPreviewImages((prevValue) => prevValue.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col flex-1 border-1 rounded-lg py-4 px-4 mt-3.5">
      <p className="text-default-700 text-lg font-bold mb-2">Deal Images</p>

      {error && (
        <p className="text-tiny font-medium text-red-500 -mt-1 mb-3">{error}</p>
      )}

      <div
        onClick={() => imageRef.current.click()}
        className="flex w-full cursor-pointer rounded-lg h-36 flex-col border-1 space-y-3 items-center justify-center"
      >
        <IoImageOutline fontSize={25} className="text-default-500" />
        <p className="text-default-400 font-medium text-tiny">
          <span className="text-blue-600">Click to browse</span> your images
        </p>
      </div>
      <input
        ref={imageRef}
        multiple
        type="file"
        id="images"
        name="images"
        accept="image/*"
        onChange={(event) => handleImageChange(event)}
        style={{ display: "none" }}
      />

      {/* Images preview  */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="rounded-lg h-24 object-cover align-middle relative">
          {selectedImages[0] && (
            <div
              onClick={() => handleRemoveImage(0)}
              className="absolute top-1 cursor-pointer right-1 text-gray-50 w-6 h-6 flex justify-center items-center bg-slate-700 bg-opacity-60 rounded-full"
            >
              <IoMdClose fontSize={18} />
            </div>
          )}

          <img
            src={previewImages[0] ? previewImages[0] : p1}
            alt=""
            className="w-full h-full align-middle rounded-lg"
          />
        </div>
        <div className="rounded-lg h-24 object-cover align-middle relative">
          {selectedImages[1] && (
            <div
              onClick={() => handleRemoveImage(1)}
              className="absolute top-1 cursor-pointer right-1 text-gray-50 w-6 h-6 flex justify-center items-center bg-slate-700 bg-opacity-60 rounded-full"
            >
              <IoMdClose fontSize={18} />
            </div>
          )}

          <img
            src={previewImages[1] ? previewImages[1] : p2}
            alt=""
            className="w-full h-full align-middle rounded-lg"
          />
        </div>
        <div className="rounded-lg h-24 object-cover align-middle relative">
          {selectedImages[2] && (
            <div
              onClick={() => handleRemoveImage(2)}
              className="absolute top-1 cursor-pointer right-1 text-gray-50 w-6 h-6 flex justify-center items-center bg-slate-700 bg-opacity-60 rounded-full"
            >
              <IoMdClose fontSize={18} />
            </div>
          )}

          <img
            src={previewImages[2] ? previewImages[2] : p3}
            alt=""
            className="w-full h-full align-middle rounded-lg"
          />
        </div>
      </div>

      <p className="text-default-500 font-normal text-tiny mt-4 flex space-x-1">
        <IoMdInformationCircleOutline fontSize={24} className="-mt-0.5" />{" "}
        <span>
          You need at least 3 images. Pay attention to the quality of the
          picture you add(max size 2mb).
        </span>
      </p>
    </div>
  );
};

export default UploadImages;
