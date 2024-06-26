import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./Tags.module.scss";
import {
  addTagSchema,
} from "@/utils/validation/CategoryValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useGetTagEditQuery, useUpdateTagMutation } from "@/services/api/tagsApi";

const EditTag = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  const {
    data: fetchedData,
    isLoading: isLoadingTagData,
    error: isFetchDataError,
  } = useGetTagEditQuery(id);

  useEffect(() => {
    if (fetchedData) {
      setInitialValues((prevVal) => ({
        ...prevVal,
        name: fetchedData?.tag?.name,
      }));
    }
  }, [fetchedData]);

  const [updateTag, res] = useUpdateTagMutation();
  const { isLoading, isSuccess, error } = res;

  useEffect(() => {
    if (error) {
      toastError("Uh oh! Something went wrong.");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toastSuccess("Tag updated successfully");
    }
  }, [isSuccess]);

  const handleSubmit = async (values, { resetForm }) => {
    await updateTag({ id: id, data: { name: values.name } });
  };

  return (
    <div className={css.editWrapper}>
      <div className={css.top}>
        <span>Edit Tag</span>
      </div>

      {isFetchDataError ? (
        <div>Something went wrong</div>
      ) : isLoadingTagData ? (
        <div className="w-full h-52 flex items-center ml-32">
          <Loader color={"#000"} width={34} />
        </div>
      ) : (
        <div className={css.addForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={addTagSchema}
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
                    placeholder="Please enter tag name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.inputError}
                  />
                </div>

                <div className={css.button}>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-4 mt-2 space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader width={15} /> <span>Update Tag</span>
                      </>
                    ) : (
                      "Update Tag"
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

export default EditTag;
