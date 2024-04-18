import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, Box, Check, CreditCard } from 'react-feather';
import { Col, Row } from 'reactstrap';
import Wizard from '../../@core/components/wizard';
import Preview from './steps/Preview';
import Invite from './steps/Invite';
import Listing from './steps/Listing';
import Requirements from './steps/Requirements';
import theme from '../../configs/themeVariables';
import { FormWizardContainer } from './style';
import { CircularBackButtonContainer } from '../styled';
import { clearCreateProjectData } from '../../redux/reducers/createProject';

const CreateProject = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [youDidItModal, setYouDidItModal] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleYouDidItModal = () => {
    setYouDidItModal(!youDidItModal);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: 'requirements',
      title: 'Requirements',
      subtitle: 'Project Details',
      icon: <FileText size={18} />,
      content: (
        <Requirements
          stepper={stepper}
          setProjectDetails={setProjectDetails}
          files={files}
          setFiles={setFiles}
          type="wizard-modern"
        />
      ),
    },
    {
      id: 'listing',
      title: 'Listing',
      subtitle: 'Duration',
      icon: <Box size={18} />,
      content: <Listing stepper={stepper} setListingDetails={setListingDetails} type="wizard-modern" />,
    },
    {
      id: 'preview',
      title: 'Preview',
      subtitle: 'Summary',
      icon: <Check size={18} />,
      content: (
        <Preview
          stepper={stepper}
          projectDetails={projectDetails}
          listingDetails={listingDetails}
          files={files}
          youDidItModal={youDidItModal}
          setYouDidItModal={setYouDidItModal}
          toggleYouDidItModal={toggleYouDidItModal}
          type="wizard-modern"
        />
      ),
    },
    {
      id: 'invite',
      title: 'Invite',
      subtitle: 'Talent',
      icon: <CreditCard size={18} />,
      content: (
        <Invite
          stepper={stepper}
          youDidItModal={youDidItModal}
          toggleYouDidItModal={toggleYouDidItModal}
          type="wizard-modern"
        />
      ),
    },
  ];

  // eslint-disable-next-line
  useEffect(() => {
    return () => dispatch(clearCreateProjectData());
  }, []);

  return (
    <>
      <CircularBackButtonContainer
        className="d-flex align-items-center cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <div className="back-icon-container">
          <ArrowLeft size={18} color={theme.white} />
        </div>
        <p className="fw-light mb-0 ms-50 font-medium-2">Create Project</p>
      </CircularBackButtonContainer>
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
