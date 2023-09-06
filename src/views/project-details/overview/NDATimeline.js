import React from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import theme from '../../../configs/themeVariables';
import NameInfo from '../../../@core/components/name-info';
import { selectNDATimeline } from '../../../redux/selectors/projectDetailsSelectors';

const NDATimeline = () => {
  const documentTimeline = useSelector(selectNDATimeline);
  const bidUpdatesDataSet = [];
  documentTimeline?.timeline.map((item) =>
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
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">NDA</span>

          <div className="d-flex gap-1 aling-items-center">
            <CardText className="d-none view-all-cta">Give rating</CardText>
            <CardText className="view-all-cta">View</CardText>

            <div className="d-flex gap-1 aling-items-center">
              <div className="me-1">
                <span className="key">Updated at</span>
                <CardText className="value">
                  {documentTimeline?.updated_at
                    ? DateTime.fromMillis(documentTimeline?.updated_at).toFormat('MMM dd, yy')
                    : '-'}
                </CardText>
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
export default NDATimeline;
