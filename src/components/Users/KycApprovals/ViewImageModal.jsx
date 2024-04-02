import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ImageComponent from "@/components/ui/ImageComponent";

export default function ViewImageModal({
  isOpen,
  onOpen,
  onOpenChange,
  clickedImage,
}) {
  const handleImageDownload = () => {
    const link = document.createElement("a");
    link.href = clickedImage;
    link.download = clickedImage.split("/")[clickedImage.split("/").length - 1];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Modal
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full h-[440px] max-h-[440px] flex justify-center flex-col mt-14 overflow-hidden rounded-md">
                  <ImageComponent src={clickedImage} radius={"30px"} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="text-white"
                  onPress={() => {
                    handleImageDownload();
                  }}
                >
                  Download
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
