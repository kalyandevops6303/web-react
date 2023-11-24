/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Users, Heart } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getClubCardInfo } from '../../../redux/actions/clubActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state?.clubs?.cardData);
  const isLoading = useSelector((state) => state?.clubs?.cardInfoLoading);

  useEffect(() => {
    dispatch(getClubCardInfo({ onSuccess: () => {}, onError: () => {} }));
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
          title={selectCardData?.my_clubs}
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
          title={selectCardData?.favorites}
          desc={TAB_NAMES.FAV}
          icon={<Heart height={20} />}
          color="light-dark-red"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter(PATH_NAMES.ALL_CLUBS)}>
        <Statbox
          isActive={selected === PATH_NAMES.ALL_CLUBS}
          title={selectCardData?.all_clubs}
          desc={TAB_NAMES.ALL_CLUBS}
          icon={<Users height={20} />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>
      <Col>
        <div />
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
};
PrimaryFilter.defaultProps = {
  selected: 'my_clubs',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
