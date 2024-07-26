import React, { useEffect } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Button, Spinner, Form, Label, FormFeedback, Input } from 'reactstrap';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { selectDelegateLoading } from '../../redux/selectors/delegateSelectors';
import { inviteDelegate } from '../../redux/actions/delegateActions';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import { formData } from '../../redux/selectors/formDataSelectors';

const AddDelegateForm = React.memo(({ onSubmit, control, errors, emailValue, delegateLoading }) => (
  <Form onSubmit={onSubmit}>
    <div className="mb-2">
      <Label className="form-label text-muted" htmlFor="email">
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
          <Input {...field} value={field.value || ''} placeholder="Enter email ID" invalid={errors.email && true} />
        )}
      />
      {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
    </div>
    <p className="text-muted">
      <strong>Note: </strong>
      An invitation link will be sent to the above mention email id.
    </p>
    <div className="d-flex w-100 justify-content-end mb-3 mt-1">
      <Button color="primary" type="submit" disabled={!emailValue || delegateLoading}>
        {delegateLoading ? <Spinner size="sm" /> : 'Send Invite'}
      </Button>
    </div>
  </Form>
));

AddDelegateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  emailValue: PropTypes.string.isRequired,
  delegateLoading: PropTypes.bool.isRequired,
};

const AddDelegateModal = ({ modal, toggleModal }) => {
  const dispatch = useDispatch();
  const delegateLoading = useSelector(selectDelegateLoading);
  const savedFormData = useSelector(formData);
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      email: savedFormData?.email || '',
    },
  });

  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));

    return () => {
      dispatch(clearAllFormData());
    };
  }, [localFormData]);

  const onSuccess = () => {
    ShowToastMessage(SUCCESS, 'Email with sign up link is shared with delegate successfully.');
    toggleModal();
  };

  const onSubmit = (values) => {
    const { email } = values;
    dispatch(inviteDelegate({ email, onSuccess }));
  };

  const emailValue = watch('email');

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={delegateLoading ? null : toggleModal} />
      <ModalBody className="py-0 px-5">
        <div className="d-flex flex-column justify-content-center align-items-center px-2">
          <div>
            <h1 className="mb-1">Add Delegate</h1>
          </div>
          <AddDelegateForm
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            errors={errors}
            emailValue={emailValue}
            delegateLoading={delegateLoading}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddDelegateModal;

AddDelegateModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
