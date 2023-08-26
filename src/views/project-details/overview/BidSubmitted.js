import React, { useEffect, useState } from 'react';
import PdfIcon from '@src/assets/images/PDF.svg';

import { AccordionBody, AccordionHeader, AccordionItem, CardText } from 'reactstrap';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { AccordionHeadStyle } from '../style';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { getBidDetails } from '../../../redux/actions/projectDetailsAction';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';

const BidSubmitted = () => {
  const userData = useSelector(selectUserData);
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const param = useParams();
  const [bidModal, setBidModal] = useState(false);
  const toggleBidModal = () => setBidModal(!bidModal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.user_type !== userTypes.client) {
      dispatch(getBidDetails({ project_id: param?.projectId }));
    }
  }, []);

  const timelineEntries = {};
  bidInfo?.timeline?.forEach((entry) => {
    timelineEntries[entry.action] = entry.time;
  });

  const bidUpdates = [
    {
      status: 'Bid Declined',
      color: theme.red,
      isVisible: bidInfo?.status === 'DECLINED',
      time: timelineEntries?.['Bid Declined'] || '',
    },
    {
      status: 'Bid Accepted',
      color: theme.succesGreenBg,
      isVisible: bidInfo?.status === 'ACCEPTED',
      time: timelineEntries?.['Bid Accepted'] || '',
    },
    {
      status: 'Bid Reviewed',
      color: theme.orangeColor,
      isVisible: bidInfo?.status === 'REVIEWED' || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'DECLINED',
      time: timelineEntries?.['Bid Reviewed'] || '',
      user_details: {
        name: 'Client name',
        org_name: 'Org name',
      },
    },
    {
      status: 'Bid Submitted',
      color: theme.purpleTimelimeColor,
      isVisible: true,
      time: timelineEntries?.['Bid Submitted'] || '',
      bid_details: {
        duration: '5w',
        total_hours: '225h',
        talent_cost: '$1400',
        file: '',
      },
    },
  ].filter((item) => item.isVisible);

  const bidUpdatesDataSet = [];
  bidUpdates?.map((item) =>
    bidUpdatesDataSet.push({
      color: item.color,
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{item.status}</h6>
            <span className="d-block mb-1">
              {item?.time ? DateTime.fromMillis(item?.time).toFormat('MMM dd, yy') : '-'}
            </span>
            {item.user_details && <NameInfo name={item.user_details.name} info={item.user_details.org_name} />}

            {item.bid_details && (
              <>
                <div className="d-flex gap-1 mb-75">
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Duration: </h6>
                    <span className="">
                      {bidInfo?.total_estimated_duration?.duration}
                      {bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                    </span>
                  </span>
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Total Hours: </h6>
                    <span className="">{bidInfo?.total_numbers_of_hours}</span>
                  </span>
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Total Cost: </h6>
                    <span className="">${bidInfo?.total_estimated_cost}</span>
                  </span>
                </div>
                {bidInfo?.documents?.map((doc) => (
                  <a
                    key={doc?.created_at}
                    className="text-decoration-none"
                    href={doc?.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="d-flex gap-25 align-items-center">
                      <img src={PdfIcon} alt="pdficon" /> <h6 className="mb-0">{doc?.file_name}</h6>
                    </div>
                  </a>
                ))}
              </>
            )}
          </div>
          <div className="meta-data">
            <span className="time">{item?.time ? DateTime?.fromMillis(item?.time)?.toRelative() : '-'}</span>
            {item.status === 'Bid Submitted' && (
              <span className="card-cta" onClick={toggleBidModal}>
                View
              </span>
            )}
          </div>
        </div>
      ),
    }),
  );
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">Bid Submitted</span>

          <div className="d-flex gap-1 aling-items-center">
            <CardText className="d-none view-all-cta">Give rating</CardText>

            <div className="d-flex gap-1 aling-items-center">
              <div>
                <span className="key">Duration</span>
                <CardText className="value">
                  {bidInfo?.total_estimated_duration?.duration}
                  {bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                </CardText>
              </div>
              <div className="me-1">
                <span className="key">Talent Cost</span>
                <CardText className="value">${bidInfo?.total_estimated_cost}</CardText>
              </div>
            </div>
          </div>
        </AccordionHeadStyle>
      </AccordionHeader>
      <AccordionBody accordionId="1" className="accordion-status-body">
        <Timeline data={bidUpdatesDataSet} />
      </AccordionBody>
    </AccordionItem>
  );
};
export default BidSubmitted;
