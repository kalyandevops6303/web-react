/* eslint-disable no-unsafe-optional-chaining */
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
    const { documents, name, expected_duration, description } = res?.details;
    const { duration, duration_type } = expected_duration;
    const { skills, tools } = res?.proficiency;
    const { timezone, time_overlap, weekdays_avl, weekends_avl } = res?.availability;
    const { name: timezoneName, abbreviation } = timezone;
    const { days, start_time, end_time } = weekdays_avl;
    const { days: weekendsDays, start_time: weekendsStartTime, end_time: weekendsEndTime } = weekends_avl;
    const { excluded, included } = res?.countries;
    const { currency, variable_cost, fixed_cost } = res?.pay_type;
    const { is_nda } = res?.nda;

    const docs = documents?.map((file) => ({
      id: uuidv4(),
      file: {
        name: file?.file_name,
        size: file?.size,
      },
      uploadData: { file_key: file?.file_key },
    }));

    setFiles(docs);

    const projectRequirement = {
      projectName: name,
      expectedDuration: duration,
      expectedDurationPeriod: {
        label: `${capitalize(duration_type)}s`,
        value: duration_type,
      },
      projectDescription: description,
      skills: skills?.map((skill) => ({
        label: skill?.name,
        value: skill?._id,
      })),
      tools: tools?.map((tool) => ({
        label: tool?.name,
        value: tool?._id,
      })),
      preferredWorkingTimeZone: {
        label: `${timezoneName} (${abbreviation})`,
        value: timezone,
      },
      minTimeOverlapHr: time_overlap,
      weekdays: days?.length ? days : [],
      weekdayStartTime: start_time ? timeOptions.find((time) => parseInt(time.value, 10) === start_time) : undefined,
      weekdayEndTime: end_time ? timeOptions.find((time) => parseInt(time.value, 10) === end_time) : undefined,
      weekends: weekendsDays?.length ? weekendsDays : [],
      weekendStartTime: weekendsStartTime
        ? timeOptions.find((time) => parseInt(time.value, 10) === weekendsStartTime)
        : undefined,
      weekendEndTime: weekendsEndTime
        ? timeOptions.find((time) => parseInt(time.value, 10) === weekendsEndTime)
        : undefined,
      availabilityDays: [days?.length && 'weekdays', weekendsDays?.length && 'weekends'],
      // eslint-disable-next-line no-nested-ternary
      includeOrExcludeCountries: excluded?.length
        ? 'exclude-countries'
        : included?.length
        ? 'include-countries'
        : 'no-selection',
      includedCountriesSelection: included?.length
        ? included?.map((country) => ({
            label: country?.name,
            value: country?._id,
          }))
        : undefined,
      excludedCountriesSelection: excluded?.length
        ? excluded?.map((country) => ({
            label: country?.name,
            value: country?._id,
          }))
        : undefined,
      currencyType: { label: currency?.name, value: currency },
      projectPayType: variable_cost ? 'variable-price' : 'fixed-price',
      projectFixedCost: !variable_cost ? fixed_cost : undefined,
      nda: is_nda ? 'yes' : 'no',
    };
    setDraftRequirementDetails(projectRequirement);

    if ('listing_details' in res) {
      const { start_date_epoch, end_date_epoch } = res?.listing_details;

      const projectListing = {
        listingOption: 'listing_details' in res && 'select-duration',
        startDate: [new Date(start_date_epoch)],
        endDate: [new Date(end_date_epoch)],
      };
      setDraftListingDetails(projectListing);
    }
  };

  useEffect(() => {
    if (params?.projectId) {
      dispatch(draftProjectDetails(params?.projectId, getDraftProjectDetailsSuccess));
    }

    return () => {
      dispatch(clearCreateProjectData());
      dispatch(clearSaveDraftProjectId());
    };
  }, [params]);

  return (
    <div className="trumio">
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
    </div>
  );
};

export default CreateProject;
