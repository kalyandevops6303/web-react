import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaxSituationAssessment, TaxpayerIdentification, USW9Form } from './PaymentSteps';

import { formData } from '../../../redux/selectors/formDataSelectors';
import { setFormData } from '../../../redux/reducers/formData';

const Payment = () => {
  const savedFormData = useSelector(formData);
  const dispatch = useDispatch();
  const [step, setStep] = useState(savedFormData?.step || 1);

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, step }));
  }, [step]);

  const paymentSteps = {
    step1: TaxSituationAssessment,
    step2: TaxpayerIdentification,
    step3: USW9Form,
  };

  // eslint-disable-next-line no-nested-ternary
  const StepComp = step === 1 ? paymentSteps.step1 : step === 2 ? paymentSteps.step2 : step === 3 ? USW9Form : null;

  return <StepComp setStep={setStep} />;
};

export default Payment;
