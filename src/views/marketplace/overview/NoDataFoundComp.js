import styled from 'styled-components';
import { Card, CardText } from 'reactstrap';
import { useNavigate } from 'react-router';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import NodataFound from '@src/assets/images/noDataFoundGif.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import theme from '../../../configs/themeVariables';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import { returnDetailsForMarketPlace } from '../../../utility/Utils';

const NoDataFoundComponent = ({ isRecommanded }) => {
  const userDetailsData = useSelector(userData);
  const navigate = useNavigate();
  const NoDataFoundWrapper = styled.div`
    width: 100%;
    .no-data-found-dynamic {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      margin-top: -1.5rem;
      text-align: center;
      color: ${theme.noDataFoundTextColor};
      margin-bottom: 4rem !important;
    }
  `;

  const onAddDetailsClick = (path) => {
    navigate(path, {
      state: { isEditing: true },
    });
  };

  const profilePercentageData = useSelector(profilePercentage);

  return (
    <NoDataFoundWrapper>
      <Card className="w-100 p-2">
        <img
          className="m-auto"
          height={200}
          width={200}
          src={isRecommanded ? UpcomingProjectsEmptyGif : NodataFound}
          alt="No data found"
        />
        {isRecommanded &&
        returnDetailsForMarketPlace(userDetailsData?.user_type, profilePercentageData?.values_missing) ? (
          <CardText
            onClick={() =>
              onAddDetailsClick(
                returnDetailsForMarketPlace(userDetailsData?.user_type, profilePercentageData?.values_missing)?.path,
              )
            }
            className="no-data-found-dynamic cursor-pointer"
          >
            Complete your profile to get started!
          </CardText>
        ) : (
          <CardText className="no-data-found-dynamic">No data found!</CardText>
        )}
      </Card>
    </NoDataFoundWrapper>
  );
};
NoDataFoundComponent.propTypes = {
  isRecommanded: PropTypes.string,
};
NoDataFoundComponent.defaultProps = {
  isRecommanded: false,
};
export default NoDataFoundComponent;
