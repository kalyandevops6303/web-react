import React, { useRef, useState } from 'react';
import { FileText, ArrowLeft, Box, Check, CreditCard } from 'react-feather';
import { Col, Row } from 'reactstrap';
import Wizard from '../../@core/components/wizard';
import Preview from './steps/Preview';
import Invite from './steps/Invite';
import Listing from './steps/Listing';
import Requirements from './steps/Requirements';
import theme from '../../configs/themeVariables';
import { BackButtonContainer, BackIconContainer, FormWizardContainer } from './style';

const CreateProject = () => {
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'requirements',
      title: 'Requirements',
      subtitle: 'Enter project details',
      icon: <FileText size={18} />,
      content: <Requirements stepper={stepper} type="wizard-modern" />,
    },
    {
      id: 'listing',
      title: 'Listing',
      subtitle: 'Add start and end date',
      icon: <Box size={18} />,
      content: <Listing stepper={stepper} type="wizard-modern" />,
    },
    {
      id: 'preview',
      title: 'Preview',
      subtitle: 'Review before posting',
      icon: <Check size={18} />,
      content: <Preview stepper={stepper} type="wizard-modern" />,
    },
    {
      id: 'invite',
      title: 'Invite',
      subtitle: 'Solicit bids',
      icon: <CreditCard size={18} />,
      content: <Invite stepper={stepper} type="wizard-modern" />,
    },
  ];

  return (
    <>
      <Row className="m-0">
        <BackButtonContainer className="p-0">
          <BackIconContainer>
            <ArrowLeft size={18} color={theme.white} />
          </BackIconContainer>
          <h4 className="m-0 fw-light blue-text mt-25 mx-50">Create Project</h4>
        </BackButtonContainer>
      </Row>
      <Row>
        <Col lg="9" md="12" sm="12">
          <FormWizardContainer className="modern-horizontal-wizard">
            <Wizard
              type="modern-horizontal"
              ref={ref}
              steps={steps}
              options={{
                linear: false,
              }}
              instance={(el) => setStepper(el)}
            />
          </FormWizardContainer>
        </Col>
      </Row>
    </>
  );
};

export default CreateProject;
