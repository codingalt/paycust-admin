import React from "react";
import Modal from "react-modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "@nextui-org/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 99999,
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const ConfirmDelete = ({
  modalIsOpen,
  closeModal,
  handleDeleteCategory,
  isLoadingDelete,
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Item"
        closeTimeoutMS={200}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this item?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              isLoading={isLoadingDelete}
              onClick={handleDeleteCategory}
              color="danger"
            >
              {"Yes, I'm sure"}
            </Button>
            <Button onClick={closeModal}>No, cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmDelete;
