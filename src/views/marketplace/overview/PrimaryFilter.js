import React, { useEffect } from 'react';
import { ThumbsUp, User, Users, File } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import MoneyIcon from '@src/assets/images/money.png';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/marketPlaceActions';
import { userTypes } from '../../../utility/constants/Constant';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, isTab }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.marketPlace.cardData);
  const isLoading = useSelector((state) => state?.marketPlace?.cardInfoLoading);
  const isSecondaryLoading = useSelector((state) => state.marketPlace.loading);

  const userData = useSelector(selectAuthUserData);
  const userType = userData?.user_type;
  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {} }));
  }, []);

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
      <Col onClick={() => handlePrimaryCard('all_listings')}>
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
      {userType === userTypes.client ? (
        <Col onClick={() => handlePrimaryCard('my_listings')}>
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
      ) : (
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
      )}
      {userType === userTypes.client ? (
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
      ) : null}

      {(userType === userTypes.client || userType === userTypes.team) && (
        <Col onClick={() => handlePrimaryCard('talents')}>
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
      )}
      {(userType === userTypes.client || userType === userTypes.talent) && (
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
      )}

      {(userType === userTypes.talent || userType === userTypes.team) && (
        <>
          <Col onClick={() => handlePrimaryCard('clients')}>
            <Statbox
              isActive={selected === 'clients'}
              className={`stat-box ${isSecondaryLoading ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.clients ?? 0}
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
