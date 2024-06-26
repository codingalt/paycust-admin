import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./AddSubCategory.module.scss";
import { addSubCategorySchema } from "@/utils/validation/CategoryValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { FaCamera } from "react-icons/fa";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { Skeleton } from "@mui/material";
import { useAddSubCategoryMutation, useGetCategoriesQuery } from "@/services/api/categoryApi";

const AddSubCategory = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const {
      data,
      isLoading: isLoadingCategories,
      error: isFetchDataError,
    } = useGetCategoriesQuery();

    const [addSubCategory, res] = useAddSubCategoryMutation();
    const { isLoading, isSuccess, error } = res;

    useMemo(() => {
      if (error) {
        toastError("Uh oh! Something went wrong.");
      }
    }, [error]);

    useMemo(() => {
      if (isSuccess) {
        toastSuccess("Category was created successfully");
        setImage(null);
      }
    }, [isSuccess]);

    const initialValues = {
      name: "",
      image: "",
      global_category_id: "",
    };

    const openImage = (e, setFieldValue) => {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        setFieldValue("image", img);
        setImage({
          image: URL.createObjectURL(img),
        });
      }
    };

    const handleSubmit = async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("global_category_id", values.global_category_id);

      await addSubCategory(formData);

      resetForm({
        values: initialValues,
      });
    };

    const handleCategorySelectionChange = (e, setFieldValue) => {
      const selectedValues = e.target.value
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== "");

      setFieldValue("global_category_id", parseInt(selectedValues[0]));
    };
    
  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Add Sub Category</span>
      </div>

      <div className={css.addForm}>
        {isFetchDataError ? (
          <div>Something went wrong</div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={addSubCategorySchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue, touched }) => (
              <Form>
                <div className={css.group}>
                  <label htmlFor="name">
                    Name<span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Please enter category name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.group}>
                  <Select
                    isRequired
                    variant="bordered"
                    label="Select an category"
                    labelPlacement="outside"
                    className="max-w-xxl"
                    radius="sm"
                    placeholder="Select a Global Category"
                    name="global_category_id"
                    id="global_category_id"
                    size="lg"
                    isLoading={isLoadingCategories}
                    onChange={(e) =>
                      handleCategorySelectionChange(e, setFieldValue)
                    }
                  >
                    {data?.categories?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <ErrorMessage
                    name="global_category_id"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.group}>
                  <label htmlFor="image">
                    Category Image<span>*</span>
                  </label>
                  <div
                    className={css.upload}
                    onClick={() => imageRef.current.click()}
                  >
                    <input
                      ref={imageRef}
                      type="file"
                      id="name"
                      name="name"
                      accept="image/*"
                      onChange={(event) => openImage(event, setFieldValue)}
                      style={{ display: "none" }}
                    />
                    <div className={css.icon}>
                      {image ? (
                        <img src={image.image} alt="" />
                      ) : (
                        <FiUploadCloud />
                      )}
                    </div>
                    <p>
                      <span>Click to upload</span>
                      <span>SVG, PNG, JPG (max. 800x400px)</span>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className={css.inputError}
                      />
                    </p>
                  </div>
                </div>

                <div className={css.button}>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-4 mt-2 space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader width={15} /> <span>Add Sub Category</span>
                      </>
                    ) : (
                      "Add Sub Category"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default AddSubCategory