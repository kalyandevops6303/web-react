import React from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import { selectIsNDA, selectNDATimeline } from '../../../redux/selectors/projectDetailsSelectors';
import { getProjectStatus, getTimeLineDotColor } from '../../../utility/Utils';

const NDATimeline = () => {
  const navigate = useNavigate();
  const isContract = useSelector(selectIsNDA);
  const contractTimeline = useSelector(selectNDATimeline);
  const bidUpdatesDataSet = [];
  contractTimeline?.timeline.map((item) =>
    bidUpdatesDataSet.push({
      color: getTimeLineDotColor(item?.status),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{getProjectStatus(item?.status)}</h6>
            <span className="d-block mb-1">
              {item?.signed_on ? DateTime.fromMillis(item?.signed_on).toFormat('MMM dd, yy') : '-'}
            </span>
            {item?.status !== 'PROJECT_STARTED' && item?.status !== 'PROJECT_COMPLETED' && (
              <NameInfo name={item.name} info={item.role} img={item?.image_uri} />
            )}
          </div>
          <div className="meta-data">
            <span className="time">{item?.signed_on ? DateTime?.fromMillis(item?.signed_on)?.toRelative() : '-'}</span>
            <span onClick={() => navigate(`doc/nda/${item?.document_id}`)} className="card-cta">
              View
            </span>
          </div>
        </div>
      ),
    }),
  );
  const handleContract = () => {
    navigate('doc/nda');
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">NDA</span>

          {isContract?.is_contract_terminated === false ? (
            <div>
              {isContract?.is_signed ? (
                <div className="d-flex gap-1 aling-items-center">
                  <CardText className="d-none view-all-cta">Give rating</CardText>
                  <CardText onClick={handleContract} className="view-all-cta">
                    View
                  </CardText>

                  <div className="d-flex gap-1 aling-items-center">
                    <div className="me-1">
                      <span className="key">Updated at</span>
                      <CardText className="value">
                        {contractTimeline?.updated_at
                          ? DateTime.fromMillis(contractTimeline?.updated_at).toFormat('MMM dd, yy')
                          : '-'}
                      </CardText>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-75 d-flex gap-50 align-items-center">
                  <span onClick={handleContract} className="card-cta">
                    Sign NDA
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="d-flex gap-1 aling-items-center">
              <div className="me-1">
                <span className="key">Updated at</span>
                <CardText className="value">
                  {contractTimeline?.updated_at
                    ? DateTime.fromMillis(contractTimeline?.updated_at).toFormat('MMM dd, yy')
                    : '-'}
                </CardText>
              </div>
            </div>
          )}
        </AccordionHeadStyle>
      </AccordionHeader>
      {bidUpdatesDataSet?.length > 0 && (
        <AccordionBody accordionId="1" className="accordion-status-body">
          <div style={{ maxHeight: '27rem', overflowY: 'auto' }} className="pe-50">
            <Timeline data={bidUpdatesDataSet} />
          </div>
        </AccordionBody>
      )}
    </AccordionItem>
  );
};
export default NDATimeline;
