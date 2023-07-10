import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChevronLeft, ChevronRight, FileText } from 'react-feather';
import { Card, CardHeader, CardBody, Row, Col, CardText, Button, Badge, Spinner } from 'reactstrap';
import { TagsContainer, PreviewTextEditorContainer, TimeWrapper } from '../style';
import { convertTo12HourFormat } from '../../../utility/Utils';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import { createProjectLoading } from '../../../redux/selectors/createProjectSelectors';
import { createNewProject } from '../../../redux/actions/createProjectActions';
import YouDidItModal from '../YouDidItModal';

const Preview = ({
  stepper,
  projectDetails,
  listingDetails,
  files,
  youDidItModal,
  setYouDidItModal,
  toggleYouDidItModal,
}) => {
  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const weekends = ['SATURDAY', 'SUNDAY'];

  const dispatch = useDispatch();

  const createProjectIsLoading = useSelector(createProjectLoading);

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return <img className="rounded me-75" alt={file.name} src={URL.createObjectURL(file)} height="18" width="18" />;
      // eslint-disable-next-line
    } else {
      return <FileText size="18" className="me-75 mb-50" />;
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const renderFormattedDate = (date) => {
    const formattedDate = date
      .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const renderFormattedListingDate = (date) => {
    const formattedDate = date
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]} '${formattedDate[2].slice(2, 4)}`;
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1">
        {files.map((file, index) => (
          <Row
            key={file.name}
            className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
          >
            <Col sm="6" md="6" lg="6">
              {renderFilePreview(file)}
              {file.name}
            </Col>
            <Col sm="2" md="2" lg="4">
              {renderFileSize(file.size)}
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

  const formatDate = (date) => {
    if (!date) {
      return undefined;
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const isEmpty = (value) => {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  };

  const hasEmptyKeys = (obj) => Object.values(obj).some((value) => isEmpty(value));

  const removeEmptyKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      const filteredArray = obj.filter((item) => typeof item !== 'object' || !hasEmptyKeys(item));

      return filteredArray.map((item) => removeEmptyKeys(item));
    }

    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === 'object') {
        const cleanedValue = removeEmptyKeys(value);
        if (!isEmpty(cleanedValue)) {
          filteredObj[key] = cleanedValue;
        }
      } else if (!isEmpty(value)) {
        filteredObj[key] = value;
      }
    });

    if (isEmpty(filteredObj)) {
      return undefined;
    }

    return filteredObj;
  };

  const onSuccess = () => {
    toggleYouDidItModal();
    stepper.next();
  };

  const onNewProjectCreation = () => {
    const details = {
      name: projectDetails?.projectName.trim(),
      description: projectDetails?.projectDescription,
      expected_duration: {
        duration: projectDetails?.expectedDuration,
        duration_type: projectDetails?.expectedDurationPeriod?.value,
      },
    };
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
    const listing_details = {
      start_date: formatDate(listingDetails?.startDate),
      end_date: formatDate(listingDetails?.endDate),
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

    dispatch(createNewProject(removeEmptyKeys(requiredData), onSuccess));
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
                  ? `${renderFormattedListingDate(listingDetails?.startDate)} - ${renderFormattedListingDate(
                      listingDetails?.endDate,
                    )}`
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
        <CardBody>
          <PreviewTextEditorContainer>
            <ReactQuill theme="snow" readOnly value={projectDetails?.projectDescription} />
          </PreviewTextEditorContainer>
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
};

Preview.defaultProps = {
  stepper: {},
  projectDetails: {},
  listingDetails: {},
  files: [],
  youDidItModal: false,
  setYouDidItModal: () => {},
  toggleYouDidItModal: () => {},
};
