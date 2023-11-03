import React, { useEffect } from 'react';
import { Calendar, CheckSquare, FileMinus, Layers, UserX } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getCardInfo } from '../../../redux/actions/projectActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter, userType }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.project.cardData);
  const isLoading = useSelector((state) => state?.project?.cardInfoLoading);
  const isLoadingSecondaryFilter = useSelector((state) => state?.project?.loading);
  const selectProjectMetaData = useSelector((state) => state?.project?.metaData);
  useEffect(() => {
    dispatch(getCardInfo({ userType, onSuccess: () => {}, onError: () => {} }));
  }, []);

  if (isLoading && !selectCardData) {
    return <ComponentSpinner />;
  }
  return (
    <>
      <Row className="primary-row">
        <Col onClick={() => handlePrimaryChangeFilter('ongoing')}>
          <Statbox
            isActive={selected === 'ongoing'}
            isMarketPlaceTab
            title={selectCardData?.ongoing || 0}
            desc="Ongoing"
            icon={<Layers height={20} />}
            color="light-info"
            className="stat-box cursor-pointer"
          />
        </Col>
        <>
          <Col onClick={() => handlePrimaryChangeFilter('upcoming')}>
            <Statbox
              isActive={selected === 'upcoming'}
              isMarketPlaceTab
              title={selectCardData?.upcoming || 0}
              desc="Upcoming"
              icon={<Calendar height={20} />}
              color="light-blue"
              className="stat-box cursor-pointer"
            />
          </Col>
          <Col onClick={() => handlePrimaryChangeFilter('completed')}>
            <Statbox
              isActive={selected === 'completed'}
              className="stat-box cursor-pointer"
              isMarketPlaceTab
              title={selectCardData?.completed || 0}
              desc="Completed"
              icon={<CheckSquare height={20} />}
              color="light-green"
            />
          </Col>
        </>
        <>
          <Col onClick={() => handlePrimaryChangeFilter('terminated')}>
            <Statbox
              isActive={selected === 'terminated'}
              className="stat-box cursor-pointer"
              isMarketPlaceTab
              title={selectCardData?.terminated || 0}
              desc="Terminated"
              icon={<FileMinus height={20} />}
              color="light-dark-red"
            />
          </Col>
          <Col onClick={() => handlePrimaryChangeFilter('dispute')}>
            <Statbox
              isActive={selected === 'dispute'}
              className="stat-box cursor-pointer"
              isMarketPlaceTab
              title={selectCardData?.dispute || 0}
              desc="Disputed"
              icon={<UserX height={20} />}
              color="light-red"
            />
          </Col>
        </>
      </Row>
      <Row>
        <Col onClick={() => handlePrimaryChangeFilter('invited')}>
          <Statbox
            isActive={selected === 'invited'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={
              // eslint-disable-next-line no-nested-ternary
              selected === 'invited' && isLoadingSecondaryFilter
                ? selectCardData?.invited
                : selected === 'invited'
                ? selectProjectMetaData?.total_records
                : selectCardData?.invited
            }
            desc="Invited"
            icon={<UserX height={20} />}
            color="light-red"
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
