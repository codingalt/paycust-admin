import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./SubCategories.module.scss";
import { addSubCategorySchema } from "@/utils/validation/CategoryValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useGetSubCategoryEditQuery, useUpdateSubCategoryMutation } from "@/services/api/categoryApi";

const EditSubCategory = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: null,
    category_id: "",
  });

  const {
    data: fetchedData,
    isLoading: isLoadingCategoryData,
    error: isFetchDataError,
  } = useGetSubCategoryEditQuery(id);

  useEffect(() => {
    if (fetchedData) {
      setInitialValues((prevVal) => ({
        ...prevVal,
        name: fetchedData?.subCategory?.name,
        image: fetchedData?.subCategory?.image,
        category_id: parseInt(fetchedData?.subCategory?.category_id),
      }));

      setCategories(fetchedData?.categories);
    }
  }, [fetchedData]);

  const [updateSubCategory, res] = useUpdateSubCategoryMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (error) {
      toastError("Uh oh! Something went wrong.");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Sub category updated successfully");
    }
  }, [isSuccess]);

  const openImage = (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setFieldValue("image", img);
      console.log(img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    let formData = new FormData();
    formData.append("name", values.name);
    if (image) {
      formData.append("image", values.image);
    }
    formData.append("category_id", parseInt(values.category_id));

    await updateSubCategory({ subCategoryId: id, formData: formData });
  };

  return (
    <div className={css.editWrapper}>
      <div className={css.top}>
        <span>Edit Sub Category</span>
      </div>

      {isFetchDataError ? (
        <div>Something went wrong</div>
      ) : isLoadingCategoryData ? (
        <div className="w-full h-52 flex items-center ml-32">
          <Loader color={"#000"} width={34} />
        </div>
      ) : (
        <div className={css.addForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={addSubCategorySchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, setFieldValue, touched, values }) => (
              <Form>
                <div className={css.group}>
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="category_id">Category</label>
                  <Field
                    as="select"
                    name="category_id"
                    id="category_id"
                    disabled={isLoadingCategoryData}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category_id"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.group}>
                  <label htmlFor="image">Category Image</label>
                  <div
                    className={css.upload}
                    onClick={() => imageRef.current.click()}
                  >
                    <div className={css.profile}>
                      {image ? (
                        <img src={image.image} alt="" />
                      ) : (
                        <img
                          src={
                            import.meta.env.VITE_STORE_SUB_GLOBAL_CATEGORIES +
                            initialValues?.image
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <div className={css.uploadContent}>
                      <input
                        ref={imageRef}
                        type="file"
                        id="image"
                        name="image"
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
                        <span>Change picture</span>
                        <span>SVG, PNG, JPG (max. 800x400px)</span>
                        <ErrorMessage
                          name="image"
                          component="div"
                          className={css.inputError}
                        />
                      </p>
                    </div>
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
                        <Loader width={15} /> <span>Update Sub Category</span>
                      </>
                    ) : (
                      "Update Sub Category"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default EditSubCategory;
