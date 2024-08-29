import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import '../custom-styles.scss';
import * as yup from 'yup';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  FormFeedback,
  Input,
  Button,
  Spinner,
  Label,
  CardText,
  CardTitle,
} from 'reactstrap';
import { SupportModalWrapper } from './style';
import { getMissingName, returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
import theme from '../../configs/themeVariables';
import { getIssueTypeService } from '../../services/supportServices';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';
import { customerSupport } from '../../redux/actions/supportActions';
import { CUSTOMER_SUPPORT_TYPES, SUPPORT_EMAIL } from '../../utility/constants/Constant';

const ReportModal = ({ modal, issueType, toggleModal, onSuccess, reportTargetName, reportTargetImage, reportTargetDetails }) => {
    console.log(reportTargetName)
//   const isLoading = useSelector((state) => state.support.loading);
  const userData = useSelector(selectSavedUserData);
    const userEmail = userData?.email;
  const CustomerSupportSchema = yup.object().shape({
    reasonOfReport: yup
      .string()
      .min(50, 'Description must be at least 50 characters')
      .max(500, 'You have exeeded char limit of 500')
      .required('Description is required'),
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CustomerSupportSchema),
    defaultValues: {
    reasonOfReport: ''
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const postData = {
      to_email: SUPPORT_EMAIL,
      cc_email: [userEmail],
      reason: values?.reasonOfReport,
    };

    // dispatch(customerSupport({ data: postData, onSuccess }));
  };

  
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      {/* <ModalHeader toggle={isLoading ? null : toggleModal} /> */}
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center mb-2">Report</h2>
        <div className='py-2'>
            <h4>Are you sure you want to report this project?</h4>

            <div className="d-flex mb-25 align-items-center">
            <img
              className="market-place-card-photo me-75"
              src={reportTargetImage}
              alt="avatar"
              width={40}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          <div onClick={(e) => handleNavigate(e)} className="d-flex w-100 align-items-center">
            <div className="flex-grow-1">
              <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                <span>{reportTargetName}</span>
              </CardTitle>
              <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                {reportTargetDetails}
              </CardText>
            </div>
          </div>
        </div>
        </div>
        <SupportModalWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="8">
                <div className="d-flex align-items-center">
                  <CardText className="m-0 me-75 fw-bold">TO: </CardText>{' '}
                  <Input
                    style={{ border: `1px solid ${theme.inputBorder}`, background: theme.inputBackground }}
                    disabled
                    value={SUPPORT_EMAIL}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="8">
                <div className="d-flex align-items-center">
                  <CardText className="m-0 me-75 fw-bold">CC: </CardText>{' '}
                  <Input
                    style={{ border: `1px solid ${theme.inputBorder}`, background: theme.inputBackground }}
                    disabled
                    value={userEmail}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="skill">
                  Enter reason to report
                  <span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="reasonOfReport"
                  name="reasonOfReport"
                  control={control}
                  label="Details"
                  invalid={errors.reasonOfReport && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter details"
                      rows="6"
                      invalid={errors.reasonOfReport && true}
                    />
                  )}
                />
                {errors.reasonOfReport && <FormFeedback>{errors.reasonOfReport.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="danger" type="submit" disabled={!isValid 
            //   || isLoading
                 }>
                {/* {isLoading ? <Spinner size="sm" /> : 'Report'} */}
                Report
              </Button>
            </div>
          </Form>
        </SupportModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default ReportModal;

ReportModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
  issueType: Proptypes.string,
  reportTargetName: Proptypes.string.isRequired,
  reportTargetImage: Proptypes.string,
  reportTargetDetails: Proptypes.string.isRequired,
};

ReportModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
  onSuccess: () => { },
  issueType: '',
  reportTargetImage: ''
};
