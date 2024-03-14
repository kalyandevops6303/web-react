import React, { useEffect, useState } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText, UncontrolledAccordion } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';
import BidPreviewModal from '../../modals/BidPreviewModal';
import Empty from './Empty';
import { getBidDetails } from '../../../redux/actions/projectDetailsAction';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const BidSubmitted = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const loading = useSelector((state) => state.projectDetails.getBidInfoLoading);
  const [bidModal, setBidModal] = useState(false);
  const toggleBidModal = () => setBidModal(!bidModal);
  const [open, setOpen] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const status = {
    BID_UPDATED: 'BID_UPDATED',
    BID_REVIEWED: 'BID_REVIEWED',
    BID_ACCEPTED: 'BID_ACCEPTED',
    BID_SUBMITTED: 'BID_SUBMITTED',
    BID_CHANGE_ACCPETED: 'BID_CHANGE_ACCPETED',
    BID_CHANGE_REJECTED: 'BID_CHANGE_REJECTED',
    BID_CHANGE_REQUEST: 'BID_CHANGE_REQUEST',
  };

  const getStatusColor = (bid_action) => {
    switch (bid_action) {
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

  const getBidAction = (bid_action) => {
    switch (bid_action) {
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
  const param = useParams();

  useEffect(() => {
    if (open === 1) {
      dispatch(getBidDetails({ project_id: param?.projectId }));
    }
    // }
  }, [open]);

  const bidUpdatesDataSet = [];
  bidInfo?.timeline?.map((item) =>
    bidUpdatesDataSet.push({
      color: getStatusColor(item?.bid_action),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className={`mb-25 ${item?.bid_action === status.BID_CHANGE_REJECTED ? 'color-red' : ''}`}>
              {getBidAction(item?.bid_action)}
            </h6>
            <span className="d-block mb-1">
              {item?.created_at ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') : '-'}
            </span>
            <NameInfo name={item?.entity?.name} info={item?.entity?.role} img={item?.entity?.image} />
            {item?.change_request && <CardText className="mt-1">{item?.change_request}</CardText>}{' '}
          </div>
          <div className="meta-data">
            <span className="time ms-auto">
              {item?.created_at ? DateTime?.fromMillis(item?.created_at)?.toRelative() : '-'}
            </span>
            {(item?.bid_action === status.BID_UPDATED || item?.bid_action === status.BID_SUBMITTED) && (
              <span className="card-cta">View Bid</span>
            )}
          </div>
        </div>
      ),
    }),
  );

  return (
    <UncontrolledAccordion onClick={() => toggle(1)} className="accordion-timeline" defaultOpen="0">
      <AccordionItem>
        <AccordionHeader targetId="1">
          <AccordionHeadStyle>
            <span className="title-head">
              {userData?.user_type === userTypes.client ? 'Accpeted Bid' : 'Bid Submitted'}{' '}
            </span>

            <div className="d-flex gap-1 aling-items-center">
              <CardText className="d-none view-all-cta">Give rating</CardText>

              <div className="d-flex gap-1 aling-items-center">
                <div>
                  <span className="key">Duration</span>
                  <CardText className="value text-end">
                    {bidInfo?.duration}
                    {bidInfo?.duration_type?.charAt(0).toLowerCase()}
                  </CardText>
                </div>
                <div className="">
                  <span className="key">Talent Cost</span>
                  <CardText className="value text-end">${bidInfo?.talent_cost}</CardText>
                </div>
                <div className="me-1">
                  <span className="key">Updated at</span>
                  <CardText className="value text-end">Time</CardText>
                </div>
              </div>
            </div>
          </AccordionHeadStyle>
        </AccordionHeader>
        {loading ? (
          <ComponentSpinner />
        ) : (
          <AccordionBody accordionId="1" className="accordion-status-body">
            {bidInfo?.timeline ? <Timeline data={bidUpdatesDataSet} /> : <Empty message="No data found" />}
          </AccordionBody>
        )}
        {bidModal && <BidPreviewModal modal={bidModal} toggleModal={toggleBidModal} />}
      </AccordionItem>
    </UncontrolledAccordion>
  );
};
export default BidSubmitted;
