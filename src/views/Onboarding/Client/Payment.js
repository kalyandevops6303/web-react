import React, { useEffect, useState } from 'react';
import { Button, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { userOnboarding } from '../../../utility/constants/Constant';
import { saveCheckpointComplete } from '../../../redux/actions/talentOnboardingActions';
import AccountCreatedModal from '../AccountCreatedModal';
import { getPaymentDetails, savePaymentDetails } from '../../../redux/actions/paymentActions';

const Payment = () => {
  const [isUsPerson, setIsUsPerson] = useState(true);
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [isUserExists, setIsUserExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.client}/social-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.client}/social-details`);
    }
  };

  const onSuccess = () => {
    if (location.state?.isEditing) {
      navigate('/dashboard');
    } else {
      setAccountCreatedModal(true);
    }
  };

  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      if (res?.created_at) setIsUserExists(true);
    }
  };

  useEffect(() => {
    dispatch(getPaymentDetails(onGetPaymentDetailsSuccess));
  }, []);

  const handleNextClick = () => {
    if (isUserExists) navigate('/dashboard');
    else if (isUsPerson) {
      if (!location.state?.isEditing) {
        const newData = {
          client_info: {
            is_us_person: isUsPerson,
          },
        };
        dispatch(savePaymentDetails(newData, onSuccess));
      }
    } else if (location?.state?.isEditing) {
      navigate('/dashboard');
    } else setAccountCreatedModal(true);
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
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={() => setAccountCreatedModal((prev) => !prev)} />
      )}
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">User Type</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody className="w-50">
          <h5 className="m-0 mt-1 mb-1 fs-5">Select from below</h5>
          <div className="d-flex pb-1 pt-1">
            <Col className="d-flex align-items-center gap-50">
              <Input type="radio" name="option1" checked={isUsPerson} onChange={() => setIsUsPerson(true)} />
              <div>I am a US client</div>
            </Col>
            <Col className="d-flex align-items-center gap-50">
              <Input
                type="radio"
                name="option2"
                checked={!isUsPerson}
                disabled={isUserExists}
                onChange={() => setIsUsPerson(false)}
              />
              <div>I am non-US client</div>
            </Col>
          </div>
        </CardBody>
      </Card>

      <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
        <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
          <UploadIconContainer>
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </UploadIconContainer>
          <h5 className="fw-bold">Back</h5>
        </div>
        <div>
          {isUsPerson && !isUserExists ? (
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip Stripe Setup</span>
              <ChevronRight size={14} />
            </Button>
          ) : null}
          <Button color="primary" onClick={handleNextClick}>
            <>
              {!isUserExists ? (
                <span className="me-50">{isUsPerson ? 'Stripe Setup Account' : 'Email Customer Support'}</span>
              ) : (
                <span className="me-50"> Go to Dashboard</span>
              )}
              <ChevronRight size={14} />
            </>
          </Button>
        </div>
      </div>
    </ProfileFormContainer>
  );
};

export default Payment;
