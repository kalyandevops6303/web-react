import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { clearCreateProjectData, clearSaveDraftProjectId } from '../../redux/reducers/createProject';
import DraftSavedModal from '../modals/DraftSavedModal';
import { draftProjectDetails } from '../../redux/actions/createProjectActions';
import capitalize from '../../lib/capitalize';
import timeOptions from '../../utility/constants/TimeDropdownOptions';
import uuidv4 from '../../lib/uuidv4';

const CreateProject = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [youDidItModal, setYouDidItModal] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [draftSavedModal, setDraftSavedModal] = useState(null);
  const [draftRequirementDetails, setDraftRequirementDetails] = useState(null);
  const [draftListingDetails, setDraftListingDetails] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const toggleYouDidItModal = () => {
    setYouDidItModal(!youDidItModal);
  };

  const toggleDraftSavedModal = () => setDraftSavedModal(!draftSavedModal);

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
          setDraftSavedModal={setDraftSavedModal}
          draftRequirementDetails={draftRequirementDetails}
          type="wizard-modern"
        />
      ),
    },
    {
      id: 'listing',
      title: 'Listing',
      subtitle: 'Duration',
      icon: <Box size={18} />,
      content: (
        <Listing
          stepper={stepper}
          setListingDetails={setListingDetails}
          setDraftSavedModal={setDraftSavedModal}
          projectDetails={projectDetails}
          files={files}
          draftListingDetails={draftListingDetails}
          type="wizard-modern"
        />
      ),
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
          setDraftSavedModal={setDraftSavedModal}
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

  const getDraftProjectDetailsSuccess = (res) => {
    const documents = res?.details?.documents?.map((file) => ({
      id: uuidv4(),
      file: {
        name: file?.file_name,
        size: file?.size,
      },
      uploadData: { file_key: file?.file_key },
    }));

    setFiles(documents);

    const projectRequirement = {
      projectName: res?.details?.name,
      expectedDuration: res?.details?.expected_duration?.duration,
      expectedDurationPeriod: {
        label: `${capitalize(res?.details?.expected_duration?.duration_type)}s`,
        value: res?.details?.expected_duration?.duration_type,
      },
      projectDescription: res?.details?.description,
      skills: res?.proficiency?.skills?.map((skill) => ({
        label: skill?.name,
        value: skill?._id,
      })),
      tools: res?.proficiency?.tools?.map((tool) => ({
        label: tool?.name,
        value: tool?._id,
      })),
      preferredWorkingTimeZone: {
        label: `${res?.availability?.timezone?.name} (${res?.availability?.timezone?.abbreviation})`,
        value: res?.availability?.timezone,
      },
      minTimeOverlapHr: res?.availability?.time_overlap,
      weekdays: res?.availability?.weekdays_avl?.days?.length ? res?.availability?.weekdays_avl?.days : [],
      weekdayStartTime: res?.availability?.weekdays_avl?.start_time
        ? timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekdays_avl?.start_time)
        : undefined,
      weekdayEndTime: res?.availability?.weekdays_avl?.end_time
        ? timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekdays_avl?.end_time)
        : undefined,
      weekends: res?.availability?.weekends_avl?.days?.length ? res?.availability?.weekends_avl?.days : [],
      weekendStartTime: res?.availability?.weekends_avl?.start_time
        ? timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekends_avl?.start_time)
        : undefined,
      weekendEndTime: res?.availability?.weekends_avl?.end_time
        ? timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekends_avl?.end_time)
        : undefined,
      availabilityDays: [
        res?.availability?.weekdays_avl?.days?.length && 'weekdays',
        res?.availability?.weekends_avl?.days?.length && 'weekends',
      ],
      // eslint-disable-next-line no-nested-ternary
      includeOrExcludeCountries: res?.countries?.excluded?.length
        ? 'exclude-countries'
        : res?.countries?.included?.length
        ? 'include-countries'
        : 'no-selection',
      includedCountriesSelection: res?.countries?.included?.length
        ? res?.countries?.included?.map((country) => ({
            label: country?.name,
            value: country?._id,
          }))
        : undefined,
      excludedCountriesSelection: res?.countries?.excluded?.length
        ? res?.countries?.excluded?.map((country) => ({
            label: country?.name,
            value: country?._id,
          }))
        : undefined,
      currencyType: { label: res?.pay_type?.currency?.name, value: res?.pay_type?.currency },
      projectPayType: res?.pay_type?.variable_cost ? 'variable-price' : 'fixed-price',
      projectFixedCost: !res?.pay_type?.variable_cost ? res?.pay_type?.fixed_cost : undefined,
      nda: res?.nda?.is_nda ? 'yes' : 'no',
    };
    setDraftRequirementDetails(projectRequirement);

    const projectListing = {
      listingOption: 'listing_details' in res && 'select-duration',
      startDate: [new Date(res?.listing_details?.start_date_epoch)],
      endDate: [new Date(res?.listing_details?.end_date_epoch)],
    };
    setDraftListingDetails(projectListing);
  };

  useEffect(() => {
    if (params?.projectId) {
      dispatch(draftProjectDetails(params?.projectId, getDraftProjectDetailsSuccess));
    }

    return () => {
      dispatch(clearCreateProjectData());
      dispatch(clearSaveDraftProjectId());
    };
  }, []);

  return (
    <>
      {draftSavedModal && (
        <DraftSavedModal
          modal={draftSavedModal}
          toggleModal={toggleDraftSavedModal}
          path="Marketplace > My Listings > Drafts Or View Draft"
          onPrimaryBtnClick={() =>
            navigate('/marketplace/my_listings', {
              state: {
                isDraftProjects: true,
              },
            })
          }
        />
      )}
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
