import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./AddGlobalCategory.module.scss";
import { addGlobalCategorySchema } from "@/utils/validation/StoreValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { values } from "lodash";
import Loader from "@/components/Loader/Loader";
import { useAddCategoryMutation } from "@/services/api/categoryApi";

const AddGlobalCategory = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
   const { toast } = useToast();

  const [addCategory, res] = useAddCategoryMutation();
  const {isLoading, isSuccess, error} = res;

  useMemo(()=>{
    if(error){
      toastError("Uh oh! Something went wrong.");
    }
  },[error]);

  useMemo(()=>{
    if(isSuccess){
      toastSuccess("Category was created successfully");
      setImage(null)
    }
  },[isSuccess]);

  const initialValues = {
    name: "",
    image: "",
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

    await addCategory(formData);

     resetForm({
       values: initialValues,
     });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Add Category</span>
      </div>

      <div className={css.addForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={addGlobalCategorySchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.group}>
                <label htmlFor="name">Name*</label>
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
                <label htmlFor="image">Category Image*</label>
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
                      <Loader width={15} /> <span>Add Category</span>
                    </>
                  ) : (
                    "Add Category"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddGlobalCategory;
