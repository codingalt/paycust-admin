import React, { useEffect, useState } from "react";
import css from "./Categories.module.scss";
import { Button } from "@/components/ui/button";
import CategoryCard from "./CategoryCard";
import CardSkeleton from "./CardSkeleton";
import { BsClipboard2Data } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/api/categoryApi";
import ConfirmDelete from "./ConfirmDelete";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import { toastSuccess } from "../Toast/Toast";
import { useMainContext } from "@/context/MainContext";

const Categories = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery();
  const [categories, setCategories] = useState(null);
  const { searchQuery } = useMainContext();

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = data?.categories?.filter((item) => {
        const { name } = item;
        const searchTerm = searchQuery.toLowerCase();
        return name && name.toLowerCase().includes(searchTerm);
      });

      setCategories(filteredData);
    } else {
      setCategories(data?.categories);
    }
  }, [searchQuery, data]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [deleteCategory, res] = useDeleteCategoryMutation();
  const { isLoading: isLoadingDelete, isSuccess, error } = res;

  const handleDeleteCategory = async () => {
    if (selectedItem) {
      await deleteCategory({ id: selectedItem?.id });
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
      toastSuccess("Category deleted successfully");
      setSelectedItem(null);
    }
  }, [isSuccess]);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Categories</span>
        <Button
          onClick={() => navigate("/admin/addCategory")}
          className="py-3 px-3 text-sm"
        >
          + Add Category
        </Button>
      </div>

      <div
        className={`${css.categories} gap-x-4 gap-y-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7`}
      >
        {categories?.map((item) => (
          <CategoryCard
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
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>

      {/* Empty Data  */}
      {!isLoading && categories?.length === 0 && (
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

export default Categories;
