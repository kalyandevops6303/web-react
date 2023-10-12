import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { userOnboarding } from '../../../../utility/constants/Constant';

import { saveCheckpointComplete } from '../../../../redux/actions/talentOnboardingActions';
import AccountCreatedModal from '../../AccountCreatedModal';
import { getPaymentDetails, savePaymentDetails, updatePaymentDetails } from '../../../../redux/actions/paymentActions';

// eslint-disable-next-line react/prop-types
const Step1 = ({ setStep }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [isWorkingInUS, setIsWorkingInUS] = useState(false);
  const [taxUserType, setTaxUserType] = useState('NON_US');
  const [isUserExists, setIsUserExists] = useState(false);

  const paymentDetailsLoading = useSelector((state) => state.PaymentDetails?.loading);

  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      if (res?.created_at) setIsUserExists(true);
      if (res?.is_working_in_us) {
        setIsWorkingInUS(true);
      }
      if (res?.tax_user_type) {
        setTaxUserType(res?.tax_user_type);
      }
    }
  };

  useEffect(() => {
    dispatch(getPaymentDetails(onGetPaymentDetailsSuccess));
  }, []);

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/social-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const handlePrePaymentChange = (e) => {
    setTaxUserType(e.target.name);
  };

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const handleWorkOptionChange = (e) => {
    if (e.target.name === 'in_us') setIsWorkingInUS(true);
    else setIsWorkingInUS(false);
  };

  const onSuccess = () => {
    setStep(2);
  };

  const handleNextClick = (e) => {
    if (taxUserType === 'STUDENT' || (taxUserType === 'NON_US' && isWorkingInUS)) {
      // email support
      e.preventDefault();
      return;
    }

    if (location?.state?.isEditing || isUserExists) {
      const newData = {
        talent_info: {
          tax_user_type: taxUserType,
          is_working_in_us: isWorkingInUS,
        },
      };

      dispatch(updatePaymentDetails(newData, onSuccess));
    } else {
      const newData = {
        talent_info: {
          tax_user_type: taxUserType,
          is_working_in_us: isWorkingInUS,
        },
      };
      dispatch(savePaymentDetails(newData, onSuccess));
    }
  };

  const onSkipSuccess = () => {
    if (location?.state?.isEditing) {
      navigate('/dashboard');
    } else {
      setAccountCreatedModal(true);
    }
  };

  const onSkipClick = () => {
    if (location?.state?.isEditing) {
      navigate('/dashboard');
    } else {
      dispatch(saveCheckpointComplete(onSkipSuccess));
    }
  };

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
      <h2 className="m-0 mt-1 mb-2">STEP 1 - Tax Situation Assessment</h2>
      <Form>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">Pre-Payment Set Up</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <h5 className="m-0 mt-1 mb-1 fs-5">Select from below</h5>
            <div className="d-flex">
              <Col className="d-flex gap-50">
                <Input type="radio" checked={taxUserType === 'US'} name="US" onChange={handlePrePaymentChange} />
                <div className="w-75">US Person - Permeant residents or Citizens with US Tax Identification</div>
              </Col>
              <Col className="d-flex gap-50">
                <Input
                  type="radio"
                  name="NON_US"
                  checked={taxUserType === 'NON_US'}
                  onChange={handlePrePaymentChange}
                />
                <div className="w-75">
                  Non-US Persons with no US Tax Identification studying / working outside the US
                </div>
              </Col>
              <Col className="d-flex gap-50">
                <Input
                  type="radio"
                  name="STUDENT"
                  checked={taxUserType === 'STUDENT'}
                  onChange={handlePrePaymentChange}
                />
                <div className="w-75">All other tax situations</div>
              </Col>
            </div>
          </CardBody>
        </Card>
        {taxUserType === 'STUDENT' || taxUserType === 'US' ? null : (
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">Working</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody className="d-flex">
              <div className="d-flex" style={{ width: '65%' }}>
                <Col className="d-flex align-items-center gap-50">
                  <Input type="radio" name="in_us" checked={isWorkingInUS} onChange={handleWorkOptionChange} />
                  <div>Working in the US</div>
                </Col>
                <Col className="d-flex align-items-center gap-50">
                  <Input type="radio" name="outside_us" checked={!isWorkingInUS} onChange={handleWorkOptionChange} />
                  <div>Working outside the US</div>
                </Col>
              </div>
            </CardBody>
          </Card>
        )}
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip</span>
              <ChevronRight size={14} />
            </Button>
            <Button color="primary" onClick={handleNextClick}>
              {paymentDetailsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">
                    {taxUserType === 'STUDENT' || (taxUserType === 'NON_US' && isWorkingInUS)
                      ? 'Email Support Team'
                      : 'STEP 2 - Taxpayer Identification'}
                  </span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Step1;
