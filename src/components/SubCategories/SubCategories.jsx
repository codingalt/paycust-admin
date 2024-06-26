import React, { useEffect, useState } from "react";
import css from "./SubCategories.module.scss";
import { useNavigate } from "react-router-dom";
import SubCategoryCard from "./SubCategoryCard";
import { Button } from "@/components/ui/button";
import CardSkeleton from "./CardSkeleton";
import { BsClipboard2Data } from "react-icons/bs";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/services/api/categoryApi";
import { toastSuccess } from "../Toast/Toast";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import ConfirmDelete from "./ConfirmDelete";
import { useMainContext } from "@/context/MainContext";

const SubCategories = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubCategoriesQuery();
  const [subCategories, setSubCategories] = useState(null);
  const { searchQuery } = useMainContext();

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = data?.categories?.filter((item) => {
        const { name } = item;
        const searchTerm = searchQuery.toLowerCase();
        return name && name.toLowerCase().includes(searchTerm);
      });

      setSubCategories(filteredData);
    } else {
      setSubCategories(data?.categories);
    }
  }, [searchQuery, data]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [deleteSubCategory, res] = useDeleteSubCategoryMutation();
  const { isLoading: isLoadingDelete, isSuccess, error } = res;

  const handleDeleteSubCategory = async () => {
    if (selectedItem) {
      await deleteSubCategory({ id: selectedItem?.id });
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
      toastSuccess("Sub category deleted successfully");
      setSelectedItem(null);
    }
  }, [isSuccess]);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Sub Categories</span>
        <Button
          onClick={() => navigate("/admin/addSubCategory")}
          className="py-3 px-3 text-sm"
        >
          + Add Sub Category
        </Button>
      </div>

      <div
        className={`${css.categories} gap-x-4 gap-y-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7`}
      >
        {subCategories?.map((item) => (
          <SubCategoryCard
            item={item}
            key={item.id}
            openModal={openModal}
            setSelectedItem={setSelectedItem}
          />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 13 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}

        {/* Category Delete Confirmation  */}
        <ConfirmDelete
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          isLoadingDelete={isLoadingDelete}
          handleDeleteCategory={handleDeleteSubCategory}
        />
      </div>

      {/* Empty Data  */}
      {!isLoading && subCategories?.length === 0 && (
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

export default SubCategories;
