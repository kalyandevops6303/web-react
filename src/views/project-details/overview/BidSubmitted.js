import React, { useState } from 'react';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardText,
  UncontrolledAccordion,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DateTime from '../../../lib/date-time';
import Round from '../../../lib/round';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';
import BidPreviewModal from '../../modals/BidPreviewModal';

import Empty from './Empty';
import { acceptBidChange, getBidTimeline } from '../../../redux/actions/projectDetailsAction';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import BidChangeRequestModal from '../../modals/BidChangeRequestModal';
import AcceptBidModal from '../../modals/AcceptBidModal';
import RejectBidChangeModal from '../../modals/RejectBidChangeModal';

const BidSubmitted = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const param = useParams();
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const loading = useSelector((state) => state.projectDetails.getBidInfoLoading);
  const bidTimeline = useSelector((state) => state.projectDetails.bidTimeline);
  const bidTimelineLoading = useSelector((state) => state.projectDetails.getBidTimelineLoading);
  const isBidAccepting = useSelector((state) => state.projectDetails.acceptBidChangeLoading);
  const [open, setOpen] = useState(null);
  const [bidRequestModal, setBidRequestModal] = useState(false);
  const [acceptBidModal, setAcceptBidModal] = useState(false);
  const [rejectBidModal, setRejectBidModal] = useState(false);
  const [bidModal, setBidModal] = useState(false);
  const toggleBidModal = () => setBidModal(!bidModal);
  const toggleAccepetModal = () => setAcceptBidModal(!acceptBidModal);
  const toggleRejectBidModal = () => setRejectBidModal(!rejectBidModal);
  const navigate = useNavigate();

  const [selectedTimeline, setSelectedTimeline] = useState();

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      if (id === 1 && !bidTimelineLoading) {
        dispatch(getBidTimeline({ project_id: param?.projectId }));
      }
      setOpen(id);
    }
  };
  const status = {
    BID_UPDATED: 'BID_UPDATED',
    BID_REVIEWED: 'BID_REVIEWED',
    BID_ACCEPTED: 'BID_ACCEPTED',
    BID_SUBMITTED: 'BID_SUBMITTED',
    BID_CHANGE_ACCPETED: 'BID_CHANGE_ACCEPTED',
    BID_CHANGE_REJECTED: 'BID_CHANGE_REJECTED',
    BID_CHANGE_REQUEST: 'BID_CHANGE_REQUEST',
  };

  const getStatusColor = (action) => {
    switch (action) {
      case status.BID_UPDATED:
        return theme.purpleTimelimeColor;
      case status.BID_REVIEWED:
        return theme.orangeColor;
      case status.BID_ACCEPTED:
        return theme.timelineSuccessColor;
      case status.BID_SUBMITTED:
        return theme.purpleTimelimeColor;
      case status.BID_CHANGE_ACCPETED:
        return theme.timelineSuccessColor;
      case status.BID_CHANGE_REJECTED:
        return theme.red;
      default:
        return theme.purpleTimelimeColor; // Default color if status is not recognized
    }
  };

  const getBidAction = (action) => {
    switch (action) {
      case status.BID_UPDATED:
        return 'Bid Updated';
      case status.BID_REVIEWED:
        return 'Bid Reviewed';
      case status.BID_ACCEPTED:
        return 'Bid Accepted';
      case status.BID_SUBMITTED:
        return 'Bid Submitted';
      case status.BID_CHANGE_REQUEST:
        return 'Bid change Request';
      case status.BID_CHANGE_ACCPETED:
        return 'Bid change Accepted';
      case status.BID_CHANGE_REJECTED:
        return 'Bid change Rejected';
      default:
        return '';
    }
  };

  const handleViewBid = (item) => {
    toggleBidModal();
    setSelectedTimeline(item);
  };

  const onEditBidClick = () => {
    if (bidInfo?.bid_by?.entity === userTypes.talent) {
      navigate(
        `/create-bid/${bidInfo?.project_id}/${bidInfo?.project_type.toLowerCase()}-${bidInfo?.bid_type.toLowerCase()}/${
          bidInfo?._id
        }/milestone`,
      );
    } else {
      navigate(
        `/create-bid/${bidInfo?.project_id}/${bidInfo?.project_type.toLowerCase()}-${bidInfo?.bid_type.toLowerCase()}/${
          bidInfo?._id
        }/team`,
      );
    }
  };

  const bidUpdatesDataSet = [];
  bidTimeline?.timeline?.map((item) =>
    bidUpdatesDataSet.push({
      color: getStatusColor(item?.action),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div className="timeline-single-item">
            <h6 className={`mb-25 ${item?.action === status.BID_CHANGE_REJECTED ? 'color-red' : ''}`}>
              {getBidAction(item?.action)}
            </h6>
            <span className="d-block mb-1">
              {item?.time ? DateTime.fromMillis(item?.time).toFormat('MMM dd, yy') : '-'}
            </span>
            <NameInfo name={item?.by_entity?.name} info={item?.by_entity?.role} img={item?.by_entity?.image} />
            {item?.description && <CardText className="mt-1 word-wrap">{item?.description}</CardText>}{' '}
          </div>
          <div className="meta-data">
            <span className="time ms-auto">{item?.time ? DateTime?.fromMillis(item?.time)?.toRelative() : '-'}</span>

            {item?.can_edit &&
            (item?.action === status.BID_CHANGE_REQUEST || item?.action === status.BID_CHANGE_REJECTED) ? (
              <CardText className="card-cta" onClick={onEditBidClick}>
                Edit Bid
              </CardText>
            ) : (
              (item?.action === status.BID_UPDATED || item?.action === status.BID_SUBMITTED) && (
                <CardText onClick={() => handleViewBid(item)} className="card-cta">
                  View Bid
                </CardText>
              )
            )}
          </div>
        </div>
      ),
    }),
  );

  const handleCancel = () => {
    setBidRequestModal(false);
    setAcceptBidModal(false);
  };
  const handleBidChangeRequest = () => {
    setBidRequestModal(true);
  };

  const handleReject = () => {
    setBidModal(false);
    setRejectBidModal(true);
  };
  const handleAccept = () => {
    setBidModal(false);
    setAcceptBidModal(true);
  };
  const onAcceptSuccess = () => {
    toggleAccepetModal();
  };
  const onAccept = () => {
    dispatch(
      acceptBidChange({
        snapshot_id: selectedTimeline?.snapshot_id,
        project_id: param?.projectId,
        onSuccess: onAcceptSuccess,
      }),
    );
  };

  const BidTimelineAccordion = (
    <div>
      <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
        <AccordionItem>
          <AccordionHeader onClick={() => toggle(1)} targetId="1">
            <AccordionHeadStyle>
              <span className="title-head">
                {userData?.user_type === userTypes.client ? 'Accepted Bid' : 'Bid Submitted'}
              </span>

              <div className="d-flex gap-1 aling-items-center">
                <CardText className="d-none view-all-cta">Give rating</CardText>

                <div className="d-flex gap-1 aling-items-center">
                  <div>
                    <span className="key">Duration</span>
                    <CardText className="value text-end">
                      {bidInfo?.total_estimated_duration?.duration}
                      {bidInfo?.total_estimated_duration?.duration_type?.charAt(0).toLowerCase()}
                    </CardText>
                  </div>
                  <div className="">
                    <span className="key">Talent Amount</span>
                    <CardText className="value text-end">${Round(bidInfo?.total_estimated_cost || 0, 2)}</CardText>
                  </div>
                  <div className="me-1">
                    <span className="key">Updated at</span>

                    <CardText className="value text-end">
                      {bidInfo?.updated_at ? DateTime.fromMillis(bidInfo?.updated_at).toFormat('MMM dd, yy') : ''}
                    </CardText>
                  </div>
                </div>
              </div>
            </AccordionHeadStyle>
          </AccordionHeader>

          {loading || bidTimelineLoading ? (
            <ComponentSpinner />
          ) : (
            <AccordionBody accordionId="1" className="accordion-status-body">
              {userData?.user_type === userTypes.client && (
                <div
                  className={`d-flex justify-content-end mb-2 card-cta${
                    bidTimeline?.can_request_changes ? '' : '-disabled'
                  } `}
                >
                  <CardText onClick={bidTimeline?.can_request_changes ? handleBidChangeRequest : null}>
                    Bid Change Request
                  </CardText>
                </div>
              )}
              <div style={{ maxHeight: '40rem', overflowY: 'auto', paddingRight: '0.5rem', paddingTop: '0.5rem' }}>
                {bidTimeline?.timeline ? <Timeline data={bidUpdatesDataSet} /> : <Empty message="No data found" />}
              </div>
            </AccordionBody>
          )}
          {bidModal && (
            <BidPreviewModal
              onReject={handleReject}
              onAccept={handleAccept}
              selectedTimeline={selectedTimeline}
              modal={bidModal}
              toggleModal={toggleBidModal}
            />
          )}
        </AccordionItem>
        {bidRequestModal && <BidChangeRequestModal modal={bidRequestModal} toggleModal={handleCancel} />}
        {/* {acceptBidModal && (
          <AcceptBidModal selectedTimeline={selectedTimeline} modal={acceptBidModal} toggleModal={toggleAccepetModal} />
        )} */}

        {acceptBidModal && (
          <AcceptBidModal
            modalData={{
              name: bidInfo?.bid_by?.name,
              role: bidInfo?.bid_by?.user_type === userTypes.team ? 'Team Name' : bidInfo?.bid_by?.role,
              value: bidInfo?.total_estimated_cost,
            }}
            modal={acceptBidModal}
            toggleModal={handleCancel}
            data={bidInfo}
            onAccept={onAccept}
            isLoading={isBidAccepting}
          />
        )}
        {rejectBidModal && (
          <RejectBidChangeModal
            selectedTimeline={selectedTimeline}
            modal={rejectBidModal}
            toggleModal={toggleRejectBidModal}
          />
        )}
      </UncontrolledAccordion>
    </div>
  );

  return (
    <div>
      {userData?.user_type !== userTypes.client && BidTimelineAccordion}

      {/* For Client if accepted bid is not present it will show disabled card  */}
      {userData?.user_type === userTypes.client && (
        <div>
          {bidInfo?.status === 'ACCEPTED' ? (
            BidTimelineAccordion
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className="d-flex fw-bold mb-0 disabled-color">Accepted Bid</CardText>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
export default BidSubmitted;
