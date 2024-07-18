import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Button, Spinner, Form, Label, FormFeedback, Input } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

const AddDelegateModal = ({ modal, toggleModal }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = () => {
    // Add delegate logic here
    toggleModal();
  };
  const isLoading = !!errors?.email; // TODO: this should be computed from store

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={isLoading ? null : toggleModal} />
      <ModalBody className="py-0 px-5">
        <div className="d-flex flex-column justify-content-center align-items-center px-2">
          <div>
            <h1 className="mb-1">Add Delegate</h1>
          </div>
          <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <Label className="form-label text-muted" for="email">
                Delegate Email
              </Label>

              <Controller
                type="email"
                id="email"
                name="email"
                placeholder="Enter email ID"
                autoFocus
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''} // Set a default value for the input
                    placeholder="Enter email ID"
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
            </div>
            <p className="text-muted">
              <strong>Note: </strong>
              An invitation link will be sent to the above mention email id.
            </p>
            <div className="d-flex w-100 justify-content-end mb-3 mt-1">
              <Button color="primary" type="submit" disabled>
                {isLoading ? <Spinner size="sm" /> : 'Send Invite'}
              </Button>
            </div>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddDelegateModal;

AddDelegateModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

AddDelegateModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
