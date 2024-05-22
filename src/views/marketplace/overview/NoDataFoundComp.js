import styled from 'styled-components';
import { useState } from 'react';
import { Card, CardText } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import NodataFound from '@src/assets/images/noDataFoundGif.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import theme from '../../../configs/themeVariables';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import { returnDetailsForMarketPlace } from '../../../utility/Utils';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';

const NoDataFoundComponent = ({ isMyListing, isRecommanded }) => {
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const navigate = useNavigate();
  const location = useLocation();
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const onCreateProjectClick = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute')
    ) {
      setCompleteProfileModal(true);
    } else {
      navigate('/create-project');
    }
  };

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
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path);
  };

  const contentMapping = {
    recommendedWithDetails: {
      imgSrc: UpcomingProjectsEmptyGif,
      text: 'Complete your profile to get started!',
      onClick: () => {
        const details = returnDetailsForMarketPlace(userDetailsData?.user_type, profilePercentageData?.values_missing);
        if (details) {
          onAddDetailsClick(details.path);
        }
      },
    },
    myListing: {
      imgSrc: ActiveProjectsEmptyGif,
      text: "Let's get you started!",
      onClick: () => {
        onCreateProjectClick();
      },
    },
    default: {
      imgSrc: NodataFound,
      text: 'No data found!',
    },
  };

  const isrecommendedDataFilled = returnDetailsForMarketPlace(
    userDetailsData?.user_type,
    profilePercentageData?.values_missing,
  );

  const totalCreatedProject = useSelector((state) => state.marketPlace?.cardData?.my_listings);

  const contentType =
    // eslint-disable-next-line no-nested-ternary
    isRecommanded && isrecommendedDataFilled
      ? 'recommendedWithDetails'
      : isMyListing && totalCreatedProject === 0
      ? 'myListing'
      : 'default';

  const { imgSrc, text, onClick } = contentMapping[contentType];

  return (
    <NoDataFoundWrapper>
      <Card className="w-100 p-2">
        <img className="m-auto" height={200} width={200} src={imgSrc} alt="No data found" />
        {onClick ? (
          <CardText onClick={onClick} className="no-data-found-dynamic cursor-pointer">
            {text}
          </CardText>
        ) : (
          <CardText className="no-data-found-dynamic">{text}</CardText>
        )}
      </Card>
      {completeProfileModal && (
        <CompleteProfileModal modal={completeProfileModal} toggleModal={toggleCompleteProfileModal} />
      )}
    </NoDataFoundWrapper>
  );
};
NoDataFoundComponent.propTypes = {
  isRecommanded: PropTypes.bool,
  isMyListing: PropTypes.bool,
};
NoDataFoundComponent.defaultProps = {
  isRecommanded: false,
  isMyListing: false,
};
export default NoDataFoundComponent;
