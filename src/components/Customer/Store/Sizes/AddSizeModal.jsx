import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addSizesSchema } from "@/utils/validation/StoreValidation";
import css from "./Sizes.module.scss";
import { useAddStoreSizeMutation } from "@/services/api/customer/store/storeSizesWeightsApi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";

const AddSizeModal = ({ isOpen, onOpen, onOpenChange }) => {
    const [name, setName] = useState("");
    const [addSize, res] = useAddStoreSizeMutation();
    const {isLoading, error, isSuccess} = res;

    useMemo(()=>{
        if(error){
            toastError("Uh oh! Something went wrong")
        }
    },[error]);

    useMemo(()=>{
        if(isSuccess){
            onOpenChange();
            toastSuccess("Size was created successfully");
        }
    },[isSuccess]);

    const initialValues = {
        name: ""
    }

    const handleSubmit = async(values, {resetForm})=>{
        console.log(values);

        await addSize({name: name});
    }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Size</ModalHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={addSizesSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form>
                  <ModalBody>
                    <Input
                      type="text"
                      autoFocus
                      isRequired
                      label="Size Name"
                      placeholder="Enter size name"
                      variant="bordered"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => {setName(e.target.value); setFieldValue("name", e.target.value)}}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css.inputError}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button disabled={isLoading} type="button" color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button disabled={isLoading} color="primary" type="submit">
                      {isLoading ? "Saving Changes.." : "Save Changes"}
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddSizeModal;
