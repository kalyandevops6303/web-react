import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { DateTime } from 'luxon';
import { Button, CardText, Form, FormFeedback, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextEditorContainer } from '../CreateProject/style';
import { EditContractWrap } from './style';
import { updateContract } from '../../redux/actions/projectDetailsAction';
import ShowToastMessage from '../../@core/components/toast';

const EditContractModal = ({ docType, project_id, setDocumentData, modal, toggleModal, data }) => {
  const ProjectDetailsSchema = yup.object().shape({
    contractDetails: yup.string().required('Contract details is required'),
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projectDetails.updateContractLoading);
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
  const isContractView = docType === 'CONTRACT';

  const onSubmit = (formData) => {
    const { contractDetails } = formData;
    const trimmedContent = contractDetails.replace(/<\/?[^>]+(>|$)/g, '').trim();
    if (trimmedContent === '') {
      ShowToastMessage('error', 'Contract cannot be blank');
    } else {
      const onSuccess = () => {
        setDocumentData(contractDetails);
        toggleModal();
      };
      dispatch(
        updateContract({
          project_id,
          doc_type: docType,
          validity: DateTime.now().plus({ months: 1 }).toFormat('dd-MM-yyyy'),
          onSuccess,
          data: contractDetails,
        }),
      );
    }
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
          <CardText className="modal-title-edit">Edit Standard {isContractView ? 'Contract' : 'NDA'}</CardText>
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
              <Button disabled={isLoading} color="primary" type="submit">
                {isLoading ? <Spinner size="sm" /> : 'Sign & Send'}
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
  docType: PropTypes.string,
  project_id: PropTypes.string,
};

EditContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setDocumentData: () => {}, // Add this default prop if you want to set document data
  docType: '',
  project_id: '',
};

export default EditContractModal;
