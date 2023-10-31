import React, { useState } from 'react';

import { TaxSituationAssessment, TaxpayerIdentification, USW9Form } from './PaymentSteps';

const Payment = () => {
  const [step, setStep] = useState(1);

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
