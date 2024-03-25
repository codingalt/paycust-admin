import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./SubGlobalCategories.module.scss";
import { addSubGlobalCategorySchema } from "@/utils/validation/StoreValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { FiUploadCloud } from "react-icons/fi";
import {
  useGetFeaturesQuery,
  useGetGlobalCategoriesQuery,
  useGetSubGlobalCategoryByIdQuery,
  useUpdateSubGlobalCategoryMutation,
} from "@/services/api/customer/store/storeCategoriesApi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import {
  useGetStoreSizesQuery,
  useGetStoreWeightsQuery,
} from "@/services/api/customer/store/storeSizesWeightsApi";

const EditSubGlobalCategory = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [sizes, setSizes] = useState(null);
  const [weights, setWeights] = useState(null);
  const [brands, setBrands] = useState(null);
  const [featureValues, setFeatureValues] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
    global_category_id: "",
    features: [],
    brands: [],
    sizes: [],
    weights: [],
  });

  const {
    data: fetchedData,
    isLoading: isLoadingCategoryData,
    error: isFetchDataError,
  } = useGetSubGlobalCategoryByIdQuery(id);

  useEffect(() => {
    if (fetchedData) {
      setInitialValues((prevVal) => ({
        ...prevVal,
        name: fetchedData?.category?.name,
        image: fetchedData?.category?.image,
        global_category_id: parseInt(
          fetchedData?.category?.global_category?.id
        ),
        features: fetchedData?.category?.features,
      }));

      let selectedValues = [];
      let selectedSizes = [];
      let selectedWeights = [];
      let selectedBrands = [];

      fetchedData?.category?.features?.map((feature) => {
        selectedValues.push(String(feature.id));
      });

      fetchedData?.category?.sizes?.map((size) => {
        selectedSizes.push(String(size.id));
      });

      fetchedData?.category?.weights?.map((weight) => {
        selectedWeights.push(String(weight.id));
      });

      fetchedData?.category?.brands?.map((brand) => {
        selectedBrands.push(String(brand.id));
      });

      setFeatureValues(selectedValues);
      setSizes(selectedSizes);
      setWeights(selectedWeights);
      setBrands(selectedBrands);
    }
  }, [fetchedData]);

  const [updateSubGlobalCategory, res] = useUpdateSubGlobalCategoryMutation();
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
    formData.append("global_category_id", parseInt(values.global_category_id));

    featureValues.forEach((feature, index) => {
      formData.append("feature_ids[]", feature);
    });

    brands.forEach((brand, index) => {
      formData.append("brands[]", brand);
    });

    sizes.forEach((size, index) => {
      formData.append("sizes[]", size);
    });

    weights.forEach((weight, index) => {
      formData.append("weights[]", weight);
    });

    await updateSubGlobalCategory({ id: id, formData: formData });
  };

  const handleSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setFeatureValues(selectedValues);
    setFieldValue("features", selectedValues);
  };

  const handleSizesSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setSizes(selectedValues);
    setFieldValue("sizes", selectedValues);
  };

  const handleWeightsSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setWeights(selectedValues);
    setFieldValue("weights", selectedValues);
  };

  const handleBrandsSelectionChange = (e, setFieldValue) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");

    setBrands(selectedValues);
    setFieldValue("brands", selectedValues);
  };

  return (
    <div className={css.editWrapper}>
      <div className={css.top}>
        <span>Edit Sub Global Categories</span>
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
            validationSchema={addSubGlobalCategorySchema}
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
                  <label htmlFor="name">Global Category</label>
                  <Field
                    as="select"
                    name="global_category_id"
                    id="global_category_id"
                    disabled={isLoadingCategoryData}
                  >
                    <option value="">Select Global Category</option>
                    {fetchedData?.globalCategories?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="global_category_id"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.group}>
                  <div className="flex flex-col">
                    <div className="flex-1 flex flex-col mb-3">
                      {brands && (
                        <Select
                          items={fetchedData?.brands}
                          label="Brands"
                          variant="bordered"
                          isMultiline={true}
                          selectionMode="multiple"
                          placeholder="Select a Brand"
                          labelPlacement="outside"
                          defaultSelectedKeys={brands}
                          
                          radius="sm"
                          classNames={{
                            base: "max-w-xxl",
                            trigger: "min-h-unit-12 py-2",
                          }}
                          name="brands"
                          id="brands"
                          renderValue={(items) => {
                            return (
                              <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                  <Chip key={item.key}>{item.data.name}</Chip>
                                ))}
                              </div>
                            );
                          }}
                          onChange={(e) =>
                            handleBrandsSelectionChange(e, setFieldValue)
                          }
                        >
                          {(brand) => (
                            <SelectItem
                              className="bg-white"
                              key={brand.id}
                              textValue={brand.name}
                              value={brand.id}
                            >
                              <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {brand?.name}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>
                      )}

                      <ErrorMessage
                        name="sizes"
                        component="div"
                        className={css.inputError}
                      />
                    </div>
                  </div>
                </div>

                <div className={css.group}>
                  <div className="flex flex-col">
                    <div className="flex-1 flex flex-col mb-3">
                      {sizes && (
                        <Select
                          items={fetchedData?.sizes}
                          label="Sizes"
                          variant="bordered"
                          isMultiline={true}
                          selectionMode="multiple"
                          placeholder="Select a Size"
                          labelPlacement="outside"
                          defaultSelectedKeys={sizes}
                          radius="sm"
                          classNames={{
                            base: "max-w-xxl",
                            trigger: "min-h-unit-12 py-2",
                          }}
                          name="sizes"
                          id="sizes"
                          renderValue={(items) => {
                            return (
                              <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                  <Chip key={item.key}>{item.data.name}</Chip>
                                ))}
                              </div>
                            );
                          }}
                          onChange={(e) =>
                            handleSizesSelectionChange(e, setFieldValue)
                          }
                        >
                          {(size) => (
                            <SelectItem
                              className="bg-white"
                              key={size.id}
                              textValue={size.name}
                              value={size.id}
                            >
                              <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {size?.name}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>
                      )}

                      <ErrorMessage
                        name="sizes"
                        component="div"
                        className={css.inputError}
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      {weights && (
                        <Select
                          items={fetchedData?.weights}
                          label="Weights"
                          variant="bordered"
                          isMultiline={true}
                          selectionMode="multiple"
                          placeholder="Select a Weight"
                          labelPlacement="outside"
                          defaultSelectedKeys={weights}
                          radius="sm"
                          classNames={{
                            base: "max-w-xxl",
                            trigger: "min-h-unit-12 py-2",
                          }}
                          name="weights"
                          id="weights"
                          renderValue={(items) => {
                            return (
                              <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                  <Chip key={item.key}>{item.data.name}</Chip>
                                ))}
                              </div>
                            );
                          }}
                          onChange={(e) =>
                            handleWeightsSelectionChange(e, setFieldValue)
                          }
                        >
                          {(weight) => (
                            <SelectItem
                              className="bg-white"
                              key={weight.id}
                              textValue={weight.name}
                              value={weight.id}
                            >
                              <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {weight?.name}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>
                      )}

                      <ErrorMessage
                        name="weights"
                        component="div"
                        className={css.inputError}
                      />
                    </div>
                  </div>
                </div>

                <div className={css.group}>
                  {featureValues && (
                    <Select
                      items={fetchedData?.features}
                      label="Features"
                      variant="bordered"
                      isMultiline={true}
                      selectionMode="multiple"
                      placeholder="Select a Feature"
                      labelPlacement="outside"
                      defaultSelectedKeys={featureValues}
                      radius="sm"
                      classNames={{
                        base: "max-w-xxl",
                        trigger: "min-h-unit-12 py-2",
                      }}
                      name="features"
                      id="features"
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
                      {(feature) => (
                        <SelectItem
                          className="bg-white"
                          key={feature.id}
                          textValue={feature.name}
                          value={feature.id}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-7 w-7 rounded-sm">
                              <Avatar
                                alt={feature?.name}
                                className="flex-shrink-0"
                                size="sm"
                                radius="sm"
                                showFallback
                                fallback={<FaCamera size={17} />}
                                src={
                                  import.meta.env
                                    .VITE_STORE_SUB_GLOBAL_CATEGORIES +
                                  feature.image
                                }
                              />
                            </div>

                            <div className="flex flex-col">
                              <span className="text-small">
                                {feature?.name}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
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

export default EditSubGlobalCategory;
