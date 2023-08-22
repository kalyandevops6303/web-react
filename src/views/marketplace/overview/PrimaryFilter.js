import React, { useEffect } from 'react';
import { ThumbsUp, User, Users } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import MoneyIcon from '@src/assets/images/money.png';
import Statbox from '../../user-details/overview/Statbox';
import { getItem } from '../../../utility/localStorageControl';
import { getCardInfo } from '../../../redux/actions/marketPlaceActions';
import { userTypes } from '../../../utility/constants/Constant';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, isTab, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.marketPlace.cardData);

  const userData = getItem('userData');

  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {} }));
  }, []);

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter('all_listings')}>
        <Statbox
          isActive={selected === 'all_listings'}
          isMarketPlaceTab
          title={selectCardData?.all_listings}
          desc="All Listings"
          icon={<img src={MoneyIcon} height={22} alt="money" />}
          color="light-warning"
          className="stat-box cursor-pointer"
        />
      </Col>
      {userType === userTypes.client ? (
        <Col onClick={() => handlePrimaryChangeFilter('my_listings')}>
          <Statbox
            isActive={selected === 'my_listings'}
            isMarketPlaceTab
            title={selectCardData?.my_listings}
            desc="My Listings"
            icon={<ThumbsUp height={20} />}
            color="light-turquoise"
            className="stat-box cursor-pointer"
          />
        </Col>
      ) : (
        <Col onClick={() => handlePrimaryChangeFilter('my_bids')}>
          <Statbox
            isActive={selected === 'my_bids'}
            isMarketPlaceTab
            title={selectCardData?.my_bids}
            desc="My Bids"
            icon={<ThumbsUp height={20} />}
            color="light-turquoise"
            className="stat-box cursor-pointer"
          />
        </Col>
      )}

      {(userType === userTypes.client || userType === userTypes.team) && (
        <Col onClick={() => handlePrimaryChangeFilter('talents')}>
          <Statbox
            isActive={selected === 'talents'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.talents}
            desc="Talent"
            icon={<User height={20} />}
            color="light-purple"
          />
        </Col>
      )}
      {(userType === userTypes.client || userType === userTypes.talent) && (
        <Col onClick={() => handlePrimaryChangeFilter('teams')}>
          <Statbox
            isActive={selected === 'teams'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.teams}
            desc="Teams"
            icon={<Users height={20} />}
            color="light-purple"
          />
        </Col>
      )}

      {(userType === userTypes.talent || userType === userTypes.team) && (
        <>
          <Col onClick={() => handlePrimaryChangeFilter('clients')}>
            <Statbox
              isActive={selected === 'clients'}
              className="stat-box cursor-pointer"
              isMarketPlaceTab
              title={selectCardData?.clients}
              desc="Clients"
              icon={<Users height={20} />}
              color="light-purple"
            />
          </Col>
          {!isTab && userType !== userTypes.team && (
            <Col>
              <div />
            </Col>
          )}
        </>
      )}
      {!isTab && (userType === userTypes.team || userType === userTypes.client) && (
        <>
          <Col>
            <div />
          </Col>
          {/* <Col>
            <div />
          </Col> */}
        </>
      )}
    </Row>
  );
};

PrimaryFilter.propTypes = {
  isTab: PropTypes.bool,
  userType: PropTypes.string,
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
};
PrimaryFilter.defaultProps = {
  isTab: false,
  userType: '',
  selected: 'all-listings',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
