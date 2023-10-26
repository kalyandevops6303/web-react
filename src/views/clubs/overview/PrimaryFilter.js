/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Users, UserCheck, Heart, ThumbsUp } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/myTeamActions';
import { userTypes } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state?.myTeams?.cardData);
  const isLoading = useSelector((state) => state?.myTeams?.cardInfoLoading);
  const selectMyTeamMetaData = useSelector((state) => state?.myTeams?.metaData);

  useEffect(() => {
    dispatch(getCardInfo({ userType, onSuccess: () => {}, onError: () => {} }));
  }, []);
  const TAB_NAMES = {
    ALL_CLUBS: 'All Clubs',
    MY_CLUB: 'My Clubs',
    FAV: 'Favourite',
  };

  const PATH_NAMES = {
    ALL_CLUBS: 'all_clubs',
    MY_CLUB: 'my_clubs',
    FAV: 'favourites',
  };

  if (isLoading && !selectCardData) {
    return <ComponentSpinner />;
  }

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.MY_CLUB)}>
        <Statbox
          isActive={selected === PATH_NAMES.MY_CLUB}
          isMarketPlaceTab
          title={selectCardData?.teams}
          desc={TAB_NAMES.MY_CLUB}
          icon={<Users height={20} />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>

      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.FAV)}>
        <Statbox
          isActive={selected === PATH_NAMES.FAV}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={selected === PATH_NAMES.FAV ? selectMyTeamMetaData?.total_records || '-' : selectCardData?.favorite}
          desc={TAB_NAMES.FAV}
          icon={<Heart height={20} />}
          color="light-dark-red"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.ALL_CLUBS)}>
        <Statbox
          isActive={selected === PATH_NAMES.ALL_CLUBS}
          isMarketPlaceTab
          title={selectCardData?.teams}
          desc={TAB_NAMES.ALL_CLUBS}
          icon={<Users height={20} />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>
    </Row>
  );
};

PrimaryFilter.propTypes = {
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
  userType: PropTypes.string,
};
PrimaryFilter.defaultProps = {
  selected: 'my-teams',
  handlePrimaryChangeFilter: () => {},
  userType: '',
};

export default PrimaryFilter;
