import React, { useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { userOnboarding } from '../../../../utility/constants/Constant';

import { paymentDetailsSuccess } from '../../../../redux/reducers/PaymentDetails';
import { saveCheckpointComplete } from '../../../../redux/actions/talentOnboardingActions';
import AccountCreatedModal from '../../AccountCreatedModal';

// eslint-disable-next-line react/prop-types
const Step1 = ({ setStep }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);

  const { userType, working } = useSelector((state) => state.PaymentDetails);

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
    dispatch(
      paymentDetailsSuccess({
        value: e.target.name,
        key: 'userType',
      }),
    );
  };

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const handleWorkOptionChange = (e) => {
    dispatch(
      paymentDetailsSuccess({
        value: e.target.name,
        key: 'working',
      }),
    );
  };

  const handleNextClick = (e) => {
    if (userType === 'student') {
      // email support
      e.preventDefault();
      return;
    }
    setStep(2);
  };

  const onSuccess = () => {
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
      dispatch(saveCheckpointComplete(onSuccess));
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
                <Input
                  type="radio"
                  checked={userType === 'us_person'}
                  name="us_person"
                  onChange={handlePrePaymentChange}
                />
                <div className="w-75">US Person - Residents or Citizens with US Tax Identification</div>
              </Col>
              <Col className="d-flex gap-50">
                <Input
                  type="radio"
                  name="non_us_person"
                  checked={userType === 'non_us_person'}
                  onChange={handlePrePaymentChange}
                />
                <div className="w-75">
                  Non-US Persons with no US Tax Identification studying / working outside the US
                </div>
              </Col>
              <Col className="d-flex gap-50">
                <Input type="radio" name="student" checked={userType === 'student'} onChange={handlePrePaymentChange} />
                <div className="w-75">Student applying as a US or Non-US Entity</div>
              </Col>
            </div>
          </CardBody>
        </Card>
        {userType === 'student' ? null : (
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">Working</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody className="d-flex">
              <div className="d-flex" style={{ width: '65%' }}>
                <Col className="d-flex align-items-center gap-50">
                  <Input type="radio" name="in_us" checked={working === 'in_us'} onChange={handleWorkOptionChange} />
                  <div>Working in the US</div>
                </Col>
                <Col className="d-flex align-items-center gap-50">
                  <Input
                    type="radio"
                    name="outside_us"
                    checked={working === 'outside_us'}
                    onChange={handleWorkOptionChange}
                  />
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
            <Button color="primary" type="submit" onClick={handleNextClick}>
              <>
                <span className="me-50">
                  {userType === 'student' ? 'Email Support Team' : 'STEP 2 - Taxpayer Identification'}
                </span>
                <ChevronRight size={14} />
              </>
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Step1;
