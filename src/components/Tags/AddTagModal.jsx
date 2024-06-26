import React, { useEffect, useState } from "react";
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
import css from "./Tags.module.scss";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { addTagSchema } from "@/utils/validation/CategoryValidation";
import { useAddTagMutation } from "@/services/api/tagsApi";

const AddTagModal = ({ isOpen, onOpen, onOpenChange }) => {
    const [name, setName] = useState("");
    const [addTag, res] = useAddTagMutation();
    const {isLoading, error, isSuccess} = res;

    useEffect(() => {
      if (error) {
        toastError("Uh oh! Something went wrong");
      }
    }, [error]);

    useEffect(()=>{
        if(isSuccess){
            onOpenChange();
            toastSuccess("Tag created successfully");
        }
    },[isSuccess]);

    const initialValues = {
        name: ""
    }

    const handleSubmit = async(values, {resetForm})=>{
        await addTag({name: name});
    }

  return (
    <Modal className="z-[9999] max-w-[85%] md:max-w-md" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Tag</ModalHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={addTagSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form>
                  <ModalBody>
                    <Input
                      type="text"
                      autoFocus
                      isRequired
                      label="Tag Name"
                      placeholder="Enter tag name"
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

export default AddTagModal;
