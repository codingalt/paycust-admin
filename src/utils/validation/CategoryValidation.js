import * as Yup from "yup";

export const addCategorySchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  gender: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Gender is Required"),
  image: Yup.mixed().nullable().required("Please Select Category Image"),
});

export const addSubCategorySchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  image: Yup.mixed().nullable().required("Please Select Category Image"),
  category_id: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please Select Global Category"),
});

export const addTagSchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
});

