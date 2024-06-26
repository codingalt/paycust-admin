import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./Categories.module.scss";
import { addCategorySchema } from "@/utils/validation/CategoryValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useGetCategoryEditQuery, useUpdateCategoryMutation } from "@/services/api/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
  });

  const {
    data: fetchedData,
    isLoading: isLoadingCategoryData,
    error: isFetchDataError,
  } = useGetCategoryEditQuery(id);

  useEffect(() => {
    if (fetchedData) {
      setInitialValues((prevVal) => ({
        ...prevVal,
        name: fetchedData?.category?.name,
        image: fetchedData?.category?.image,

      }));
    }
  }, [fetchedData]);

  const [updateCategory, res] = useUpdateCategoryMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (error) {
      toastError("Uh oh! Something went wrong.");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Category updated successfully");
    }
  }, [isSuccess]);

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
    if (image) {
      formData.append("image", values.image);
    }

    await updateCategory({ categoryId: id, formData: formData });
  };

  return (
    <div className={css.editWrapper}>
      <div className={css.top}>
        <span>Edit Category</span>
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
            validationSchema={addCategorySchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, setFieldValue, touched }) => (
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
                            import.meta.env.VITE_STORE_GLOBAL_CATEGORIES +
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
                        <Loader width={15} /> <span>Update Category</span>
                      </>
                    ) : (
                      "Update Category"
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

export default EditCategory;
