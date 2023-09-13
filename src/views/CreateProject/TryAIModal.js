import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Label, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { DisputeFormContainer } from '../disputes/style';
import { createProjectDetailsFromAI, filterAISkills, filterAITools } from '../../redux/actions/createProjectActions';
import { createProjectAILoading } from '../../redux/selectors/createProjectSelectors';

const TryAIModal = ({ modal, toggleModal, onSuccess }) => {
  const dispatch = useDispatch();

  const createProjectAIisLoading = useSelector(createProjectAILoading);

  const QuestionSchema = yup.object().shape({
    description: yup.string().min(2, 'Description must be at least 2 characters').required('is required'),
    What_are_you_trying_to_build: yup
      .string()
      .min(2, 'This field must be at least 2 characters')
      .required('is required'),
    Why_do_you_want_to_build_it: yup
      .string()
      .min(2, 'This field must be at least 2 characters')
      .required('is required'),
    Who_is_going_to_use_it: yup.string().min(2, 'This field must be at least 2 characters').required('is required'),
    features: yup.string().min(2, 'Features must be at least 2 characters').required('is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(QuestionSchema),
  });

  const onAISuccess = (data) => {
    const skillsOptions = data.Tech_Stack;
    const toolsOptions = data.Tools;
    dispatch(filterAISkills(skillsOptions));
    dispatch(filterAITools(toolsOptions));
    onSuccess({
      aiData: data,
    });
    toggleModal();
  };

  const onSubmit = (data) => {
    const { description, What_are_you_trying_to_build, Why_do_you_want_to_build_it, Who_is_going_to_use_it, features } =
      data;

    const reqData = {
      description,
      What_are_you_trying_to_build,
      Why_do_you_want_to_build_it,
      Who_is_going_to_use_it,
      features,
    };

    dispatch(createProjectDetailsFromAI(JSON.stringify(reqData), onAISuccess));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 font-bold text-center">AI Assist</h2>
        <h4 className="mt-2 mb-75">Enter Project Details</h4>
        <p className="mb-2">Tell us some details about your project</p>
        <DisputeFormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" className="mb-1">
                <Label className="form-label" for="description">
                  Short description <span className="label-asterisk text-danger">*</span>
                </Label>
                <Controller
                  id="description"
                  name="description"
                  control={control}
                  invalid={errors.description && true}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="1" invalid={errors.description && true} />
                  )}
                />
                {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" className="mb-1">
                <Label className="form-label" for="What_are_you_trying_to_build">
                  What are you trying to build? <span className="label-asterisk text-danger">*</span>
                </Label>
                <Controller
                  id="What_are_you_trying_to_build"
                  name="What_are_you_trying_to_build"
                  control={control}
                  invalid={errors.What_are_you_trying_to_build && true}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="1" invalid={errors.What_are_you_trying_to_build && true} />
                  )}
                />
                {errors.What_are_you_trying_to_build && (
                  <FormFeedback>{errors.What_are_you_trying_to_build.message}</FormFeedback>
                )}
              </Col>
              <Col sm="12" md="12" className="mb-1">
                <Label className="form-label" for="Why_do_you_want_to_build_it">
                  Why do you want to build it? <span className="label-asterisk text-danger">*</span>
                </Label>
                <Controller
                  id="Why_do_you_want_to_build_it"
                  name="Why_do_you_want_to_build_it"
                  control={control}
                  invalid={errors.Why_do_you_want_to_build_it && true}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="1" invalid={errors.Why_do_you_want_to_build_it && true} />
                  )}
                />
                {errors.Why_do_you_want_to_build_it && (
                  <FormFeedback>{errors.Why_do_you_want_to_build_it.message}</FormFeedback>
                )}
              </Col>
              <Col sm="12" md="12" className="mb-1">
                <Label className="form-label" for="Who_is_going_to_use_it">
                  Who is going to use it? <span className="label-asterisk text-danger">*</span>
                </Label>
                <Controller
                  id="Who_is_going_to_use_it"
                  name="Who_is_going_to_use_it"
                  control={control}
                  invalid={errors.Who_is_going_to_use_it && true}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="1" invalid={errors.Who_is_going_to_use_it && true} />
                  )}
                />
                {errors.Who_is_going_to_use_it && <FormFeedback>{errors.Who_is_going_to_use_it.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12">
                <Label className="form-label" for="features">
                  Features <span className="label-asterisk text-danger">*</span>
                </Label>
                <Controller
                  id="features"
                  name="features"
                  control={control}
                  invalid={errors.features && true}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="2" invalid={errors.features && true} />
                  )}
                />
                {errors.features && <FormFeedback>{errors.features.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end py-1">
              <Button
                outline
                color="primary"
                className="me-2"
                onClick={toggleModal}
                disabled={!isValid || createProjectAIisLoading}
              >
                Back
              </Button>
              <Button color="primary" type="submit" disabled={!isValid || createProjectAIisLoading}>
                {createProjectAIisLoading ? <Spinner size="sm" /> : 'Generate'}
              </Button>
            </div>
          </Form>
        </DisputeFormContainer>
      </ModalBody>
    </Modal>
  );
};

export default TryAIModal;

TryAIModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
};

TryAIModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
};
