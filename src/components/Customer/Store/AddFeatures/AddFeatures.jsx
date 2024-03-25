import React, { useMemo, useState } from "react";
import css from "./AddFeatures.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addFeaturesSchema } from "@/utils/validation/StoreValidation";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { useAddFeaturesMutation, useGetSubGlobalCategoriesQuery } from "@/services/api/customer/store/storeCategoriesApi";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { FaCamera } from "react-icons/fa";

const AddFeatures = () => {
  const [values, setValues] = useState([]);
  const [isFeatureError, setIsFeatureError] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [addFeatures, res] = useAddFeaturesMutation();
  const {isLoading, error: isAddFeatureError, isSuccess} = res;

  useMemo(()=>{
    if(isSuccess){
      toastSuccess("Features created successfully");
      setFeatures([]);
      setValues([]);
    }
  },[isSuccess]);

  useMemo(() => {
    if(isAddFeatureError){
      toastError("Something went wrong")
    }
  }, [isAddFeatureError]);

  const {
    data,
    isLoading: isLoadingCategories,
    error: isFetchDataError,
  } = useGetSubGlobalCategoriesQuery();
  const initialValues = {
    name: "",
    values: [],
    sub_global_category_id: "",
  };

  const handleSubmit = async (valuesForm, { resetForm }) => {
    console.log(valuesForm);

    if (features.length === 0) {
      setIsFeatureError(true);
      return;
    }

    await addFeatures({
      name: valuesForm.name,
      values: features,
      sub_global_categories_ids: values,
    });

    // resetForm({
    //   valuesForm: initialValues,
    // });
  };

  const handleSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setValues(selectedValues);
    setIsFeatureError(false);
    setFieldValue("sub_global_category_id", selectedValues[0]);
  };

  const HandleAddFeature = () => {
    if (featureValue === "") {
      return;
    }
    setFeatures([...features, featureValue]);
    setFeatureValue("");
  };

  const HandleRemoveFeature = (i) => {
      const updatedValues = features.filter((value, index) => index !== i);
      setFeatures(updatedValues);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Add Features</span>
      </div>

      <div className={css.card}>
        {isFetchDataError ? (
          <div>Something went wrong</div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={addFeaturesSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue, setFieldTouched }) => (
              <Form>
                <div className={css.group}>
                  <label htmlFor="name">Feature Name*</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Please enter feature name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.group}>
                  <label htmlFor="values">Values*</label>
                  <div className={css.addFeature}>
                    <Field
                      type="text"
                      name="values"
                      id="values"
                      placeholder="Please enter a value"
                      value={featureValue}
                      onChange={(e) => setFeatureValue(e.target.value)}
                    />
                    <Button
                      className="border-1 border-[#3784fb] text-[#3784fb]"
                      variant="outline"
                      type="button"
                      onClick={HandleAddFeature}
                    >
                      Add
                    </Button>
                  </div>
                  {isFeatureError && (
                    <div className={css.inputError}>
                      Features cannot be empty
                    </div>
                  )}

                  {/* Render Features  */}

                  <div className={css.features}>
                    {features?.map((feature, index) => (
                      <div key={index} className={css.feature}>
                        <span>{feature}</span>
                        <IoMdClose onClick={() => HandleRemoveFeature(index)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={css.group}>
                  {!isLoadingCategories && (
                    <Select
                      items={data?.categories}
                      isRequired
                      label="Assigned to Sub Categories"
                      variant="bordered"
                      isMultiline={true}
                      selectionMode="multiple"
                      placeholder="Select a Sub Category"
                      labelPlacement="outside"
                      errorMessage={
                        errors.sub_global_category_id
                          ? "You must select a sub category"
                          : ""
                      }
                      isInvalid={errors.sub_global_category_id}
                      selectedKeys={values}
                      radius="sm"
                      classNames={{
                        base: "max-w-xxl",
                        trigger: "min-h-unit-12 py-2",
                      }}
                      name="sub_global_category_id"
                      id="sub_global_category_id"
                      renderValue={(items) => {
                        return (
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <Chip key={item.key}>{item.data.name}</Chip>
                            ))}
                          </div>
                        );
                      }}
                      onChange={(e) => handleSelectionChange(e, setFieldValue)}
                    >
                      {(cat) => (
                        <SelectItem
                          className="bg-white"
                          key={cat.id}
                          textValue={cat.name}
                          value={cat.id}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-7 w-7 rounded-sm">
                              <Avatar
                                alt={cat?.name}
                                className="flex-shrink-0"
                                size="sm"
                                radius="sm"
                                showFallback
                                fallback={<FaCamera size={17} />}
                                src={
                                  import.meta.env
                                    .VITE_STORE_SUB_GLOBAL_CATEGORIES +
                                  cat.image
                                }
                              />
                            </div>

                            <div className="flex flex-col">
                              <span className="text-small">{cat?.name}</span>
                              <span className="text-tiny text-default-400">
                                {cat?.global_category?.name}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
                </div>

                <div className={css.button}>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-3.5 mt-2 space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader width={15} /> <span>Add Feature</span>
                      </>
                    ) : (
                      "Add Feature"
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
};

export default AddFeatures;
