import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./Features.module.scss";
import { addSubGlobalCategorySchema } from "@/utils/validation/StoreValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import {
  useGetFeatureByIdQuery,
  useGetSubGlobalCategoriesQuery,
  useUpdateFeaturesMutation,
} from "@/services/api/customer/store/storeCategoriesApi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const EditFeatures = () => {
  const { id } = useParams();
  const [values, setValues] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    values: [],
    sub_global_category_id: "",
  });

  const { data: fetchedData, isLoading: isLoadingCategoryData } =
    useGetFeatureByIdQuery(id);
  const {
    data,
    isLoading: isLoadingSubGlobalCategories,
    error: isFetchDataError,
  } = useGetSubGlobalCategoriesQuery();

  useEffect(() => {
    if (fetchedData) {
      setInitialValues((prevVal) => ({
        ...prevVal,
        name: fetchedData?.features?.name,
      }));

      let selectedValues = [];
      let selectedFeatures = [];

        fetchedData?.features?.categories?.map((cat) => {
          selectedValues.push(String(cat.id));
        });
        setValues(selectedValues);

        fetchedData?.features?.values?.map((feat) => {
          selectedFeatures.push(String(feat.value));
        });

        setFeatures(selectedFeatures);
    }
  }, [fetchedData]);

  const [updateFeatures, res] = useUpdateFeaturesMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (error) {
      toastError("Uh oh! Something went wrong.");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Features updated successfully");
    }
  }, [isSuccess]);

  const handleSubmit = async (val, { resetForm }) => {
    const finalValues = {
      name: val.name,
      values: features,
      // sub_global_categories_ids: values,
    };
    await updateFeatures({ id: id, data: finalValues });
  };

  const handleSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setValues(selectedValues);
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
    <div className={css.editWrapper}>
      <div className={css.top}>
        <span>Edit Features</span>
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
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, setFieldValue, touched }) => (
              <Form>
                <div className={css.group}>
                  <label htmlFor="name">Feature Name</label>
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
                  <label htmlFor="values">Values*</label>
                  <div className={css.addFeature}>
                    <Field
                      type="text"
                      name="values"
                      id="values"
                      placeholder="Please enter feature name"
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

                {/* <div className={css.group}>
                  {!isLoadingSubGlobalCategories && values && (
                    <Select
                      items={data?.categories}
                      label="Assigned to Sub Categories"
                      variant="bordered"
                      isMultiline={true}
                      selectionMode="multiple"
                      placeholder="Select a Sub Category"
                      labelPlacement="outside"
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
                </div> */}

                <div className={css.button}>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-4 mt-2 space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader width={15} /> <span>Update Features</span>
                      </>
                    ) : (
                      "Update Features"
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

export default EditFeatures;
