import Proptypes from 'prop-types';
import { capitalize } from 'lodash';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Card, CardHeader, CardBody, Row, Col, CardText, Button } from 'reactstrap';
import { TimeWrapper } from '../style';
import { convertTo12HourFormat } from '../../../utility/Utils';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';

const Preview = ({ stepper }) => {
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
              <h4 className="fw-bolder">Usage Data Collection and Payment</h4>
              <p className="font-medium-2 fw-normal">Project Name</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">115w</h4>
              <p className="font-medium-2 fw-normal">Expected Duration</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">115w</h4>
              <p className="font-medium-2 fw-normal">Listing Duration</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="12" md="12" lg="6">
              <h4 className="fw-bolder">USD</h4>
              <p className="font-medium-2 fw-normal">Currency Type</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">Fix Pay - $5000</h4>
              <p className="font-medium-2 fw-normal">Payment Type</p>
            </Col>
            <Col sm="12" md="6" lg="3">
              <h4 className="fw-bolder">No</h4>
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
              <h4 className="fw-bolder">2.5 hr</h4>
              <p className="font-medium-2 fw-normal">Minimum Overlap</p>
            </Col>
          </Row>
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
};

Preview.defaultProps = {
  stepper: {},
};
