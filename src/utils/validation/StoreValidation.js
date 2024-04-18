import * as Yup from "yup";

export const addGlobalCategorySchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  image: Yup.mixed().nullable().required("Please Select Category Image"),
});

export const addSubGlobalCategorySchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  image: Yup.mixed().nullable().required("Please Select Category Image"),
  global_category_id: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please Select Global Category"),
});

export const addFeaturesSchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Feature Name is Required"),
  sub_global_category_id: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please Select Sub Category"),
});

export const addSizesSchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
});

export const addDealSchema = Yup.object({
  title: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Title is Required"),
  start_date: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Start date is Required"),
  expiry_date: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Expiry date is Required"),
});
