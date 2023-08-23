import React from 'react';
import Proptypes from 'prop-types';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import { Button, CardText, Form, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextEditorContainer } from '../CreateProject/style';
import { EditContractWrap } from './style';

const EditContractModal = ({ modal, toggleModal, data }) => {
  const ProjectDetailsSchema = yup.object().shape({
    contractDetails: yup.string().required('Contract details is required'),
  });
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProjectDetailsSchema),
    defaultValues: {
      contractDetails: data,
    },
  });

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
          <Form>
            <Controller
              id="contractDetails"
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
              <Button outline color="primary">
                Cancel
              </Button>
              <Button color="primary">Save</Button>
            </div>
          </Form>
        </EditContractWrap>
      </ModalBody>
    </Modal>
  );
};
EditContractModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

EditContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
export default EditContractModal;
