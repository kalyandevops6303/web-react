import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { CITIZEN_TYPES, userOnboarding, userProfileEdit } from '../../../../utility/constants/Constant';

import { saveCheckpointComplete } from '../../../../redux/actions/talentOnboardingActions';
import AccountCreatedModal from '../../AccountCreatedModal';
import {
  getPaymentDetails,
  linkStripeAccount,
  savePaymentDetails,
  updatePaymentDetails,
} from '../../../../redux/actions/paymentActions';
import { handleEmailClick } from '../../../../utility/Utils';
import { formData } from '../../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../../../redux/reducers/formData';
import { getShowHiringTab } from '../../../../redux/actions/hiringActions';
import { UncontrolledTooltip } from 'reactstrap';
import { SuccessInfoBanner } from '../../../assessments/style';
import { Info } from 'react-feather';

// eslint-disable-next-line react/prop-types
const Step1 = ({ setStep, step }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const savedFormData = useSelector(formData);
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [isWorkingInUS, setIsWorkingInUS] = useState(savedFormData?.isWorkingInUS || false);
  const [taxUserType, setTaxUserType] = useState(savedFormData?.taxUserType || CITIZEN_TYPES.US);
  const [isTaxinfoExists, setIsTaxInfoExists] = useState(false);
  const [isPaymentOnboardingDone, setIsPaymentOnboardingDone] = useState(savedFormData?.isPaymentOnboardingDone || false);
  const stripeDetailsLoading = useSelector((state) => state?.stripeDetails?.loading);
  const paymentDetailsLoading = useSelector((state) => state.PaymentDetails?.loading);

  const [stripeAccountText, setStripeAccountText] = useState("");
  const [stripeAccountLink, setStripeAccountLink] = useState("");

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, step }));
  }, [step]);
  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      if (res?.created_at) setIsTaxInfoExists(true);
      if (res?.is_payment_gateway_onboarded) setIsPaymentOnboardingDone(res?.is_payment_gateway_onboarded);
      if (res?.tax_user_type) {
        setTaxUserType(res?.tax_user_type);
        if (res?.tax_user_type === 'NON_US') {
          setIsWorkingInUS(false);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(getPaymentDetails(onGetPaymentDetailsSuccess));
  }, []);

  useEffect(() => {
    if (isPaymentOnboardingDone) {
      dispatch(linkStripeAccount((res) => {
        setStripeAccountLink(res.url);
        const acctSegment = res.url.split('/').find(segment => segment.startsWith('acct'));

        if (acctSegment) {
          const prefix = acctSegment.slice(0, 4);  // 'acct'
          const visiblePart = acctSegment.slice(-3);  // Last 3 characters
          const hiddenPart = 'x'.repeat(acctSegment.length - 8);  // Replace the rest with 'x'

          const formattedSegment = `${prefix} ${hiddenPart} ${visiblePart}`;

          console.log(formattedSegment); // Output: acct_ xxxxxxxxxxx PrD
          setStripeAccountText(formattedSegment);
        }
      }));
    }
  }, [isPaymentOnboardingDone])

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/social-details`);
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const handlePrePaymentChange = (e) => {
    if (e.target.name === CITIZEN_TYPES.US || e.target.name === CITIZEN_TYPES.OTHER) {
      dispatch(setFormData({ taxUserType: e.target.name }));
    } else {
      dispatch(setFormData({ ...savedFormData, taxUserType: e.target.name }));
    }

    setTaxUserType(e.target.name);
  };

  useEffect(() => {
    const allData = { ...savedFormData, isPaymentOnboardingDone };
    dispatch(setFormData(allData));
  }, [isPaymentOnboardingDone]);

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const handleWorkOptionChange = (e) => {
    if (e.target.name === 'in_us') {
      dispatch(setFormData({ ...savedFormData, isWorkingInUS: true }));
      setIsWorkingInUS(true);
    } else {
      dispatch(setFormData({ ...savedFormData, isWorkingInUS: false }));
      setIsWorkingInUS(false);
    }
  };

  const onSuccess = () => {
    setStep(2);
  };

  const onAccountLinkSuccess = (res) => {
    if (res?.url?.length > 0) {
      // eslint-disable-next-line no-undef
      window.open(res.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }
  };
  const handleNextClick = (e) => {

    if (taxUserType === CITIZEN_TYPES.OTHER || (taxUserType === 'NON_US' && isWorkingInUS)) {
      // email support
      handleEmailClick();
      e.preventDefault();
      return;
    }

    if (isTaxinfoExists) {
      if (isPaymentOnboardingDone) {
        dispatch(linkStripeAccount(onAccountLinkSuccess));
      } else {
        const newData = {
          tax_user_type: taxUserType,
        };
        dispatch(updatePaymentDetails(newData, onSuccess));
      }
    } else {
      const newData = {
        tax_user_type: taxUserType,
      };
      dispatch(savePaymentDetails(newData, onSuccess));
    }
  };

  const onSkipSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate('/dashboard');
    } else {
      setAccountCreatedModal(true);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate('/dashboard');
    } else {
      dispatch(saveCheckpointComplete(onSkipSuccess));
    }
  };

  const onGetHiredClick = () => {
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/intern-xobin-hiring`)
    }
    else {
      navigate(`/${userOnboarding.talent}/intern-xobin-hiring`)
    }
  }

  const onGetHiredClick2 = () => {
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/intern-hiring`)
    }
    else {
      navigate(`/${userOnboarding.talent}/intern-hiring`)
    }
  }

  const getCTAText = () => {
    if (isPaymentOnboardingDone) {
      return 'Stripe Linked Account';
    }
    if (taxUserType === CITIZEN_TYPES.OTHER || (taxUserType === 'NON_US' && isWorkingInUS)) {
      return 'Email Support Team';
    }
    return 'STEP 2 - Taxpayer Identification';
  };

  const showHiringTab = useSelector((state) => state.hiring?.showHiringTab)

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
      {isPaymentOnboardingDone && <SuccessInfoBanner className="d-flex px-1 py-1 mb-1 w-75">
        <Info size={18} color={theme.succesGreenColor} className="me-50 info-banner-icon" />
        <p className="font-medium-1 m-0 info">
        Congratulations! You have completed setting up your Stripe account.
        </p>
      </SuccessInfoBanner>}

      <h2 className="m-0 mt-1 mb-2">STEP 1 - Tax Situation Assessment</h2>
      
      <Form>
        <div className='d-flex gap-3'>
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
                    checked={taxUserType === CITIZEN_TYPES.US}
                    name="US"
                    disabled={isPaymentOnboardingDone}
                    onChange={handlePrePaymentChange}
                  />
                  <div className="w-75">US Person - Permanent residents or Citizens with US Tax Identification</div>
                </Col>
                <Col className="d-flex gap-50">
                  <Input
                    type="radio"
                    name="NON_US"
                    disabled={isPaymentOnboardingDone}
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
                    name="OTHER"
                    disabled={isPaymentOnboardingDone}
                    checked={taxUserType === CITIZEN_TYPES.OTHER}
                    onChange={handlePrePaymentChange}
                  />
                  <div className="w-75">All other tax situations</div>
                </Col>
              </div>
            </CardBody>
          </Card>
          {isPaymentOnboardingDone && <Card className="w-25">
            <CardHeader className="d-flex align-items-center">
              <h4 className="m-0 mt-1">Stripe Account Details</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <div className='d-flex flex-column rounded gap-1' style={{ backgroundColor: '#0185E426', padding: 20 }}>
                <b>{stripeAccountText}</b>
                <a href={stripeAccountLink || "#"}>Go to Stripe</a>
              </div>
            </CardBody>
          </Card>}
        </div>
        {taxUserType === CITIZEN_TYPES.OTHER || taxUserType === CITIZEN_TYPES.US ? null : (
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">Working</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody className="d-flex">
              <div className="d-flex" style={{ width: '65%' }}>
                <Col className="d-flex align-items-center gap-50">
                  <Input
                    type="radio"
                    name="in_us"
                    checked={isWorkingInUS}
                    disabled={isPaymentOnboardingDone}
                    onChange={handleWorkOptionChange}
                  />
                  <div>Working in the US</div>
                </Col>
                <Col className="d-flex align-items-center gap-50">
                  <Input
                    type="radio"
                    name="outside_us"
                    checked={!isWorkingInUS}
                    disabled={isPaymentOnboardingDone}
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
              <span className="me-50">{isPaymentOnboardingDone ? 'Go To Dashboard' : 'Skip'}</span>
              <ChevronRight size={14} />
            </Button>
            
            {/* <span id="get-hired-cta">
            <Button disabled={!showHiringTab} color="danger" className="me-2" onClick={onGetHiredClick}>
              <span className="me-50">Get Hired </span>
              <ChevronRight size={14} />

              {!showHiringTab && 
              <UncontrolledTooltip target="get-hired-cta">
                Enter the required fields on previous tabs
              </UncontrolledTooltip>
              }
            </Button> 
            </span> */}
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Step1;
