/* eslint-disable react/prop-types */
// ** Third Party Components

// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TimeCardWrapper } from './style';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import AvailableTimeComp from '../../../@core/components/available-time-comp';
import { userTypes } from '../../../utility/constants/Constant';

const AvailableTime = () => {
  const navigate = useNavigate();
  const userDetailsData = useSelector(userData);

  const weekdaysData = userDetailsData?.availability?.weekdays_avl;
  const weekendsData = userDetailsData?.availability?.weekends_avl;

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (userDetailsData.user_type === userTypes.team) {
      navigate(`/create-team/profile-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userDetailsData?.user_type?.toLowerCase()}-onboarding/availability-details`, {
        state: { isEditing: true },
      });
    }
  };

  return (
    <TimeCardWrapper>
      <Card className="time-card">
        <CardHeader>
          <CardTitle tag="h4">Availability</CardTitle>
          <CardText
            className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer"
            onClick={handleEditClick}
          >
            Edit
          </CardText>
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
