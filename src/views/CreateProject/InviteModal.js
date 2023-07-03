import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Input,
  FormFeedback,
  Col,
  InputGroup,
  Spinner,
} from 'reactstrap';
import '../custom-styles.scss';
import { inviteTalents } from '../../redux/actions/createProjectActions';
import { inviteTalentsLoading } from '../../redux/selectors/createProjectSelectors';

const InviteModal = ({ modal, toggleModal }) => {
  const AccountDetailsSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AccountDetailsSchema),
    defaultValues: {
      email: '',
    },
  });

  const dispatch = useDispatch();

  const inviteTalentsIsLoading = useSelector(inviteTalentsLoading);

  const onSuccess = () => {
    toggleModal();
  };

  const onSubmit = (data) => {
    dispatch(inviteTalents('6493e94477c47b3356cd1547', { emails: [data.email] }, onSuccess));
  };

  const [copied, setCopied] = useState(false);

  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <div className="d-flex flex-column px-3">
          <h2 className="fw-bold font-large-1 text-center mb-2">Invite</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <Row>
              <Col sm="12" md="12" lg="12">
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter email ID" invalid={errors.email && true} />
                  )}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="divider">
              <div className="divider-text">Or</div>
            </div>
            <InputGroup>
              <Input value="Lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet" />
              <CopyToClipboard
                onCopy={() => setCopied(true)}
                text="Lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet"
              >
                <Button color="primary" type="button" disabled={copied}>
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </Button>
              </CopyToClipboard>
            </InputGroup>
            <div className="d-flex justify-content-end">
              <Button color="primary" type="submit" className="mb-1 mt-3" disabled={!isValid || inviteTalentsIsLoading}>
                {inviteTalentsIsLoading ? <Spinner size="sm" /> : <>Send Invite</>}
              </Button>
            </div>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default InviteModal;

InviteModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

InviteModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
