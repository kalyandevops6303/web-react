import React, { useEffect } from 'react';
import { ThumbsUp, User, Users, File } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import MoneyIcon from '@src/assets/images/money.png';
import ClientIcon from '@src/assets/images/client.svg';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/marketPlaceActions';
import { userTypes } from '../../../utility/constants/Constant';
import { selectAuthUserData, appPermissionsSelector } from '../../../redux/selectors/authSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import PermissionWrapper from '@/PermissionWrapper';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, isTab }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUserData);
  const selectCardData = useSelector((state) => state.marketPlace.cardData);
  const isLoading = useSelector((state) => state?.marketPlace?.cardInfoLoading);
  const isSecondaryLoading = useSelector((state) => state.marketPlace.loading);
  const appPermissions = useSelector(appPermissionsSelector);
  const isFlextern = useSelector((state) => state.auth?.flextern);
  const flexTern = userData?.app_roles?.[0].includes('FLEXTERN');


  const userType = userData?.user_type;
  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {}, flexTern: flexTern }));
  }, [flexTern]);

  if (isLoading && !selectCardData) {
    return <ComponentSpinner />;
  }

  const handlePrimaryCard = (filter) => {
    if (!isSecondaryLoading) {
      handlePrimaryChangeFilter(filter);
    }
  };

  return (
    <Row className="primary-row">
      <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.ALL_LISTINGS']}>
        <Col  md={5} lg={3} xl={2} onClick={() => handlePrimaryCard('all_listings')}>
          <Statbox
            isActive={selected === 'all_listings'}
            isMarketPlaceTab
            title={selectCardData?.all_listings ?? 0}
            desc="All Listings"
            icon={<img src={MoneyIcon} height={22} alt="money" />}
            color="light-warning"
            className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
          />
        </Col>
      </PermissionWrapper>
      {userType === userTypes.client ? (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.MY_LISTINGS']}>
          <Col md={5} lg={3} xl={2} onClick={() => handlePrimaryCard('my_listings')}>
            <Statbox
              isActive={selected === 'my_listings'}
              isMarketPlaceTab
              title={selectCardData?.my_listings ?? 0}
              desc="My Listings"
              icon={<ThumbsUp height={20} />}
              color="light-turquoise"
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
            />
          </Col>
        </PermissionWrapper>
      ) : (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.MY_BIDS']}>
          <Col onClick={() => handlePrimaryCard('my_bids')}>
            <Statbox
              isActive={selected === 'my_bids'}
              isMarketPlaceTab
              title={selectCardData?.my_bids ?? 0}
              desc="My Bids"
              icon={<ThumbsUp height={20} />}
              color="light-turquoise"
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
            />
          </Col>
        </PermissionWrapper>
      )}
      {userType === userTypes.client ? (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.BIDS_RECEIVED']}>
          <Col onClick={() => handlePrimaryCard('my_bids')}>
            <Statbox
              isActive={selected === 'my_bids'}
              isMarketPlaceTab
              title={selectCardData?.bids_received ?? 0}
              desc="Bid Received"
              icon={<File height={20} />}
              color="light-primary"
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
            />
          </Col>
        </PermissionWrapper>
      ) : null}

      {(userType === userTypes.client || userType === userTypes.team) && (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.TALENTS']}>
          <Col md={5} lg={3} xl={2} onClick={() => handlePrimaryCard('talents')}>
            <Statbox
              isActive={selected === 'talents'}
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.talents ?? 0}
              desc="Talent"
              icon={<User height={20} />}
              color="light-purple"
            />
          </Col>
        </PermissionWrapper>
      )}
      {(userType === userTypes.client || userType === userTypes.talent) && (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.TEAMS']}>
          <Col onClick={() => handlePrimaryCard('teams')}>
            <Statbox
              isActive={selected === 'teams'}
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.teams ?? 0}
              desc="Teams"
              icon={<Users height={20} />}
              color="light-purple"
            />
          </Col>
        </PermissionWrapper>
      )}

      {(userType === userTypes.talent || userType === userTypes.team) && (
        <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.CLIENTS']}>
          <Col onClick={() => handlePrimaryCard('clients')}>
            <Statbox
              isActive={selected === 'clients'}
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.clients ?? 0}
              desc="Clients"
              icon={<img src={ClientIcon} height={22} alt="client" />}
              color="light-primary"
            />
          </Col>
          {!isTab && userType !== userTypes.team && (
            <Col>
              <div />
            </Col>
          )}
        </PermissionWrapper>
      )}
      {!isTab && userType === userTypes.team && (
        <Col>
          <div />
        </Col>
      )}
    </Row>
  );
};

PrimaryFilter.propTypes = {
  isTab: PropTypes.bool,
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
};
PrimaryFilter.defaultProps = {
  isTab: false,
  selected: 'all-listings',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
