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
import PermissionWrapper from '@/PermissionWrapper';
import { appPermissionsSelector } from '@/redux/selectors/authSelectors';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state?.myTeams?.cardData);
  const isLoading = useSelector((state) => state?.myTeams?.cardInfoLoading);
  const isLoadingSecondaryFilter = useSelector((state) => state?.myTeams?.loading);
  const appPermissions = useSelector(appPermissionsSelector);
  const selectMyTeamMetaData = useSelector((state) => state?.myTeams?.metaData);

  useEffect(() => {
    dispatch(getCardInfo({ userType, onSuccess: () => {}, onError: () => {} }));
  }, []);
  const TAB_NAMES = {
    TEAMS: 'Teams',
    CLIENTS: 'Clients',
    TALENTS: 'Team Members',
    JOIN_REQ: 'Join Requests',
    FAV: 'Favorites',
    RECOMMENDATION: 'Recommended',
  };

  const PATH_NAMES = {
    TEAMS: 'teams',
    CLIENTS: 'clients',
    TALENTS: 'talents',
    JOIN_REQ: 'join_requests',
    FAV: 'favourites',
    RECOMMENDATION: 'recommendation',
  };

  if (isLoading && !selectCardData) {
    return <ComponentSpinner />;
  }

  const handlePrimaryCard = (filter) => {
    if (!isLoadingSecondaryFilter) {
      handlePrimaryChangeFilter(filter);
    }
  };

  return (
    <Row className="primary-row">
      {userType !== userTypes.team && (
        <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.TEAMS']}>
          <Col onClick={() => handlePrimaryCard(PATH_NAMES.TEAMS)}>
            <Statbox
              isActive={selected === PATH_NAMES.TEAMS}
              isMarketPlaceTab
              title={selectCardData?.teams}
              desc={TAB_NAMES.TEAMS}
              icon={<Users height={20} />}
              color="light-turquoise"
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
            />
          </Col>
        </PermissionWrapper>
      )}
      {userType !== userTypes.talent && (
        <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.TEAM_MEMBERS']}>
          <Col onClick={() => handlePrimaryCard(PATH_NAMES.TALENTS)}>
            <Statbox
              isActive={selected === PATH_NAMES.TALENTS}
              isMarketPlaceTab
              title={selectCardData?.talent}
              desc={TAB_NAMES.TALENTS}
              icon={<Users height={20} />}
              color="light-turquoise"
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
            />
          </Col>
        </PermissionWrapper>
      )}

      {userType !== userTypes.client && (
        <Col onClick={() => handlePrimaryCard(PATH_NAMES.CLIENTS)}>
          <Statbox
            isActive={selected === PATH_NAMES.CLIENTS}
            isMarketPlaceTab
            title={selectCardData?.clients ?? 0}
            desc={TAB_NAMES.CLIENTS}
            icon={<Users height={20} />}
            color="light-turquoise"
            className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
          />
        </Col>
      )}
      <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.RECOMMENDED']}>
        <Col onClick={() => handlePrimaryCard(PATH_NAMES.RECOMMENDATION)}>
          <Statbox
            isActive={selected === PATH_NAMES.RECOMMENDATION}
            isMarketPlaceTab
            title={
              selected === PATH_NAMES.RECOMMENDATION && isLoadingSecondaryFilter
                ? selectCardData?.recommended
                : selected === PATH_NAMES.RECOMMENDATION
                ? selectMyTeamMetaData?.total_records
                : selectCardData?.recommended
            }
            desc={TAB_NAMES.RECOMMENDATION}
            icon={<ThumbsUp height={20} />}
            color="light-warning"
            className="stat-box cursor-pointer"
          />
        </Col>
      </PermissionWrapper>

      {userType !== userTypes.client ? (
        <Col onClick={() => handlePrimaryCard(PATH_NAMES.JOIN_REQ)}>
          <Statbox
            isActive={selected === PATH_NAMES.JOIN_REQ}
            className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
            isMarketPlaceTab
            title={
              selected === PATH_NAMES.JOIN_REQ && isLoadingSecondaryFilter
                ? selectCardData?.join_request || selectCardData?.join_requests
                : selected === PATH_NAMES.JOIN_REQ
                ? selectMyTeamMetaData?.total_records
                : selectCardData?.join_request || selectCardData?.join_requests
            }
            desc={TAB_NAMES.JOIN_REQ}
            icon={<UserCheck height={20} />}
            color="light-success"
          />
        </Col>
      ) : null}
      <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.FAVOURITES']}>
        <Col onClick={() => handlePrimaryCard(PATH_NAMES.FAV)}>
          <Statbox
            isActive={selected === PATH_NAMES.FAV}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.favorite ?? 0}
            desc={TAB_NAMES.FAV}
            icon={<Heart height={20} />}
            color="light-dark-red"
          />
        </Col>
      </PermissionWrapper>

      {userType === userTypes.client && (
        <Col>
          <div />
        </Col>
      )}
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
