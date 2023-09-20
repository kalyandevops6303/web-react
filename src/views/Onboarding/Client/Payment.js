import React, { useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { userOnboarding } from '../../../../utility/constants/Constant';

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.name);
  };

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/social-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const handleNextClick = () => {};

  const onSkipClick = () => {};

  return (
    <ProfileFormContainer>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">User Type</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody className="d-flex">
          <div className="d-flex">
            <Col className="d-flex align-items-center gap-50">
              <Input type="radio" name="option1" checked={selectedOption === 'option1'} onChange={handleOptionSelect} />
              <div>I am a US client</div>
            </Col>
            <Col className="d-flex align-items-center gap-50">
              <Input type="radio" name="option2" checked={selectedOption === 'option2'} onChange={handleOptionSelect} />
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
          {selectedOption === 'option1' ? (
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip Stripe Setup</span>
              <ChevronRight size={14} />
            </Button>
          ) : null}
          <Button color="primary" onClick={handleNextClick}>
            <>
              <span className="me-50">
                {selectedOption === 'option1' ? 'Stripe Setup Account' : 'Email Customer Support'}
              </span>
              <ChevronRight size={14} />
            </>
          </Button>
        </div>
      </div>
    </ProfileFormContainer>
  );
};

export default Payment;
