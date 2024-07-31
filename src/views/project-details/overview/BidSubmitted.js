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
import classnames from 'classnames';
import DateTime from '../../../lib/date-time';
import Round from '../../../lib/round';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import BidPreviewModal from '../../modals/BidPreviewModal';

import Empty from './Empty';
import { acceptBidChange, getBidTimeline } from '../../../redux/actions/projectDetailsAction';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { selectSavedUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import { bidStages, bidStatus, userTypes } from '../../../utility/constants/Constant';
import BidChangeRequestModal from '../../modals/BidChangeRequestModal';
import AcceptBidModal from '../../modals/AcceptBidModal';
import RejectBidChangeModal from '../../modals/RejectBidChangeModal';
import { convertUnixTimestampToDate, getBidAction, getStatusColor } from '../../../utility/Utils';
import { Elevate } from '../../styled';

const BidSubmitted = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const param = useParams();
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const snapshotData = useSelector((state) => state.projectDetails.snapshotData);
  const loading = useSelector((state) => state.projectDetails.getBidInfoLoading);
  const bidTimeline = useSelector((state) => state.projectDetails.bidTimeline);
  const bidTimelineLoading = useSelector((state) => state.projectDetails.getBidTimelineLoading);
  const isBidAccepting = useSelector((state) => state.projectDetails.acceptBidChangeLoading);
  const snapshotData = useSelector((state) => state.projectDetails.snapshotData);
  const activeStage = useSelector((state) => state.projectDetails.activeStage);
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
  const savedUserData = useSelector(selectSavedUserData);
  const bidUpdatesDataSet = [];
  bidTimeline?.timeline?.map((item) =>
    bidUpdatesDataSet.push({
      color: getStatusColor(item?.action),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div className="timeline-single-item">
            <h6 className={`mb-25 ${item?.action === bidStatus.BID_CHANGE_REJECTED ? 'color-red' : ''}`}>
              {getBidAction(item?.action)}
            </h6>
            <span className="d-block mb-1">
              {/* {item?.time ? DateTime.fromMillis(item?.time).toFormat('MMM dd, yy') : '-'} */}
              {convertUnixTimestampToDate(item?.time, savedUserData?.availability?.timezone?.name)}
            </span>
            <NameInfo name={item?.by_entity?.name} info={item?.by_entity?.role} img={item?.by_entity?.image} />
            {item?.description && <CardText className="mt-1 word-wrap">{item?.description}</CardText>}{' '}
          </div>
          <div className="meta-data">
            <span className="time ms-auto">{item?.time ? DateTime?.fromMillis(item?.time)?.toRelative() : '-'}</span>

            {item?.can_edit &&
            (item?.action === bidStatus.BID_CHANGE_REQUEST || item?.action === bidStatus.BID_CHANGE_REJECTED) ? (
              <CardText className="card-cta" onClick={onEditBidClick}>
                Edit Bid
              </CardText>
            ) : (
              (item?.action === bidStatus.BID_UPDATED || item?.action === bidStatus.BID_SUBMITTED) && (
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
    dispatch(getBidDetails({project_id: param?.projectId}))
    dispatch(getBidTimeline({project_id: param?.projectId}))
  };
  const onAccept = () => {
    dispatch(
      acceptBidChange({
        snapshot_id: selectedTimeline?.snapshot_id,
        project_id: param?.projectId,
        onSuccess: onAcceptSuccess,
        bid_id: bidInfo?._id,
      }),
    );
  };

  const BidTimelineAccordion = (
    <Elevate active={activeStage === bidStages.BID_SUBMITTED || activeStage === bidStages.ACCEPTED_BID}>
      <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
        <AccordionItem>
          <AccordionHeader
            onClick={() => toggle(1)}
            targetId="1"
            className={classnames({
              'active-accordion-header': false,
            })}
          >
            <AccordionHeadStyle>
              <div className="title-head">
                {/* If Client, step = 2
              If Talent, step = 1 */}
                <span className="step d-block">STEP {userData?.user_type === userTypes.client ? 2 : 1}</span>
                <span className="d-flex">
                  {userData?.user_type === userTypes.client ? 'Accepted Bid' : 'Bid Submitted'}
                  <span className="d-none indicator" />
                </span>
              </div>

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
                      {convertUnixTimestampToDate(bidInfo?.updated_at, savedUserData?.availability?.timezone?.name)}
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
              value: snapshotData?.bid?.total_estimated_cost,
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
    </Elevate>
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
              <CardBody
                className={classnames('basic-title', 'sign-accordion-header', { 'active-accordion-header': false })}
              >
                <div className="d-flex justify-content-between">
                  <div className="title-head">
                    <span className="step d-block">STEP {userData?.user_type === userTypes.client ? 2 : 1}</span>
                    <CardText className="d-flex fw-bold mb-0 disabled-color">Accepted Bid</CardText>
                  </div>
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
