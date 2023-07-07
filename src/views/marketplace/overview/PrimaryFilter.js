import React, { useEffect } from 'react';
import { DollarSign, ThumbsUp, Users } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getItem } from '../../../utility/localStorageControl';
import { getCardInfo } from '../../../redux/actions/marketPlaceActions';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, isTab, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.marketPlace.cardData);

  // const userData = useSelector(selectAuthUserData);
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
          icon={<DollarSign height={20} />}
          color="light-warning"
          className="stat-box cursor-pointer"
        />
      </Col>
      {userType === 'CLIENT' && (
        <>
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
          <Col onClick={() => handlePrimaryChangeFilter('talents')}>
            <Statbox
              isActive={selected === 'talents'}
              className="stat-box cursor-pointer"
              isMarketPlaceTab
              title={selectCardData?.talents}
              desc="Talent"
              icon={<Users height={20} />}
              color="light-purple"
            />
          </Col>
        </>
      )}

      {userType === 'TALENT' && (
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
          {!isTab && (
            <Col>
              <div />
            </Col>
          )}
        </>
      )}
      {!isTab && (
        <>
          <Col>
            <div />
          </Col>
          <Col>
            <div />
          </Col>
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
