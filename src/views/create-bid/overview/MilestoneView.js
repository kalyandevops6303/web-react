import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Label, Row } from 'reactstrap';
import classNames from 'classnames';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { MilestoneSectionWrapper } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';

const MilestoneView = () => {
  const MilestoneDetailsSchema = yup.object().shape({
    estimatedStartDate: yup.date().typeError('Start date is required').required('Start date is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(MilestoneDetailsSchema),
  });

  const onSubmit = () => {};

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
                  <Col sm="12" md="12" lg="3">
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
        <Button color="primary">
          <span className="me-50">Save & Continue</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </MilestoneSectionWrapper>
  );
};

export default MilestoneView;
