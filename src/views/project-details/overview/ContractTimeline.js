import React from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';
import { selectContractTimeline, selectIsContract } from '../../../redux/selectors/projectDetailsSelectors';

const ContractTimeline = () => {
  const navigate = useNavigate();
  const isContract = useSelector(selectIsContract);
  const contractTimeline = useSelector(selectContractTimeline);
  const bidUpdatesDataSet = [];
  contractTimeline?.timeline.map((item) =>
    bidUpdatesDataSet.push({
      color: theme.purpleTimelimeColor,
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">Signed - Contract Document</h6>
            <span className="d-block mb-1">
              {item?.signed_on ? DateTime.fromMillis(item?.signed_on).toFormat('MMM dd, yy') : '-'}
            </span>
            <NameInfo name={item.name} info={item.role} />
          </div>
          <div className="meta-data">
            <span className="time">{item?.signed_on ? DateTime?.fromMillis(item?.signed_on)?.toRelative() : '-'}</span>
            {item.status === 'Bid Submitted' && <span className="card-cta">View</span>}
          </div>
        </div>
      ),
    }),
  );
  const handleContract = () => {
    navigate('doc/contract');
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">Contract</span>

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
                  Sign contract
                </span>
              </div>
            )}
          </div>
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
export default ContractTimeline;
