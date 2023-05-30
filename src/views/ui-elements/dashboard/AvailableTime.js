/* eslint-disable react/prop-types */
// ** Third Party Components

// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';
import { CardWrapper } from './styled';
import { TimeWrapper } from './style';

const AvailableTime = () => (
  <CardWrapper>
    <Card className="time-card">
      <CardHeader>
        <CardTitle tag="h4">Available Time</CardTitle>
        <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">Edit</CardText>
      </CardHeader>
      <CardBody>
        <TimeWrapper>
          <section className="weekdays">
            <CardText>11:00am - 12:00pm IST</CardText>
            <ul>
              <li>
                <span className="dot active" />
                Mon
              </li>
              <li>
                <span className="dot" />
                Tue
              </li>
              <li>
                <span className="dot active" />
                Wed
              </li>
              <li>
                <span className="dot" />
                Thu
              </li>
              <li>
                <span className="dot active" />
                Fri
              </li>
            </ul>
          </section>
          <span className="line" />
          <section className="weekends">
            <CardText>11:00am - 12:00pm IST</CardText>
            <ul>
              <li>
                <span className="dot active" />
                Sat
              </li>
              <li>
                <span className="dot active" />
                Sun
              </li>
            </ul>
          </section>
        </TimeWrapper>
      </CardBody>
    </Card>
  </CardWrapper>
);

export default AvailableTime;
