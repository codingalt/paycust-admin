import React, { useMemo, useState } from "react";
import css from "./AddDeals.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDealSchema } from "@/utils/validation/StoreValidation";
import Loader from "@/components/Loader/Loader";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import UploadImages from "./UploadImages";
import SelectProducts from "./SelectProducts";
import DoneIcon from "@mui/icons-material/Done";
import { useAddStoreDealsMutation } from "@/services/api/customer/store/storeDealsApi";
import { useApiErrorHandling } from "@/hooks/general/useApiErrors";
import { Button } from "@nextui-org/react";
import ApiErrorDisplay from "@/hooks/general/ApiErrorDisplay";

const AddDeals = () => {
  const [placeholder, setPlaceHolder] = useState({
    startDate: moment(new Date()).format("ddd MMM DD, YYYY"),
    endDate: moment(new Date().setMonth(11)).format("ddd MMM DD, YYYY"),
  });
  const [startDate, setStartDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

  const [addDeal, res] = useAddStoreDealsMutation();
  const { isLoading, error, isSuccess } = res;
  const apiErrors = useApiErrorHandling(error);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Deal was published Successfully");
    }
  }, [isSuccess]);

  const initialValues = {
    title: "",
    start_date: "",
    expiry_date: "",
    products: [],
    images: [],
  };

  const handleSubmit = async (valuesForm, { resetForm }) => {
    
    if (valuesForm.products.length === 0) {
      toastError("Please select deals products");
      return;
    }

    if (selectedImages?.length === 0) {
      toastError("Please select deals images");
      return;
    }

    const productTempArr = [];
    valuesForm?.products?.map((item) => {
      productTempArr.push({
        id: item.id,
        actual_price: item.actual_price,
        new_price: item.new_price,
      });
    });

    console.log(productTempArr);

    let formData = new FormData();
    formData.append("title", valuesForm.title);
    formData.append("start_date", valuesForm.start_date);
    formData.append("expiry_date", valuesForm.expiry_date);
    formData.append("products", JSON.stringify(productTempArr));

    // productTempArr?.forEach((product, index) => {
    //   formData.append("products[]", product);
    // });

    selectedImages?.forEach((image, index) => {
      formData.append("images[]", image);
    });

    await addDeal(formData);

    // resetForm({
    //   valuesForm: initialValues,
    // });
  };

  const handleStartDateChange = (newValue, setFieldValue) => {
    setStartDate(newValue);
    setFieldValue("start_date", newValue.startDate);
  };

  const handleExpiryDateChange = (newValue, setFieldValue) => {
    setExpiryDate(newValue);
    setFieldValue("expiry_date", newValue.startDate);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Add Deals</span>
      </div>

      <div className="flex w-full space-x-5">
        <div className={`${css.card} border-1 rounded-lg`}>
          {/* Display Errors  */}
          <ApiErrorDisplay
            apiErrors={apiErrors}
            className="max-w-xl mt-3 mb-3"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={addDealSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue, setFieldTouched }) => (
              <Form>
                <div className={css.group}>
                  <label htmlFor="title">Title*</label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Please enter title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className="flex w-full space-x-8">
                  <div className="flex-1">
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1.5">
                      <label htmlFor="start_date">Start date*</label>
                      <Datepicker
                        value={startDate}
                        onChange={(e) =>
                          handleStartDateChange(e, setFieldValue)
                        }
                        classNames={css.inputWrapper}
                        placeholder={`${placeholder.startDate}`}
                        inputClassName="w-full border rounded-[7px] px-[18px] py-[10px] focus:ring-1 placeholder:text-[15px]"
                        toggleClassName="absolute text-blue-400 rounded-r-lg right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                        displayFormat="ddd MMM DD, YYYY"
                        useRange={false}
                        asSingle={true}
                      />
                      <ErrorMessage
                        name="start_date"
                        component="div"
                        className={css.inputError}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1.5">
                      <label htmlFor="start_date">Expiry date*</label>
                      <Datepicker
                        value={expiryDate}
                        onChange={(e) =>
                          handleExpiryDateChange(e, setFieldValue)
                        }
                        classNames={css.inputWrapper}
                        placeholder={`${placeholder.endDate}`}
                        inputClassName="w-full border rounded-[7px] px-[18px] py-[10px] focus:ring-1 placeholder:text-[15px]"
                        toggleClassName="absolute text-blue-400 rounded-r-lg right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                        displayFormat="ddd MMM DD, YYYY"
                        useRange={false}
                        asSingle={true}
                      />
                      <ErrorMessage
                        name="expiry_date"
                        component="div"
                        className={css.inputError}
                      />
                    </div>
                  </div>
                </div>

                {/* Select Products  */}
                <SelectProducts setFieldValue={setFieldValue} />

                <div className={css.button}>
                  <Button
                    isLoading={isLoading}
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-3.5 mt-5 space-x-2"
                    color="primary"
                  >
                    <DoneIcon /> <span>Publish Deal</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Image Upload  */}
        <UploadImages
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
    </div>
  );
};

export default AddDeals;
