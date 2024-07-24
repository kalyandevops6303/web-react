/* eslint-disable react/no-danger */
import Proptypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import 'react-quill/dist/quill.snow.css';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Card, CardHeader, CardBody, Row, Col, CardText, Button, Badge, Spinner } from 'reactstrap';
import { TagsContainer, TimeWrapper } from '../style';
import {
  convertTo12HourFormat,
  convertUnixTimestampToDate,
  downloadUploadedFile,
  getFileSize,
  removeEmptyKeys,
  renderFilePreview,
} from '../../../utility/Utils';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import {
  createProjectLoading,
  saveDraftProjectId,
  saveDraftProjectLoading,
} from '../../../redux/selectors/createProjectSelectors';
import { createNewProject, saveDraftProject } from '../../../redux/actions/createProjectActions';
import YouDidItModal from '../YouDidItModal';
import { clearAllFormData } from '../../../redux/reducers/formData';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const Preview = ({
  stepper,
  projectDetails,
  listingDetails,
  files,
  youDidItModal,
  setYouDidItModal,
  toggleYouDidItModal,
  setDraftSavedModal,
}) => {
  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const weekends = ['SATURDAY', 'SUNDAY'];

  const dispatch = useDispatch();
  const params = useParams();
  const savedUserData = useSelector(selectSavedUserData);
  const createProjectIsLoading = useSelector(createProjectLoading);
  const draftProjectId = useSelector(saveDraftProjectId);
  const saveDraftProjectIsLoading = useSelector(saveDraftProjectLoading);

  const renderFormattedDate = (date) => {
    const formattedDate = date
      .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1">
        {files.map((file, index) => (
          <Row
            key={file.file.name}
            className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
          >
            <Col sm="6" md="6" lg="6">
              <div
                className="d-flex cursor-pointer"
                style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
                onClick={() => downloadUploadedFile({ file: file.file })}
              >
                <div className="d-flex align-items-center">
                  <span>{renderFilePreview(file.file)}</span>
                  <span>{file.file.name}</span>
                </div>
              </div>
            </Col>
            <Col sm="2" md="2" lg="4">
              {getFileSize(file.file.size)}
            </Col>
            <Col sm="2" md="2" lg="2">
              {renderFormattedDate(new Date())}
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );

  const skillsList = () => (
    <TagsContainer>
      {projectDetails?.skills.map((skill) => (
        <Badge key={skill.label} className="me-75 mb-1">
          {skill.label}
        </Badge>
      ))}
    </TagsContainer>
  );

  const countriesList = (countries) => (
    <TagsContainer>
      {countries?.map((country) => (
        <Badge key={country.label} className="me-75 mb-1">
          {country.label}
        </Badge>
      ))}
    </TagsContainer>
  );

  const toolsList = () => (
    <TagsContainer>
      {projectDetails?.tools.map((tools) => (
        <Badge key={tools.label} className="me-75 mb-1">
          {tools.label}
        </Badge>
      ))}
    </TagsContainer>
  );

  const onSuccess = () => {
    dispatch(clearAllFormData());
    toggleYouDidItModal();
    stepper.next();
  };

  const onNewProjectCreation = () => {
    let details;

    if (files.length > 0) {
      const documents = files.map((file) => ({
        file_name: file.file.name,
        file_key: file.uploadData.file_key,
      }));

      details = {
        name: projectDetails?.projectName?.trim(),
        description: projectDetails?.projectDescription,
        expected_duration: {
          duration: projectDetails?.expectedDuration,
          duration_type: projectDetails?.expectedDurationPeriod?.value,
        },
        documents,
      };
    } else {
      details = {
        name: projectDetails?.projectName?.trim(),
        description: projectDetails?.projectDescription,
        expected_duration: {
          duration: projectDetails?.expectedDuration,
          duration_type: projectDetails?.expectedDurationPeriod?.value,
        },
      };
    }

    const proficiency = {
      skills: projectDetails?.skills.map((skill) => skill.value),
      tools: projectDetails?.tools?.map((tool) => tool.value),
    };
    const availability = {
      timezone: projectDetails?.preferredWorkingTimeZone.value._id,
      time_overlap: projectDetails?.minTimeOverlapHr,
      weekdays_avl: {
        start_time: projectDetails?.availabilityDays?.includes('weekdays')
          ? projectDetails?.weekdayStartTime?.value
          : null,
        end_time: projectDetails?.availabilityDays?.includes('weekdays') ? projectDetails?.weekdayEndTime?.value : null,
        days: projectDetails?.availabilityDays?.includes('weekdays') ? projectDetails?.weekdays : null,
      },
      weekends_avl: {
        start_time: projectDetails?.availabilityDays?.includes('weekends')
          ? projectDetails?.weekendStartTime?.value
          : null,
        end_time: projectDetails?.availabilityDays?.includes('weekends') ? projectDetails?.weekendEndTime?.value : null,
        days: projectDetails?.availabilityDays?.includes('weekends') ? projectDetails?.weekends : null,
      },
    };
    const countries = {
      included: projectDetails?.includedCountriesSelection?.map((country) => country.value),
      excluded: projectDetails?.excludedCountriesSelection?.map((country) => country.value),
    };
    const pay_type = {
      currency: projectDetails?.currencyType?.value?._id,
      variable_cost: projectDetails?.projectPayType !== 'fixed-price',
      fixed_cost: projectDetails?.projectPayType === 'fixed-price' ? projectDetails?.projectFixedCost : 0,
    };
    const nda = {
      is_nda: projectDetails?.nda === 'yes',
    };
    const start_date = Date.parse(listingDetails?.startDate);
    const end_date = Date.parse(listingDetails?.endDate);

    const listing_details = {
      // start_date: formatDateWithDash(listingDetails?.startDate),
      // end_date: formatDateWithDash(listingDetails?.endDate),
      start_date,
      end_date,
    };

    const requiredData = {
      details,
      proficiency,
      availability,
      countries,
      pay_type,
      nda,
      listing_details,
    };

    dispatch(
      createNewProject({
        projectId: params?.projectId || draftProjectId,
        data: removeEmptyKeys(requiredData),
        onSuccess,
      }),
    );
  };

  const onSaveDraftSuccess = () => setDraftSavedModal(true);

  const handleSaveDraft = () => {
    let details;
    const {
      projectName,
      projectDescription,
      expectedDuration,
      expectedDurationPeriod,
      skills,
      tools,
      preferredWorkingTimeZone,
      minTimeOverlapHr,
      availabilityDays,
      weekdayStartTime,
      weekdayEndTime,
      weekendStartTime,
      weekendEndTime,
      includedCountriesSelection,
      excludedCountriesSelection,
      currencyType,
      projectPayType,
      projectFixedCost,
      nda: ndaValue,
    } = projectDetails;
    const { startDate, endDate } = listingDetails;

    if (files.length > 0) {
      const documents = files.map((file) => ({
        file_name: file.file.name,
        file_key: file.uploadData.file_key,
      }));

      details = {
        name: projectName?.trim(),
        description: projectDescription,
        expected_duration: {
          duration: expectedDuration,
          duration_type: expectedDurationPeriod?.value,
        },
        documents,
      };
    } else {
      details = {
        name: projectName?.trim(),
        description: projectDescription,
        expected_duration: {
          duration: expectedDuration,
          duration_type: expectedDurationPeriod?.value,
        },
      };
    }

    const proficiency = {
      skills: skills.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
    };
    const availability = {
      timezone: preferredWorkingTimeZone.value._id,
      time_overlap: minTimeOverlapHr,
      weekdays_avl: {
        start_time: availabilityDays?.includes('weekdays') ? weekdayStartTime?.value : null,
        end_time: availabilityDays?.includes('weekdays') ? weekdayEndTime?.value : null,
        days: availabilityDays?.includes('weekdays') ? weekdays : null,
      },
      weekends_avl: {
        start_time: availabilityDays?.includes('weekends') ? weekendStartTime?.value : null,
        end_time: availabilityDays?.includes('weekends') ? weekendEndTime?.value : null,
        days: availabilityDays?.includes('weekends') ? weekends : null,
      },
    };
    const countries = {
      included: includedCountriesSelection?.map((country) => country.value),
      excluded: excludedCountriesSelection?.map((country) => country.value),
    };
    const pay_type = {
      currency: currencyType?.value?._id,
      variable_cost: projectPayType !== 'fixed-price',
      fixed_cost: projectPayType === 'fixed-price' ? parseInt(projectFixedCost, 10) : 0,
    };
    const nda = {
      is_nda: ndaValue === 'yes',
    };
    const start_date = Date.parse(startDate);
    const end_date = Date.parse(endDate);

    const listing_details = {
      start_date,
      end_date,
    };

    const requiredData = {
      details,
      proficiency,
      availability,
      countries,
      pay_type,
      nda,
      listing_details,
    };

    dispatch(
      saveDraftProject({
        projectId: params?.projectId || draftProjectId,
        data: removeEmptyKeys(requiredData),
        onSuccess: onSaveDraftSuccess,
      }),
    );
  };

  return (
    <>
      {youDidItModal && (
        <YouDidItModal
          modal={youDidItModal}
          toggleModal={toggleYouDidItModal}
          onNewProjectCreation={onNewProjectCreation}
        />
      )}
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Project Details</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <Row className="mb-2">
            <Col sm="12" md="12" lg="6">
              <h4 className="fw-bolder">{projectDetails?.projectName}</h4>
              <p className="font-medium-1 fw-normal">Project Name</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {projectDetails?.expectedDuration}
                {projectDetails?.expectedDurationPeriod?.label[0].toLowerCase()}
              </h4>
              <p className="font-medium-1 fw-normal">Expected Duration</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {listingDetails?.listingOption === 'select-duration'
                  ? 
                  `${convertUnixTimestampToDate(listingDetails?.startDate, savedUserData?.availability?.timezone?.name )} - ${convertUnixTimestampToDate(listingDetails?.endDate, savedUserData?.availability?.timezone?.name )}`
                  : `${listingDetails?.duration}d`}
              </h4>
              <p className="font-medium-1 fw-normal">Listing Duration</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="12" md="12" lg="6">
              <h4 className="fw-bolder">{projectDetails?.currencyType?.label}</h4>
              <p className="font-medium-1 fw-normal">Currency</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {projectDetails?.projectPayType === 'variable-price'
                  ? 'Variable'
                  : `Fixed - ${projectDetails?.currencyType?.value?.code} ${projectDetails?.projectFixedCost}`}{' '}
              </h4>
              <p className="font-medium-1 fw-normal">Payment Type</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">{capitalize(projectDetails?.nda)}</h4>
              <p className="font-medium-1 fw-normal">NDA</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12" lg="6">
              <TimeWrapper>
                <section className="weekdays">
                  {projectDetails?.availabilityDays.includes('weekdays') ? (
                    <CardText>
                      {convertTo12HourFormat(parseInt(projectDetails?.weekdayStartTime?.value, 10))} -{' '}
                      {convertTo12HourFormat(parseInt(projectDetails?.weekdayEndTime?.value, 10))}{' '}
                      {projectDetails?.preferredWorkingTimeZone?.value?.abbreviation}
                    </CardText>
                  ) : (
                    <CardText>&nbsp;</CardText>
                  )}
                  <ul>
                    {weekdays.map((day) => (
                      <li key={day}>
                        <span
                          className={`dot ${
                            projectDetails?.availabilityDays.includes('weekdays') &&
                            projectDetails?.weekdays.includes(day)
                              ? 'active'
                              : ''
                          }`}
                        />
                        {capitalize(day.slice(0, 3))}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="weekends">
                  {projectDetails?.availabilityDays.includes('weekends') ? (
                    <CardText>
                      {convertTo12HourFormat(parseInt(projectDetails?.weekendStartTime?.value, 10))} -{' '}
                      {convertTo12HourFormat(parseInt(projectDetails?.weekendEndTime?.value, 10))}{' '}
                      {projectDetails?.preferredWorkingTimeZone?.value?.abbreviation}
                    </CardText>
                  ) : (
                    <CardText>&nbsp;</CardText>
                  )}
                  <ul>
                    {weekends.map((day) => (
                      <li key={day}>
                        <span
                          className={`dot ${
                            projectDetails?.availabilityDays.includes('weekends') &&
                            projectDetails?.weekends.includes(day)
                              ? 'active'
                              : ''
                          }`}
                        />
                        {capitalize(day.slice(0, 3))}
                      </li>
                    ))}
                  </ul>
                </section>
              </TimeWrapper>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">{projectDetails?.minTimeOverlapHr} hr</h4>
              <p className="font-medium-1 fw-normal">Minimum Overlap</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Project Description</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody style={{ whiteSpace: 'pre-line' }}>
          <div dangerouslySetInnerHTML={{ __html: projectDetails?.projectDescription }} />
        </CardBody>
      </Card>
      {files && files.length > 0 && fileList()}
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Requirement Details</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <Row>
            <p>Skills</p>
            {skillsList()}
          </Row>
          {projectDetails?.tools && projectDetails?.tools.length > 0 && (
            <Row>
              <p>Tools</p>
              {toolsList()}
            </Row>
          )}
          {projectDetails?.includeOrExcludeCountries &&
            (projectDetails?.includedCountriesSelection?.length > 0 ||
              projectDetails?.excludedCountriesSelection?.length > 0) && (
              <Row>
                <p>
                  {projectDetails?.includeOrExcludeCountries === 'include-countries'
                    ? 'Included Countries'
                    : 'Excluded Countries'}
                </p>
                {projectDetails?.includeOrExcludeCountries === 'include-countries'
                  ? countriesList(projectDetails?.includedCountriesSelection)
                  : countriesList(projectDetails?.excludedCountriesSelection)}
              </Row>
            )}
        </CardBody>
      </Card>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center upload-btn cursor-pointer" onClick={() => stepper.previous()}>
          <UploadIconContainer className="px-25 py-25 p-0">
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </UploadIconContainer>
          <h5 className="fw-light mb-0 mx-75">Back</h5>
        </div>
        <div className="d-flex">
          <Button
            color="primary"
            className="me-2"
            outline
            disabled={saveDraftProjectIsLoading}
            onClick={handleSaveDraft}
          >
            {saveDraftProjectIsLoading ? <Spinner size="sm" /> : <span>Save as Draft</span>}
          </Button>
          <Button color="primary" disabled={createProjectIsLoading} onClick={() => setYouDidItModal(true)}>
            {createProjectIsLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <span className="me-50">Post</span>
                <ChevronRight size={14} />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Preview;

Preview.propTypes = {
  stepper: Proptypes.object,
  projectDetails: Proptypes.object,
  listingDetails: Proptypes.object,
  files: Proptypes.array,
  youDidItModal: Proptypes.bool,
  setYouDidItModal: Proptypes.func,
  toggleYouDidItModal: Proptypes.func,
  setDraftSavedModal: Proptypes.func,
};

Preview.defaultProps = {
  stepper: {},
  projectDetails: {},
  listingDetails: {},
  files: [],
  youDidItModal: false,
  setYouDidItModal: () => {},
  toggleYouDidItModal: () => {},
  setDraftSavedModal: () => {},
};