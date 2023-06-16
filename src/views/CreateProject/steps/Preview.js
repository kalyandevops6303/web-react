import Proptypes from 'prop-types';
import { capitalize } from 'lodash';
import { ChevronLeft, ChevronRight, FileText } from 'react-feather';
import { Card, CardHeader, CardBody, Row, Col, CardText, Button, Badge } from 'reactstrap';
import { TagsContainer, TimeWrapper } from '../style';
import { convertTo12HourFormat } from '../../../utility/Utils';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';

const Preview = ({ stepper, projectDetails, listingDetails, files }) => {
  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const weekends = ['SATURDAY', 'SUNDAY'];

  const weekdaysData = {
    start_time: '1',
    end_time: '2',
    days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
  };

  const weekendsData = {
    start_time: '1',
    end_time: '2',
    days: ['SATURDAY', 'SUNDAY'],
  };

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

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Project Details</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <Row className="mb-2">
            <Col sm="12" md="12" lg="6">
              <h4 className="fw-bolder">{projectDetails?.projectName}</h4>
              <p className="font-medium-2 fw-normal">Project Name</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {projectDetails?.expectedDuration}
                {projectDetails?.expectedDurationPeriod?.label[0].toLowerCase()}
              </h4>
              <p className="font-medium-2 fw-normal">Expected Duration</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {listingDetails?.listingOption === 'select-duration'
                  ? `${renderFormattedListingDate(listingDetails?.startDate)} - ${renderFormattedListingDate(
                      listingDetails?.endDate,
                    )}`
                  : `${listingDetails?.duration}d`}
              </h4>
              <p className="font-medium-2 fw-normal">Listing Duration</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="12" md="12" lg="6">
              <h4 className="fw-bolder">{projectDetails?.preferredWorkingTimeZone?.label}</h4>
              <p className="font-medium-2 fw-normal">Currency Type</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">
                {projectDetails?.projectPayType === 'variable-price'
                  ? 'Variable Pay'
                  : `Fixed Pay - ${projectDetails?.currencyType?.label}${projectDetails?.projectFixedCost}`}{' '}
              </h4>
              <p className="font-medium-2 fw-normal">Payment Type</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">{projectDetails?.nda}</h4>
              <p className="font-medium-2 fw-normal">NDA</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12" lg="6">
              <TimeWrapper>
                {weekdaysData && (
                  <section className="weekdays">
                    <CardText>
                      {convertTo12HourFormat(weekdaysData.start_time)} - {convertTo12HourFormat(weekdaysData.end_time)}
                    </CardText>
                    <ul>
                      {weekdays.map((day) => (
                        <li key={day}>
                          <span className={`dot ${weekdaysData.days.includes(day) ? 'active' : ''}`} />
                          {capitalize(day.slice(0, 3))}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {weekendsData && (
                  <section className="weekends">
                    <CardText>
                      {convertTo12HourFormat(weekendsData.start_time)} - {convertTo12HourFormat(weekendsData.end_time)}
                    </CardText>
                    <ul>
                      {weekends.map((day) => (
                        <li key={day}>
                          <span className={`dot ${weekendsData.days.includes(day) ? 'active' : ''}`} />
                          {capitalize(day.slice(0, 3))}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </TimeWrapper>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">{projectDetails?.minTimeOverlapHr?.label} hr</h4>
              <p className="font-medium-2 fw-normal">Minimum Overlap</p>
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
          <p className="fw-light font-medium-1">{projectDetails?.projectDescription}</p>
        </CardBody>
      </Card>
      {files && files.length > 0 && fileList()}
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Requirements</h4>
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
                  Country -{' '}
                  {projectDetails?.includeOrExcludeCountries === 'include-countries'
                    ? 'Include Countries'
                    : 'Exclude Countries'}
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
        <Button color="primary">
          <span className="me-50">Post</span>
          <ChevronRight size={14} />
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
};

Preview.defaultProps = {
  stepper: {},
  projectDetails: {},
  listingDetails: {},
  files: [],
};
