/* eslint-disable react/prop-types */
// ** Third Party Components

// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { TimeCardWrapper, TimeWrapper } from './style';
import { convertTo12HourFormat } from '../../../utility/Utils';
import { userData } from '../../../redux/selectors/dashboardSelectors';

const AvailableTime = () => {
  const userDetailsData = useSelector(userData);

  // const { availability } = userData;

  const weekdaysData = userDetailsData?.availability?.weekdays_avl;
  const weekendsData = userDetailsData?.availability?.weekends_avl;

  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const weekends = ['SATURDAY', 'SUNDAY'];

  return (
    <TimeCardWrapper>
      <Card className="time-card">
        <CardHeader>
          <CardTitle tag="h4">Available Time</CardTitle>
          <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">Edit</CardText>
        </CardHeader>
        <CardBody>
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
              <>
                <span className="line" />
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
              </>
            )}
          </TimeWrapper>
        </CardBody>
      </Card>
    </TimeCardWrapper>
  );
};
export default AvailableTime;
