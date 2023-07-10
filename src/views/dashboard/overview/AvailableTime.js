/* eslint-disable react/prop-types */
// ** Third Party Components

// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { TimeCardWrapper } from './style';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import AvailableTimeComp from '../../../@core/components/available-time-comp';

const AvailableTime = () => {
  const userDetailsData = useSelector(userData);

  // const { availability } = userData;

  const weekdaysData = userDetailsData?.availability?.weekdays_avl;
  const weekendsData = userDetailsData?.availability?.weekends_avl;

  return (
    <TimeCardWrapper>
      <Card className="time-card">
        <CardHeader>
          <CardTitle tag="h4">Availability</CardTitle>
          <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">Edit</CardText>
        </CardHeader>
        <CardBody>
          <AvailableTimeComp
            timeZone={userDetailsData?.availability?.timezone?.abbreviation}
            weekdaysData={weekdaysData}
            weekendsData={weekendsData}
          />
        </CardBody>
      </Card>
    </TimeCardWrapper>
  );
};
export default AvailableTime;
