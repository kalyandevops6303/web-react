import styled from 'styled-components';
import { Card, CardText } from 'reactstrap';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import NodataFound from '@src/assets/images/noDataFoundGif.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';

import theme from '../../../configs/themeVariables';
import { getProfilePercentage } from '../../../redux/actions/dashboardActions';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import { returnDetailsForMarketPlace } from '../../../utility/Utils';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';
import { getProfileCompletionFlextern } from '../../../redux/actions/talentOnboardingActions';
import { selectFlexternBoolean } from '../../../redux/selectors/authSelectors';

const NoDataFoundComponent = ({ isRecommanded }) => {
  const dispatch = useDispatch();
  const location = useLocation();
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
  const isFlextern = useSelector(selectFlexternBoolean);
  useEffect(() => {
    if(isFlextern){
      dispatch(getProfileCompletionFlextern());
    }
    else{
      dispatch(getProfilePercentage());
    }
  }, []);

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path);
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
