import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Label,
  UncontrolledTooltip,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import { Info } from 'react-feather';
import InputPasswordToggle from '@components/input-password-toggle';
import PasswordStrengthBar from 'react-password-strength-bar';
import { validations } from '../../utility/Utils';
import theme from '../../configs/themeVariables';
import { PasswordStrengthBarWrap } from '../auth/style';
import { resetPassword } from '../../redux/actions/authActions';
import { selectAuthLoading } from '../../redux/selectors/authSelectors';

const ResetPasswordModal = ({ modal, toggleModal }) => {
  const dispatch = useDispatch();

  const [score, setScore] = useState(0);
  const isLoading = useSelector(selectAuthLoading);

  const schema = yup.object().shape({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: validations.newPassword.required('New Password is required'),
    cnfPassword: validations.confirmPassword.required('Please Re-type your password'),
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
      oldPassword: '',
      newPassword: '',
      cnfPassword: '',
    },
  });

  const onSuccess = () => {
    toggleModal();
  };

  const onSubmit = (data) => {
    const { oldPassword, newPassword } = data;
    dispatch(resetPassword({ current_password: oldPassword, new_password: newPassword }, onSuccess));
  };

  const oldPassword = watch('oldPassword');
  const newPassword = watch('newPassword');
  const cnfPassword = watch('cnfPassword');

  const onChangeScore = (s) => {
    setScore(s);
  };
  const scoreColors = {
    0: 'red',
    1: 'red',
    2: 'orange',
    3: 'blue',
    4: 'green',
  };

  const getColorName = (s) => scoreColors[s] || '';

  return (
    <Modal isOpen={modal} contentClassName="custom-reset-password-modal-style" className="modal-dialog-centered ">
      <ModalHeader toggle={toggleModal} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="px-3">
            <h2 className="fw-bold font-large-1 text-center mb-3">Reset Password</h2>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="firstName">
                  Old Password
                </Label>
                <Controller
                  className="input-group-merge"
                  id="oldPassword"
                  type="oldPassword"
                  name="oldPassword"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      {...field}
                      value={field.value || ''} // Set a default value for the input
                      className="input-group-merge"
                      id="oldPassword"
                      placeholder="Enter your old password"
                    />
                  )}
                />
                {errors.oldPassword && <FormFeedback>{errors.oldPassword.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="firstName">
                  New Password
                </Label>
                <Info size={16} color={theme.infoIcon} id="password-info" className="ms-25" />
                <UncontrolledTooltip placement="right" target="password-info">
                  <p className="m-0 text-start">
                    Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one
                    special case character
                  </p>
                </UncontrolledTooltip>
                <Controller
                  className="input-group-merge"
                  id="newPassword"
                  placeholder="Enter your new password"
                  type="newPassword"
                  name="newPassword"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      {...field}
                      value={field.value || ''}
                      className="input-group-merge"
                      id="newPassword"
                      placeholder="Enter your new password"
                    />
                  )}
                />
                {newPassword && (
                  <PasswordStrengthBarWrap>
                    <PasswordStrengthBar
                      className={`password-meter ${getColorName(score)}`}
                      scoreWords={[
                        'Password strength: Weak',
                        'Password strength: Weak',
                        'Password strength: Fair',
                        'Password strength: Good',
                        'Password strength: Strong',
                      ]}
                      shortScoreWord="Too short"
                      password={newPassword}
                      onChangeScore={onChangeScore}
                    />
                  </PasswordStrengthBarWrap>
                )}
                {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="firstName">
                  Confirm New Password
                </Label>
                <Controller
                  className="input-group-merge"
                  id="cnfPassword"
                  type="cnfPassword"
                  name="cnfPassword"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      {...field}
                      value={field.value || ''}
                      className="input-group-merge"
                      id="cnfPassword"
                      placeholder="Confirm your new password"
                    />
                  )}
                />
                {errors.cnfPassword && <FormFeedback>{errors.cnfPassword.message}</FormFeedback>}
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pb-1">
            <Button color="primary" type="button" className="me-2" outline onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={!oldPassword || !newPassword || !cnfPassword || isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Save'}
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;

ResetPasswordModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

ResetPasswordModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
