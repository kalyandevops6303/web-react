import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import { Button, CardText, Form, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextEditorContainer } from '../CreateProject/style';
import { EditContractWrap } from './style';

const EditContractModal = ({ setDocumentData, modal, toggleModal, data }) => {
  const ProjectDetailsSchema = yup.object().shape({
    contractDetails: yup.string().required('Contract details is required'),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProjectDetailsSchema),
    defaultValues: {
      contractDetails: data,
    },
  });

  const onSubmit = (formData) => {
    const { contractDetails } = formData;
    setDocumentData(contractDetails);
    toggleModal();
  };

  return (
    <Modal
      contentClassName="custom-modal-project-details"
      isOpen={modal}
      toggle={toggleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />

      <ModalBody>
        <EditContractWrap>
          <CardText className="modal-title-edit">Edit Standard Contract</CardText>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="contractDetails"
              control={control}
              render={({ field }) => (
                <TextEditorContainer>
                  <ReactQuill {...field} theme="snow" placeholder="Add background and requirements" />
                </TextEditorContainer>
              )}
            />
            {errors.contractDetails && <FormFeedback>{errors.contractDetails.message}</FormFeedback>}
            <div className="d-flex gap-1 mt-3 justify-content-end">
              <Button outline color="primary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </EditContractWrap>
      </ModalBody>
    </Modal>
  );
};

EditContractModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
  data: PropTypes.object,
  setDocumentData: PropTypes.func, // Add this prop if you want to set document data
};

EditContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setDocumentData: () => {}, // Add this default prop if you want to set document data
};

export default EditContractModal;
