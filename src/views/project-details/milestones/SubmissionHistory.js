import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, Link, MessageSquare } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, UncontrolledTooltip } from 'reactstrap';
import Avatar from '@components/avatar';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { SubmissionHistoryWrapper } from '../style';
import { downloadUploadedFile, handleLinkOpen, renderFilePreview } from '../../../utility/Utils';
import { MessageIconWrap } from '../../modals/style';
import theme from '../../../configs/themeVariables';
import { getSubmissionHistory } from '../../../redux/actions/milestoneActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearHistory } from '../../../redux/reducers/milestone';
import { MilestoneAccordionWrap } from './style';
import DateTime from '../../../lib/date-time';
import Empty from './NoDataComp';
import { userTypes } from '../../../utility/constants/Constant';

const SubmissionHistory = ({ selectedMilestone }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const subHistory = useSelector((state) => state.milestone.submissionHistory);
  const submissionHistoryMetadata = useSelector((state) => state.milestone.submissionHistoryMetadata);
  const submissionHistorycurrentPreview = useSelector((state) => state.milestone.submissionHistoryCurrentPreview);
  const isLoading = useSelector((state) => state.milestone.submissionHistoryLoading);
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
    if (
      submissionHistorycurrentPreview?.length === 0 ||
      subHistory?.length === submissionHistoryMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [submissionHistorycurrentPreview]);

  useEffect(() => {
    if (open === '1') {
      dispatch(getSubmissionHistory({ milestoneId: param?.milestoneId, metaData: { page: 1, page_size: 10 } }));
    }
    return () => {
      dispatch(clearHistory());
    };
  }, [open]);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: submissionHistoryMetadata?.current_page + 1 || 1,
    };
    dispatch(
      getSubmissionHistory({
        metaData: newMeteData,
        milestoneId: param?.milestoneId,
      }),
    );
  };

  return (
    <MilestoneAccordionWrap>
      <Accordion className="accordion-margin" open={open} toggle={toggle}>
        <AccordionItem className="">
          <AccordionHeader targetId="1">
            <span className="accordion-title">Submission History</span>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            {isLoading ? (
              <ComponentSpinner />
            ) : (
              <div className="mt-1 scroll-wrap" id="scrollDivForSubmissionHistory">
                <InfiniteScroll
                  dataLength={subHistory?.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  endMessage={
                    <div className="d-flex justify-content-center ">{subHistory?.length === 0 ? <Empty /> : ''}</div>
                  }
                  scrollableTarget="scrollDivForSubmissionHistory"
                  loader={
                    subHistory?.length > 0 && <div className="d-flex justify-content-center mt-1">Loading...</div>
                  }
                >
                  {subHistory?.length === 0 ? (
                    <Empty message="No Submission found!" />
                  ) : (
                    <SubmissionHistoryWrapper className="w-100 medium-shadow overflow-auto">
                      <table className="w-100">
                        <tr className="w-100 header table-row">
                          <td className="table-cell cell-file-name">
                            <p className="fw-bolder mb-0">FILE NAME</p>
                          </td>
                          <td className="table-cell cell-description">
                            <p className="fw-bolder mb-0">DESCRIPTION</p>
                          </td>
                          {selectedMilestone?.milestone_by?.entity === userTypes.team && (
                            <td className="table-cell cell-submitted-by">
                              <p className="fw-bolder mb-0">SUBMITTED BY</p>
                            </td>
                          )}
                          <td className="table-cell cell-submitted-on">
                            <p className="fw-bolder mb-0">SUBMITTED ON</p>
                          </td>
                          <td className="table-cell cell-action">
                            <p className="fw-bolder mb-0 ps-75">ACTION</p>
                          </td>
                        </tr>
                        {subHistory.map((file) => (
                          <tr key={file?._id} className="w-100 border-bottom table-row">
                            <td className="table-cell-td cell-file-name">
                              <div className="m-auto d-flex align-items-center">
                                {file?.url ? (
                                  <Link size="20" className="me-75" />
                                ) : (
                                  renderFilePreview({ name: file?.file_name })
                                )}
                                <span
                                  style={{ width: '11rem' }}
                                  className="truncated-filename mt-25"
                                  id={`tooltip-${file?._id}`}
                                >
                                  {file?.file_name ?? file?.url}
                                </span>
                                <UncontrolledTooltip placement="bottom" target={`tooltip-${file?._id}`}>
                                  {file?.file_name ?? file?.url}
                                </UncontrolledTooltip>
                              </div>
                            </td>

                            <td className="m-auto table-cell-td cell-description">
                              <p className="fw-normal m-auto">{file?.description}</p>
                            </td>
                            {selectedMilestone?.milestone_by?.entity === userTypes.team && (
                              <td className="table-cell-td cell-submitted-by">
                                <div className="d-flex justify-content-center">
                                  <Avatar
                                    onClick={() => navigate(`/profile/TALENT/${file?.talent_details?.user_id}`)}
                                    img={file?.talent_details?.image_uri || defaultAvatar}
                                    imgHeight="32"
                                    imgWidth="32"
                                    id={`tooltip-username-${file?._id}`}
                                  />
                                  <UncontrolledTooltip placement="bottom" target={`tooltip-username-${file?._id}`}>
                                    {file?.talent_details?.full_name || 'Data unavailble'}
                                  </UncontrolledTooltip>
                                </div>
                              </td>
                            )}
                            <td className="table-cell-td cell-submitted-on m-auto">
                              <p className="fw-normal m-auto">
                                {DateTime?.fromMillis(file?.created_at).toFormat(`dd MMM yyyy, hh:mm a`)}
                              </p>
                            </td>
                            <td className="m-auto table-cell-td cell-action">
                              <div className="fw-bold m-auto d-flex gap-1">
                                {file?.url ? (
                                  <MessageIconWrap onClick={() => handleLinkOpen(file?.url)}>
                                    <span className="mail-bg">
                                      <ExternalLink size={20} className="mail-icon" color={theme.activeColor} />
                                    </span>
                                  </MessageIconWrap>
                                ) : (
                                  <MessageIconWrap onClick={() => downloadUploadedFile({ file: file?.fileData?.file })}>
                                    <span className="mail-bg">
                                      <Download size={20} className="mail-icon" color={theme.activeColor} />
                                    </span>
                                  </MessageIconWrap>
                                )}
                                <MessageIconWrap>
                                  <span className="mail-bg">
                                    <MessageSquare size={20} className="mail-icon" color={theme.activeColor} />
                                  </span>
                                </MessageIconWrap>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </SubmissionHistoryWrapper>
                  )}
                </InfiniteScroll>
              </div>
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </MilestoneAccordionWrap>
  );
};

SubmissionHistory.propTypes = {
  selectedMilestone: Proptypes.object,
};
SubmissionHistory.defaultProps = {
  selectedMilestone: {},
};
export default SubmissionHistory;
