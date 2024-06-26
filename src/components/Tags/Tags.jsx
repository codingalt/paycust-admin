import React, { useEffect, useState } from "react";
import css from "./Tags.module.scss";
import { Button } from "../ui/button";
import { useDeleteTagMutation, useGetTagsQuery } from "@/services/api/tagsApi";
import TagSkeleton from "./TagSkeleton";
import TagCard from "./TagCard";
import { useDisclosure } from "@nextui-org/react";
import AddTagModal from "./AddTagModal";
import { toastSuccess } from "../Toast/Toast";
import ConfirmDelete from "./ConfirmDelete";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import { useMainContext } from "@/context/MainContext";
import { BsClipboard2Data } from "react-icons/bs";

const Tags = () => {
  const { data, isLoading } = useGetTagsQuery();
   const { searchQuery } = useMainContext();
   const [tags, setTags] = useState(null);

   useEffect(() => {
     if (searchQuery !== "") {
       const filteredData = data?.tags?.filter((item) => {
         const { name } = item;
         const searchTerm = searchQuery.toLowerCase();
         return name && name.toLowerCase().includes(searchTerm);
       });

       setTags(filteredData);
     } else {
       setTags(data?.tags);
     }
   }, [searchQuery, data]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [deleteTag, res] = useDeleteTagMutation();
  const { isLoading: isLoadingDelete, isSuccess, error } = res;

  const handleDeleteTag = async () => {
    if (selectedItem) {
      await deleteTag({ id: selectedItem?.id });
    }
  };

  const apiErrors = useApiErrorHandling(error);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      toastSuccess("Tag deleted successfully");
      setSelectedItem(null);
    }
  }, [isSuccess]);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Tags</span>
        <Button onClick={onOpen} className="py-3 px-3 text-sm">
          + Add Tag
        </Button>
      </div>

      {/* Add Tag Modal  */}
      <AddTagModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <TagSkeleton key={index} />
            ))
          : tags?.map((item) => (
              <TagCard
                item={item}
                key={item.id}
                openModal={openModal}
                setSelectedItem={setSelectedItem}
              />
            ))}

        {/* Tag Delete Confirmation  */}
        <ConfirmDelete
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          isLoadingDelete={isLoadingDelete}
          handleDeleteCategory={handleDeleteTag}
        />
      </div>

      {/* Empty Data  */}
      {!isLoading && tags?.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            width: "100%",
            height: "350px",
            justifyContent: "center",
          }}
        >
          <BsClipboard2Data fontSize={40} />
          <p style={{ fontSize: "1.1rem" }}>No data found</p>
        </div>
      )}
    </div>
  );
};

export default Tags;
