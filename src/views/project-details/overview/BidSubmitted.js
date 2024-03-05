import React, { useState } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FileText } from 'react-feather';
import { DateTime } from 'luxon';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';
import BidPreviewModal from '../../modals/BidPreviewModal';
import { downloadFile } from '../../../utility/Utils';
import { downloadUrlLoading } from '../../../redux/selectors/dashboardSelectors';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';

const BidSubmitted = () => {
  const dispatch = useDispatch();

  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const [bidModal, setBidModal] = useState(false);
  const [selectedFileKey, setSelectedFileKey] = useState(null);
  const toggleBidModal = () => setBidModal(!bidModal);

  const timelineEntries = {};
  bidInfo?.timeline?.forEach((entry) => {
    timelineEntries[entry.action] = {
      time: entry.time,
      name: entry?.name,
      role: entry?.role,
      image_uri: entry?.image_uri,
    };
  });

  const bidUpdates = [
    {
      status: 'Bid Closed',
      color: theme.red,
      isVisible: bidInfo?.status === 'REJECTED',
      time: timelineEntries?.['Bid Rejected']?.time || '',
    },
    {
      status: 'Bid Accepted',
      color: theme.succesGreenBg,
      isVisible: bidInfo?.status === 'ACCEPTED',
      time: timelineEntries?.['Bid Accepted']?.time || '',
    },
    {
      status: 'Bid Reviewed',
      color: theme.orangeColor,
      isVisible: bidInfo?.status === 'REVIEWED' || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'REJECTED',
      time: timelineEntries?.['Bid Reviewed']?.time || '',
      user_details: {
        name: timelineEntries?.['Bid Reviewed']?.name || 'Client',
        org_name: timelineEntries?.['Bid Reviewed']?.role || 'Organisation',
        img: timelineEntries?.['Bid Reviewed']?.image_uri,
      },
    },
    {
      status: 'Bid Submitted',
      color: theme.purpleTimelimeColor,
      isVisible: true,
      time: timelineEntries?.['Bid Submitted']?.time || '',
      bid_details: {
        duration: '5w',
        total_hours: '225h',
        talent_cost: '$1400',
        file: '',
      },
    },
  ].filter((item) => item.isVisible);

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

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
            {item.user_details && (
              <NameInfo img={item?.user_details?.img} name={item.user_details.name} info={item.user_details.org_name} />
            )}

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
                  {bidInfo?.total_numbers_of_hours ? (
                    <span className="d-flex align-items-center gap-25">
                      <h6 className="mb-0">Total Hours: </h6>
                      <span className="">{bidInfo?.total_numbers_of_hours}h</span>
                    </span>
                  ) : (
                    ''
                  )}
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Total Cost: </h6>
                    <span className="">${bidInfo?.total_estimated_cost}</span>
                  </span>
                </div>
                {bidInfo?.documents?.map((doc) => (
                  <div key={doc?.file_key}>
                    {downloadUrlIsLoading && selectedFileKey === doc?.file_key ? (
                      <div className="d-flex align-items-center justify-content-between">
                        <Spinner color="primary" />
                      </div>
                    ) : (
                      <div
                        className="d-flex align-items-center mb-75 cursor-pointer"
                        style={{ color: theme.activeColor }}
                        onClick={() => {
                          setSelectedFileKey(doc?.file_key);
                          dispatch(
                            getDownloadUrl({
                              fileKey: doc?.file_key,
                              onSuccess: onDownloadResumeUrlSuccess,
                              fileName: doc?.file_name,
                            }),
                          );
                        }}
                      >
                        <FileText size="18" className="me-50" />
                        <p className="mb-0 fw-bold">{doc?.file_name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="meta-data">
            <span className="time">{item?.time ? DateTime?.fromMillis(item?.time)?.toRelative() : '-'}</span>
            {item.status === 'Bid Submitted' && (
              <span className="card-cta" onClick={toggleBidModal}>
                View Bid
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
                <CardText className="value text-end">
                  {bidInfo?.total_estimated_duration?.duration}
                  {bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                </CardText>
              </div>
              <div className="me-1">
                <span className="key">Talent Cost</span>
                <CardText className="value text-end">${bidInfo?.total_estimated_cost}</CardText>
              </div>
            </div>
          </div>
        </AccordionHeadStyle>
      </AccordionHeader>
      <AccordionBody accordionId="1" className="accordion-status-body">
        <Timeline data={bidUpdatesDataSet} />
      </AccordionBody>
      {bidModal && <BidPreviewModal modal={bidModal} toggleModal={toggleBidModal} />}
    </AccordionItem>
  );
};
export default BidSubmitted;
