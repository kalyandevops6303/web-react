/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Users, UserPlus, UserCheck, Heart } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/myTeamActions';
import { userTypes } from '../../../utility/constants/Constant';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state?.myTeams?.cardData);

  // const userData = useSelector(selectAuthUserData);

  useEffect(() => {
    dispatch(getCardInfo({ userType, onSuccess: () => {}, onError: () => {} }));
  }, []);

  const TAB_NAMES = {
    ALL_TEAMS: 'Teams',
    CLIENT: 'Team/Talent',
    INVITED: 'Invited',
    JOIN_REQ: 'Join Request',
    FAV: 'Favourite',
    TEAM: 'Projects',
  };

  const PATH_NAMES = {
    ALL_TEAMS: 'my-teams',
    INVITED: 'my-teams/invitations',
    JOIN_REQ: 'my-teams/join-requests',
    FAV: 'my-teams/favourites',
  };

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.ALL_TEAMS)}>
        <Statbox
          isActive={selected === PATH_NAMES.ALL_TEAMS}
          isMarketPlaceTab
          title={
            selectCardData?.project_team
              ? selectCardData?.project_team
              : selectCardData?.teams_and_talents
              ? selectCardData?.teams_and_talents
              : selectCardData?.projects
          }
          desc={
            userType === userTypes.client
              ? TAB_NAMES.CLIENT
              : userType === userTypes.talent
              ? TAB_NAMES.ALL_TEAMS
              : TAB_NAMES.TEAM
          }
          icon={<Users height={20} />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.INVITED)}>
        <Statbox
          isActive={selected === PATH_NAMES.INVITED.split('/')[1]}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={selectCardData?.invited ?? 0}
          desc={TAB_NAMES.INVITED}
          icon={<UserPlus height={20} />}
          color="light-dark-red"
        />
      </Col>
      {userType !== userTypes.client ? (
        <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.JOIN_REQ)}>
          <Statbox
            isActive={selected === PATH_NAMES.JOIN_REQ.split('/')[1]}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.join_request ? selectCardData?.join_request : selectCardData?.join_requests ?? 0}
            desc={TAB_NAMES.JOIN_REQ}
            icon={<UserCheck height={20} />}
            color="light-success"
          />
        </Col>
      ) : null}
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.FAV)}>
        <Statbox
          isActive={selected === PATH_NAMES.FAV.split('/')[1]}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={selectCardData?.favourites ?? 0}
          desc={TAB_NAMES.FAV}
          icon={<Heart height={20} />}
          color="light-dark-red"
        />
      </Col>
      <Col>
        <div />
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
