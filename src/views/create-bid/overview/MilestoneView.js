import React from 'react';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledAccordion,
  UncontrolledTooltip,
} from 'reactstrap';
import classNames from 'classnames';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, ChevronRight, Info, Plus } from 'react-feather';
import { MilestoneSectionWrapper } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';

const MilestoneView = () => {
  const MilestoneDetailsSchema = yup.object().shape({
    estimatedStartDate: yup.date().typeError('Start date is required').required('Start date is required'),
    milestones: yup
      .array()
      .of(
        yup.object().shape({
          duration: yup.number().required('Duration is required'),
          talentCost: yup.number().required('Talent cost is required'),
          name: yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be 50 characters or less')
            .required('Name is required'),
          description: yup
            .string()
            .min(2, 'Description must be at least 2 characters')
            .max(50, 'Description must be 50 characters or less')
            .optional(),
          deliverables: yup.array().of(yup.string()),
        }),
      )
      .min(1, 'At least one milestone should be added'),
  });

  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(MilestoneDetailsSchema),
    defaultValues: {
      milestones: [
        {
          duration: '',
          talentCost: '',
          name: '',
          description: '',
          deliverables: [''],
        },
      ],
    },
  });

  const {
    fields: milestonesFields,
    append: milestonesAppend,
    remove: milestonesRemove,
    update: milestonesUpdate,
  } = useFieldArray({
    control,
    name: 'milestones',
  });

  const onSubmit = () => {
    trigger();
  };

  const handleAddDeliverable = (milestoneIndex, defaultValue = '') => {
    const milestoneDeliverables = getValues('milestones')[milestoneIndex].deliverables;

    const newData = {
      ...getValues('milestones')[milestoneIndex],
      deliverables: [...milestoneDeliverables, defaultValue],
    };

    if (milestoneDeliverables.every((deliverable) => deliverable.trim() !== '')) {
      milestonesUpdate(milestoneIndex, newData);
    } else {
      ShowToastMessage(ERROR, 'Please fill all deliverables before adding a new one.');
    }
  };

  const handleRemoveDeliverable = (milestoneIndex, deliverableIndex) => {
    const milestoneDeliverables = getValues('milestones')[milestoneIndex].deliverables;
    const newDeliverables = milestoneDeliverables.filter((_, index) => index !== deliverableIndex);
    const newData = {
      ...getValues('milestones')[milestoneIndex],
      deliverables: [...newDeliverables],
    };
    milestonesUpdate(milestoneIndex, newData);
  };

  const handleAddMilestone = () => {
    const allMilestonesValid = getValues('milestones').every(
      (milestone) =>
        milestone.duration.trim() !== '' && milestone.talentCost.trim() !== '' && milestone.name.trim() !== '',
    );

    if (allMilestonesValid) {
      milestonesAppend({ name: '', description: '', duration: '', talentCost: '', deliverables: [''] });
    } else {
      ShowToastMessage(ERROR, 'Please fill all required fields for existing milestones before adding a new one.');
    }
  };

  return (
    <MilestoneSectionWrapper className="mt-2">
      <Card className="gray-card-wrapper">
        <CardHeader className="p-0">
          <div className="w-100 pt-2 pb-1 px-1 gray-border-container">
            <h5 className="m-0 font-medium-1">
              Create milestones that will make it easier to work on and track this project
            </h5>
          </div>
        </CardHeader>
        <CardBody className="pt-2 pb-0">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card className="white-card-bg">
              <CardBody>
                <Row className="d-flex justify-content-between">
                  <Col sm="12" md="12" lg="3" className="ps-50">
                    <div>
                      <Label className="form-label" for="estimatedStartDate">
                        Estimated Start Date<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        control={control}
                        id="estimatedStartDate"
                        name="estimatedStartDate"
                        render={({ field }) => (
                          <Flatpickr
                            {...field}
                            placeholder="Select start date"
                            options={{
                              minDate: 'today',
                              dateFormat: 'd-m-Y',
                            }}
                            className={classNames('form-control', {
                              'is-invalid': errors && errors.estimatedStartDate,
                            })}
                          />
                        )}
                      />
                      {errors.estimatedStartDate && <FormFeedback>{errors.estimatedStartDate.message}</FormFeedback>}
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" className="d-flex justify-content-between me-1">
                    <div>
                      <Label className="form-label">Estimated Duration</Label>
                      <p className="fw-bold font-medium-1 text-end mt-50">6w</p>
                    </div>
                    <div>
                      <Label className="form-label me-2">Total Cost</Label>
                      <p className="fw-bold font-medium-1 text-end me-2 mt-50">$ 5000</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <UncontrolledAccordion className="mb-2">
              {milestonesFields.map((milestone, milestoneIndex) => (
                <Card className="white-card-bg" key={milestone.id}>
                  <CardBody className="p-0">
                    <AccordionItem className="py-0">
                      <AccordionHeader targetId={milestoneIndex + 1} className="py-0">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <p className="fw-bold font-medium-1 m-0 ms-25">Milestone {milestoneIndex + 1}</p>
                          <Row className="d-flex justify-content-end">
                            <Col sm="12" md="12" lg="3">
                              <div className="me-2">
                                <Label className="fw-normal form-label" for="duration">
                                  Duration
                                </Label>
                                <Controller
                                  id={`milestones[${milestoneIndex}].duration`}
                                  name={`milestones[${milestoneIndex}].duration`}
                                  control={control}
                                  invalid={
                                    errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].duration &&
                                    true
                                  }
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Enter"
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].duration &&
                                        true
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                            <Col sm="12" md="12" lg="4">
                              <div>
                                <Label className="fw-normal form-label me-2" for="talentCost">
                                  Talent Cost
                                </Label>
                                <Controller
                                  id={`milestones[${milestoneIndex}].talentCost`}
                                  name={`milestones[${milestoneIndex}].talentCost`}
                                  control={control}
                                  invalid={
                                    errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].talentCost &&
                                    true
                                  }
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Enter"
                                      className="w-75"
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].talentCost &&
                                        true
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId={milestoneIndex + 1}>
                        <Row>
                          <Col sm="12" md="12" lg="6">
                            <Card>
                              <CardBody>
                                <p className="fw-bold font-medium-1 text-secondary mb-2">Milestone Details</p>
                                <Label className="form-label" for="name">
                                  Milestone Name<span className="label-asterisk">*</span>
                                </Label>
                                <Controller
                                  id={`milestones[${milestoneIndex}].name`}
                                  name={`milestones[${milestoneIndex}].name`}
                                  control={control}
                                  invalid={
                                    errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].name &&
                                    true
                                  }
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Enter name"
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].name &&
                                        true
                                      }
                                    />
                                  )}
                                />
                                {/* {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>} */}
                                <div className="d-flex mt-2">
                                  <Label className="form-label" for="description">
                                    Description
                                  </Label>
                                  <Info size={18} color={theme.infoIcon} id="logo-info" className="ms-50" />
                                </div>
                                <UncontrolledTooltip placement="right" target="logo-info">
                                  <p className="m-0">Give description in 60 characters or less</p>
                                </UncontrolledTooltip>
                                <Controller
                                  id={`milestones[${milestoneIndex}].description`}
                                  name={`milestones[${milestoneIndex}].description`}
                                  control={control}
                                  invalid={
                                    errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].description &&
                                    true
                                  }
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      type="textarea"
                                      rows="4"
                                      placeholder="Enter description"
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].description &&
                                        true
                                      }
                                    />
                                  )}
                                />
                                {/* {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>} */}
                              </CardBody>
                            </Card>
                          </Col>
                          <Col sm="12" md="12" lg="6">
                            <Card>
                              <CardBody>
                                <p className="fw-bold font-medium-1 text-secondary mb-2">Deliverable Details</p>
                                {milestone.deliverables.map((item, index) => (
                                  <Row key={item.id} className="mb-1 d-flex align-items-center">
                                    <Col sm="12" md="12" lg="8">
                                      <Controller
                                        id={`milestones[${milestoneIndex}].deliverables[${index}]`}
                                        name={`milestones[${milestoneIndex}].deliverables[${index}]`}
                                        control={control}
                                        invalid={
                                          errors &&
                                          errors.milestones &&
                                          errors.milestones.length > 0 &&
                                          errors.milestones[milestoneIndex] &&
                                          errors.milestones[milestoneIndex].deliverables &&
                                          errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                          errors.milestones[milestoneIndex].deliverables[index] &&
                                          true
                                        }
                                        render={({ field }) => (
                                          <Input
                                            {...field}
                                            placeholder="Enter deliverable"
                                            invalid={
                                              errors &&
                                              errors.milestones &&
                                              errors.milestones.length > 0 &&
                                              errors.milestones[milestoneIndex] &&
                                              errors.milestones[milestoneIndex].deliverables &&
                                              errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                              errors.milestones[milestoneIndex].deliverables[index] &&
                                              true
                                            }
                                          />
                                        )}
                                      />
                                      {errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].deliverables &&
                                        errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                        errors.milestones[milestoneIndex].deliverables[index] && (
                                          <FormFeedback>
                                            {errors.milestones[milestoneIndex].deliverables[index] &&
                                              errors.milestones.deliverables[index].message}
                                          </FormFeedback>
                                        )}
                                    </Col>
                                    <Col sm="12" md="12" lg="4">
                                      {index !== 0 && (
                                        <Button
                                          type="button"
                                          color="flat-danger"
                                          onClick={() => handleRemoveDeliverable(milestoneIndex, index)}
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </Col>
                                  </Row>
                                ))}
                                <div
                                  className="d-flex align-items-center upload-button cursor-pointer mt-2"
                                  onClick={() => handleAddDeliverable(milestoneIndex)}
                                >
                                  <div className="add-icon-container">
                                    <Plus size={16} color={theme.activeNavPillText} />
                                  </div>
                                  <h5 className="fw-bold">Add Deliverable</h5>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div
                            className="d-flex align-items-center upload-button cursor-pointer"
                            onClick={handleAddMilestone}
                          >
                            <Plus size={16} color={theme.activeNavPillText} />
                            <h5 className="fw-bold">Add Milestone</h5>
                          </div>
                          {milestoneIndex !== 0 && (
                            <Button type="button" color="flat-danger" onClick={() => milestonesRemove(milestoneIndex)}>
                              Remove
                            </Button>
                          )}
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  </CardBody>
                </Card>
              ))}
            </UncontrolledAccordion>
          </Form>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center upload-button cursor-pointer">
          <UploadIconContainer>
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </UploadIconContainer>
          <h5 className="fw-bold">Back</h5>
        </div>
        <Button color="primary" onClick={() => onSubmit()}>
          <span className="me-50">Save & Continue</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </MilestoneSectionWrapper>
  );
};

export default MilestoneView;
