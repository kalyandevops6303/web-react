import React, { useEffect } from 'react';
import { Calendar, CheckSquare, FileMinus, Flag, Layers } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/projectActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import PlusUsers from '../../../assets/images/PlusUsers.svg';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.project.cardData);
  const isLoading = useSelector((state) => state?.project?.cardInfoLoading);
  const isLoadingSecondaryFilter = useSelector((state) => state?.project?.loading);
  useEffect(() => {
    dispatch(getCardInfo({ userType, onSuccess: () => {}, onError: () => {} }));
  }, []);

  if (isLoading && !selectCardData) {
    return <ComponentSpinner />;
  }

  const handlePrimaryCard = (filter) => {
    if (!isLoadingSecondaryFilter) {
      handlePrimaryChangeFilter(filter);
    }
  };
  return (
    <>
      <Row className="primary-row">
        <Col onClick={() => handlePrimaryCard('ongoing')}>
          <Statbox
            isActive={selected === 'ongoing'}
            isMarketPlaceTab
            title={selectCardData?.ongoing || 0}
            desc="Ongoing"
            icon={<Layers height={20} />}
            color="light-info"
            className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
          />
        </Col>
        <>
          <Col onClick={() => handlePrimaryCard('upcoming')}>
            <Statbox
              isActive={selected === 'upcoming'}
              isMarketPlaceTab
              title={selectCardData?.upcoming || 0}
              desc="Upcoming"
              icon={<Calendar height={20} />}
              color="light-blue"
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
            />
          </Col>
          <Col onClick={() => handlePrimaryCard('completed')}>
            <Statbox
              isActive={selected === 'completed'}
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.completed || 0}
              desc="Completed"
              icon={<CheckSquare height={20} />}
              color="light-green"
            />
          </Col>
        </>
        <>
          <Col onClick={() => handlePrimaryCard('terminated')}>
            <Statbox
              isActive={selected === 'terminated'}
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.terminated || 0}
              desc="Terminated"
              icon={<FileMinus height={20} />}
              color="light-dark-red"
            />
          </Col>
          <Col onClick={() => handlePrimaryCard('dispute')}>
            <Statbox
              isActive={selected === 'dispute'}
              className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
              isMarketPlaceTab
              title={selectCardData?.dispute || 0}
              desc="Disputed"
              icon={<Flag height={20} />}
              color="light-red"
            />
          </Col>
        </>
      </Row>
      <Row>
        <Col onClick={() => handlePrimaryCard('invited')}>
          <Statbox
            isActive={selected === 'invited'}
            className={`stat-box ${isLoadingSecondaryFilter ? '' : ' cursor-pointer'}`}
            isMarketPlaceTab
            title={selectCardData?.invited || 0}
            desc="Invited"
            icon={<img alt="users" src={PlusUsers} height={24} width={24} className="no-border-radius" />}
            color="light-purple-2"
          />
        </Col>
        <Col>
          <div />
        </Col>
        <Col>
          <div />
        </Col>
        <Col>
          <div />
        </Col>
        <Col>
          <div />
        </Col>
      </Row>
    </>
  );
};

PrimaryFilter.propTypes = {
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
  userType: PropTypes.string,
};
PrimaryFilter.defaultProps = {
  selected: 'ongoing',
  handlePrimaryChangeFilter: () => {},
  userType: '',
};

export default PrimaryFilter;
