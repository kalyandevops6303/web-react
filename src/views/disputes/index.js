/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { BookOpen, CheckCircle } from 'react-feather';
import RaiseDisputeModal from './overview/RaiseDisputeModal';
import Statbox from '../user-details/overview/Statbox';
import InfiniteScroll from '../../lib/infinite-scroll';
import DateTime from '../../lib/date-time';
import DisputeDetailsModal from './overview/DisputeDetailsModal';
import { acceptDisputeApi, getAllDisputes, getDisputesCount } from '../../redux/actions/disputeActions';
import { allDisputes, allDisputesLoading, disputesCount } from '../../redux/selectors/disputeSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import NoDataFoundGif from '../../assets/images/noDataFoundGif.gif';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { disputeStatusEnum, disputeStatuses } from '../../utility/constants/Constant';
import { clearDisputeReplies } from '../../redux/reducers/dispute';
import { DisputeWrapper } from './style';

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [disputeDetailsModal, setDisputeDetailsModal] = useState(null);

  const [selectedDispute, setSelectedDispute] = useState(null);

  const allDisputesIsLoading = useSelector(allDisputesLoading);
  const allDisputesData = useSelector(allDisputes);
  const selectUserDetails = useSelector(selectUserData);
  const disputesCountData = useSelector(disputesCount);

  const toggleRaiseDisputeModal = () => {
    setRaiseDisputeModal(!raiseDisputeModal);
  };

  const toggleDisputeDetailsModal = () => {
    setDisputeDetailsModal(!disputeDetailsModal);
  };

  const routesMatch = useMatch('/disputes/all') || useMatch('/disputes/open') || useMatch('/disputes/resolved');
  const isOpenView = useMatch('/disputes/open');
  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/disputes/${props}`);
  };

  useEffect(() => {
    if (primaryFilter === 'all') {
      dispatch(getAllDisputes(null, 1, 10, []));
    } else if (primaryFilter === 'open') {
      dispatch(getAllDisputes(disputeStatuses.open, 1, 10, []));
    } else if (primaryFilter === 'resolved') {
      dispatch(getAllDisputes(disputeStatuses.resolved, 1, 10, []));
    }

    dispatch(getDisputesCount());
  }, [primaryFilter]);

  const loadNewDisputes = () => {
    if (primaryFilter === 'all') {
      dispatch(getAllDisputes(null, allDisputesData?.metadata?.current_page + 1, 10, allDisputesData?.data));
    } else if (primaryFilter === 'open') {
      dispatch(
        getAllDisputes(disputeStatuses.open, allDisputesData?.metadata?.current_page + 1, 10, allDisputesData?.data),
      );
    } else if (primaryFilter === 'resolved') {
      dispatch(
        getAllDisputes(
          disputeStatuses.resolved,
          allDisputesData?.metadata?.current_page + 1,
          10,
          allDisputesData?.data,
        ),
      );
    }
  };

  const onAcceptSuccess = () => {
    if (primaryFilter === 'all') {
      dispatch(getAllDisputes(null, 1, 10, []));
    } else if (primaryFilter === 'open') {
      dispatch(getAllDisputes(disputeStatuses.open, 1, 10, []));
    } else if (primaryFilter === 'resolved') {
      dispatch(getAllDisputes(disputeStatuses.resolved, 1, 10, []));
    }
    dispatch(getDisputesCount());
    setDisputeDetailsModal(true);
  };

  const onDisputeClick = (dispute) => {
    dispatch(clearDisputeReplies());

    const { status, dispute_against, _id } = dispute;

    setSelectedDispute(dispute);

    if (status === disputeStatuses.open && dispute_against.includes(selectUserDetails._id)) {
      dispatch(acceptDisputeApi(_id, onAcceptSuccess));
    } else {
      setDisputeDetailsModal(true);
    }
  };

  const Listings = () => (
    <DisputeWrapper>
      {allDisputesData?.data?.length > 0 && (
        <Row className="d-flex align-items-center px-2 mb-2">
          <Col sm="12" md="6" lg="1">
            <p className="mb-0 fw-bolder font-small-3">Dispute #</p>
          </Col>
          <Col sm="12" md="6" lg="8">
            <p className="mb-0 fw-bolder font-small-3">Project Name</p>
          </Col>
          <Col sm="12" md="6" lg="3">
            <Row>
              <Col sm="12" md="6" lg="7" className="d-flex justify-content-end">
                <p className="mb-0 fw-bolder text-center font-small-3">Status</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {allDisputesIsLoading ? (
        <ComponentSpinner />
      ) : (
        <InfiniteScroll
          dataLength={allDisputesData?.data?.length || 0}
          next={loadNewDisputes}
          hasMore={allDisputesData?.metadata?.has_next_page}
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {allDisputesData?.data?.length > 0 ? (
            allDisputesData?.data?.map((item) => (
              <Card className="cursor-pointer mb-1" key={item?._id} onClick={() => onDisputeClick(item)}>
                <CardBody className="py-1">
                  <Row className="d-flex align-items-center min-height-3rem">
                    <Col sm="12" md="6" lg="1">
                      <p className="mb-0 fw-bold font-medium-1">#{item?.dispute_number}</p>
                    </Col>
                    <Col sm="12" md="6" lg="8">
                      <p className="mb-0 fw-bold font-medium-1">Project name - {item?.project?.details?.name}</p>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                      <Row>
                        <Col sm="12" md="6" lg="7" className="d-flex justify-content-end align-items-center">
                          <p className="mb-0 fw-bold font-medium-1">{disputeStatusEnum[item?.status]}</p>
                        </Col>
                        {isOpenView ? (
                          <Col sm="12" md="6" lg="5" className="d-flex justify-content-end">
                            <div>
                              <p className="mb-0">Opened On</p>
                              <p className="mb-0 fw-bold font-medium-1 text-end">
                                {item?.created_at > 0
                                  ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy')
                                  : '-'}
                              </p>
                            </div>
                          </Col>
                        ) : (
                          <Col sm="12" md="6" lg="5" className="d-flex justify-content-end">
                            <div>
                              <p className="mb-0">Resolved On</p>
                              <p className="mb-0 fw-bold font-medium-1 text-end">
                                {item?.resolved_on > 0
                                  ? DateTime.fromMillis(item?.resolved_on).toFormat('MMM dd, yy')
                                  : '-'}
                              </p>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="no-data-found-container d-flex flex-column align-items-center py-1">
              <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
              <p className="m-0 fw-bold font-medium-3">No Data Found</p>
            </div>
          )}
        </InfiniteScroll>
      )}
    </DisputeWrapper>
  );

  return (
    <>
      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          toggleModal={toggleRaiseDisputeModal}
          primaryFilter={primaryFilter}
        />
      )}
      {disputeDetailsModal && (
        <DisputeDetailsModal
          modal={disputeDetailsModal}
          toggleModal={toggleDisputeDetailsModal}
          selectedDispute={selectedDispute}
          primaryFilter={primaryFilter}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Disputes' }]} />
        <Button color="primary" className="mb-2" onClick={() => setRaiseDisputeModal(true)}>
          Raise Dispute
        </Button>
      </div>
      <Row className="primary-row">
        <Col sm="12" md="6" lg="3" onClick={() => handlePrimaryChangeFilter('open')}>
          <Statbox
            isMarketPlaceTab
            isActive={primaryFilter === 'open'}
            title={disputesCountData?.open_disputes}
            desc="Open"
            icon={<BookOpen size={40} />}
            color="light-purple"
            className="stat-box cursor-pointer"
          />
        </Col>
        <Col sm="12" md="6" lg="3" onClick={() => handlePrimaryChangeFilter('resolved')}>
          <Statbox
            isMarketPlaceTab
            isActive={primaryFilter === 'resolved'}
            title={disputesCountData?.resolved_disputes}
            desc="Resolved"
            icon={<CheckCircle size={40} />}
            color="light-success"
            className="stat-box cursor-pointer"
          />
        </Col>
      </Row>

      <Routes>
        <Route path="all" element={<Listings />} />
        <Route path="open" element={<Listings />} />
        <Route path="resolved" element={<Listings />} />
      </Routes>
    </>
  );
};

export default index;
