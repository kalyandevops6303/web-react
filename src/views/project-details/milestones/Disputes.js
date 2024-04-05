import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearDispute } from '../../../redux/reducers/milestone';
import { MilestoneAccordionWrap } from './style';
import DateTime from '../../../lib/date-time';
import Empty from './NoDataComp';
import { disputeStatusEnum, disputeStatuses } from '../../../utility/constants/Constant';
import { getMilestoneDisputes } from '../../../redux/actions/milestoneActions';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { acceptDisputeApi } from '../../../redux/actions/disputeActions';
import { clearDisputeReplies } from '../../../redux/reducers/dispute';
import DisputeDetailsModal from '../../modals/DisputeDetailsMilestoneModal';
import DisputeClosedModal from '../../modals/DisputeClosedMilestoneModal';

const Disputes = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [disputeDetailsModal, setDisputeDetailsModal] = useState(null);
  const [disputeClosedModal, setDisputeClosedModal] = useState(null);

  const selectUserDetails = useSelector(selectUserData);

  const [hasMore, setHasMore] = useState(true);
  const disputes = useSelector((state) => state.milestone.milestoneDispute);
  const milestoneDisputeMetadata = useSelector((state) => state.milestone.milestoneDisputeMetadata);
  const milestoneDisputecurrentPreview = useSelector((state) => state.milestone.milestoneDisputeCurrentPreview);
  const isLoading = useSelector((state) => state.milestone.isMilestoneDisputeLoading);
  const metadata = { page: 1, page_size: 10 };

  const param = useParams();
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    setHasMore(true);
    if (milestoneDisputecurrentPreview?.length === 0 || disputes?.length === milestoneDisputeMetadata?.total_records) {
      setHasMore(false);
    }
  }, [milestoneDisputecurrentPreview]);

  useEffect(() => {
    if (open === '1') {
      dispatch(
        getMilestoneDisputes({
          milestoneId: param?.milestoneId,
          projectId: param?.projectId,
          metaData: { page: 1, page_size: 10 },
        }),
      );
    }
    return () => {
      dispatch(clearDispute());
    };
  }, [open]);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: milestoneDisputeMetadata?.current_page + 1 || 1,
    };
    dispatch(
      getMilestoneDisputes({
        metaData: newMeteData,
        projectId: param?.projectId,
        milestoneId: param?.milestoneId,
      }),
    );
  };
  const toggleDisputeDetailsModal = () => {
    setDisputeDetailsModal(!disputeDetailsModal);
  };

  const onDisputeClick = (dispute) => {
    dispatch(clearDisputeReplies());

    const { status, dispute_against, _id } = dispute;

    setSelectedDispute(dispute);

    const onAcceptSuccess = () => {
      dispatch(
        getMilestoneDisputes({
          projectId: param?.projectId,
          milestoneId: param?.milestoneId,
          metaData: { page: 1, page_size: 10 },
        }),
      );
      setDisputeDetailsModal(true);
    };
    if (status === disputeStatuses.open && dispute_against.includes(selectUserDetails._id)) {
      dispatch(acceptDisputeApi(_id, onAcceptSuccess));
    } else {
      setDisputeDetailsModal(true);
    }
  };

  const toggleDisputeClosedModal = () => {
    setDisputeClosedModal(!disputeClosedModal);
  };

  const handleDispute = () => {
    setDisputeDetailsModal(false);
    setDisputeClosedModal(true);
  };

  return (
    <MilestoneAccordionWrap className="mt-2 mb-5">
      <Accordion className="accordion-margin gray-card" open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            <span className="accordion-title">Disputes</span>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            {isLoading ? (
              <ComponentSpinner />
            ) : (
              <div className="mt-1 scroll-wrap" id="scrollDivFormilestoneDispute">
                <InfiniteScroll
                  dataLength={disputes?.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  scrollableTarget="scrollDivFormilestoneDispute"
                  loader={disputes?.length > 0 && <div className="d-flex justify-content-center mt-1">Loading...</div>}
                >
                  {disputes?.length === 0 ? (
                    <Empty message="No Dispute found!" />
                  ) : (
                    // <div className="w-100 medium-shadow overflow-auto">
                    <div className="px-75">
                      {disputes?.map((item) => (
                        <Card
                          className="dispute-card cursor-pointer mb-1"
                          key={item?._id}
                          onClick={() => onDisputeClick(item)}
                        >
                          <CardBody className="py-1">
                            <Row className="d-flex align-items-center">
                              <Col sm="12" md="6" lg="2">
                                <p className="mb-0 fw-bold font-medium-1">#{item?.dispute_number}</p>
                              </Col>
                              <Col sm="12" md="6" lg="6">
                                <p className="mb-0 fw-bold font-medium-1">
                                  Project name - {item?.project?.details?.name}
                                </p>
                              </Col>
                              <Col sm="12" md="6" lg="2" className="d-flex justify-content-end align-items-end">
                                <p className="mb-0 fw-bold font-medium-1">{disputeStatusEnum[item?.status]}</p>
                              </Col>
                              <Col sm="12" md="6" lg="2" className="d-flex justify-content-end">
                                <div>
                                  <p className="mb-0">Resolved On</p>
                                  <p className="mb-0 fw-bold font-medium-1 text-end">
                                    {item?.created_at > 0
                                      ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy')
                                      : '-'}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                    // </div>
                  )}
                </InfiniteScroll>
              </div>
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      {disputeDetailsModal && (
        <DisputeDetailsModal
          modal={disputeDetailsModal}
          toggleModal={toggleDisputeDetailsModal}
          selectedDispute={selectedDispute}
          onDispute={handleDispute}
        />
      )}
      {disputeClosedModal && (
        <DisputeClosedModal
          modal={disputeClosedModal}
          toggleModal={toggleDisputeClosedModal}
          selectedDispute={selectedDispute}
          onClose={() =>
            dispatch(
              getMilestoneDisputes({
                projectId: param?.projectId,
                milestoneId: param?.milestoneId,
                metaData: { page: 1, page_size: 10 },
              }),
            )
          }
        />
      )}
    </MilestoneAccordionWrap>
  );
};

export default Disputes;
