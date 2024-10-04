import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight, Info } from 'react-feather';
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
import { SuccessInfoBanner } from '../../../assessments/style';

import { ProgressBarWrapper } from '../../../create-bid/style';
import { Progress } from 'reactstrap';
import { giveProgressBarColorClassName } from '../../../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../../../utility/constants/CompleteProfileDetailsCta';
import "../../../../App.css";
import { getProfilePercentage } from '../../../../redux/actions/dashboardActions';
import { CardText } from 'reactstrap';
import { userTypes } from '../../../../utility/constants/Constant';

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


  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector((state) => state.auth?.profileCompletionFlextern?.values_missing);
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector((state) => state.dashboard?.profilePercentage?.values_missing);

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) == 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) == 100;
  const isFlextern = useSelector((state) => state.auth?.flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  const [flexternOrProjectModal, setFlexternOrProjectModal] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  const getOverallPercentageCompletion = () => {
    if (isFlextern && !isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionFlextern);
    }
    else if (!isFlextern && isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionProject);
    }
    else {
      setOverallPercentageCompletion((profileCompletionFlextern + profileCompletionProject) / 2);
    }
  }

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject])



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
        const acctSegment = res.url.split('/').find((segment) => segment.startsWith('acct'));

        if (acctSegment) {
          const prefix = acctSegment.slice(0, 4);  // 'acct'
          const visiblePart = acctSegment.slice(-3);  // Last 3 characters
          const hiddenPart = 'x'.repeat(acctSegment.length - 8);  // Replace the rest with 'x'

          const formattedSegment = `${prefix} ${hiddenPart} ${visiblePart}`;
          setStripeAccountText(formattedSegment);
        }
      }));
    }
  }, [isPaymentOnboardingDone]);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/availability-details`);
    } else {
      navigate(`/${userOnboarding.talent}/availability-details`);
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

  const getCTAText = () => {
    if (isPaymentOnboardingDone) {
      return 'Stripe Linked Account';
    }
    if (taxUserType === CITIZEN_TYPES.OTHER || (taxUserType === 'NON_US' && isWorkingInUS)) {
      return 'Email Support Team';
    }
    return 'STEP 2 - Taxpayer Identification';
  };

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
        <div className='d-flex gap-2'>
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

          <div className='w-25'>
            {isPaymentOnboardingDone &&
              <Card className="w-100">
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

            <Card className="w-100">
              <CardHeader>
                <h4 className="m-0 mt-1">Profile Completion</h4>
                <CardText className="m-0 mt-1">Make it easier for others to find you by completing your profile.</CardText>
                <h3 className="m-0 mt-1 mb-1">{overallPercentageCompletion}%</h3>
                <Progress value={overallPercentageCompletion}
                  style={{ height: '0.5rem' }}
                  className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                ></Progress>

              </CardHeader>

              <CardBody>
                <hr className="m-0 card-header-border" />

                {isTrumioTalent && <div className='d-flex gap-1 mt-1'>
                  <div className="custom-checkbox-wrapper">
                    <Input type="checkbox" id="customCheckbox" className="custom-checkbox-input" checked={isProjectReady} />
                    <label htmlFor="customCheckbox" className="custom-checkbox-label"></label>
                  </div>
                  <div>
                    <CardText className="m-0">Client Projects Ready</CardText>
                    <b className='text-primary cursor-pointer'
                      onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.path || "/marketplace")}
                    >{isProjectReady ? 'Explore Projects' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                  </div>
                </div>}

                {isFlextern && <div className='d-flex gap-1 mt-1'>
                  <div className="custom-checkbox-wrapper">
                    <Input type="checkbox" id="customCheckbox2" className="custom-checkbox-input" checked={isFlexternReady} />
                    <label htmlFor="customCheckbox2" className="custom-checkbox-label"></label>
                  </div>
                  <div>
                    <CardText className="m-0">Flexternship Ready</CardText>
                    <b className='text-primary cursor-pointer'
                      onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.path || "/dashboard")}
                    >{isFlexternReady ? 'Explore Flexternships' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                  </div>
                </div>}
              </CardBody>
            </Card>
          </div>

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

            {!isPaymentOnboardingDone && <Button color="primary" className="me-2" onClick={handleNextClick}>
              {paymentDetailsLoading || stripeDetailsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">{getCTAText()}</span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>}

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
