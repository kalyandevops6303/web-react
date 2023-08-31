import React, { useEffect } from 'react';
import { Users, UserPlus, UserCheck, Heart } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getItem } from '../../../utility/localStorageControl';
import { getCardInfo } from '../../../redux/actions/myTeamActions';
import { userTypes } from '../../../utility/constants/Constant';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state?.myTeams?.cardData);

  // const userData = useSelector(selectAuthUserData);
  const userData = getItem('userData');

  const TAB_NAMES = {
    ALL_TEAMS: 'Teams',
    CLIENT: 'Team/Talent',
    INVITED: 'Invited',
    JOIN_REQ: 'Join Request',
    FAV: 'Favorite',
  };

  const PATH_NAMES = {
    ALL_TEAMS: 'all',
    INVITED: 'invited',
    JOIN_REQ: 'join_request',
    FAV: 'favorite',
  };

  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {} }));
  }, []);

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.ALL_TEAMS)}>
        <Statbox
          isActive={selected === PATH_NAMES.ALL_TEAMS}
          isMarketPlaceTab
          title={selectCardData?.project_team ?? 0}
          desc={userData?.user_type === userTypes.client ? TAB_NAMES.CLIENT : TAB_NAMES.ALL_TEAMS}
          icon={<Users height={20} />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.INVITED)}>
        <Statbox
          isActive={selected === PATH_NAMES.INVITED}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={selectCardData?.invited ?? 0}
          desc={TAB_NAMES.INVITED}
          icon={<UserPlus height={20} />}
          color="light-dark-red"
        />
      </Col>
      {userData?.user_type === userTypes.talent ? (
        <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.JOIN_REQ)}>
          <Statbox
            isActive={selected === PATH_NAMES.JOIN_REQ}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.join_request ?? 0}
            desc={TAB_NAMES.JOIN_REQ}
            icon={<UserCheck height={20} />}
            color="light-success"
          />
        </Col>
      ) : null}
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.FAV)}>
        <Statbox
          isActive={selected === PATH_NAMES.FAV}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={selectCardData?.favourites ?? 0}
          desc={TAB_NAMES.FAV}
          icon={<Heart height={20} />}
          color="light-dark-red"
        />
      </Col>
    </Row>
  );
};

PrimaryFilter.propTypes = {
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
};
PrimaryFilter.defaultProps = {
  selected: 'all-listings',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
