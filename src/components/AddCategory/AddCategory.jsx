import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./AddCategory.module.scss";
import { addCategorySchema } from "@/utils/validation/CategoryValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { values } from "lodash";
import Loader from "@/components/Loader/Loader";
import { useAddCategoryMutation } from "@/services/api/categoryApi";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/react";

const genders = [
  {
    id: 1,
    label: "Male",
    value: "male",
  },
  {
    id: 2,
    label: "Female",
    value: "female",
  },
  {
    id: 3,
    label: "General",
    value: "general",
  }
]

const AddCategory = () => {
  const [image, setImage] = useState(null);
   const [ageGroup, setAgeGroup] = useState([0, 60]);
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
      toastSuccess("Category created successfully");
      setImage(null)
    }
  },[isSuccess]);

  const initialValues = {
    name: "",
    gender: "",
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

   const handleSelectionChange = (e, setFieldValue) => {
     const selectedValues = e.target.value
       .split(",")
       .map((value) => value.trim())
       .filter((value) => value !== "");

     setFieldValue("gender", selectedValues[0]);
   };

  const handleSubmit = async (values, { resetForm }) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("ageGroup", ageGroup);
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
          validationSchema={addCategorySchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.group}>
                <label htmlFor="name">Category Name*</label>
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
                  label="Select gender for category"
                  labelPlacement="outside"
                  className="max-w-xxl"
                  radius="sm"
                  placeholder="Select gender for category"
                  name="gender"
                  id="gender"
                  size="lg"
                  onChange={(e) => handleSelectionChange(e, setFieldValue)}
                >
                  {genders?.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>

                <ErrorMessage
                  name="gender"
                  component="div"
                  className={css.inputError}
                />
              </div>

              <div className={css.group}>
                <div className="flex flex-col gap-2 w-full h-full max-w-xxl items-start justify-center">
                  <Slider
                    label="Select age group"
                    step={1}
                    maxValue={100}
                    minValue={0}
                    value={ageGroup}
                    onChange={setAgeGroup}
                    className="max-w-xxl"
                    showTooltip={true}
                    color="primary"
                  />
                  <p className="text-default-500 font-medium text-small">
                    Selected age group:{" "}
                    {Array.isArray(ageGroup) &&
                      ageGroup.map((b) => `${b}`).join(" – ")}
                  </p>
                </div>

                <ErrorMessage
                  name="ageGroup"
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

export default AddCategory;
