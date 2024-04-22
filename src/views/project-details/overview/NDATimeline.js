/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText, UncontrolledAccordion } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useNavigate, useParams } from 'react-router-dom';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import { selectNDAData, selectNDATimeline } from '../../../redux/selectors/projectDetailsSelectors';
import { getProjectStatus, getTimeLineDotColor } from '../../../utility/Utils';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { getNDATimeline } from '../../../redux/actions/projectDetailsAction';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const NDATimeline = () => {
  const navigate = useNavigate();
  const ndaData = useSelector(selectNDAData);
  const contractTimeline = useSelector(selectNDATimeline);
  const dispatch = useDispatch();
  const param = useParams();
  const userData = useSelector(selectUserData);
  const loading = useSelector((state) => state?.projectDetails?.getNDATimelineLoading);
  // const docType = useSelector((state) => state?.projectDetails?.documentType?.doc_type);
  const [open, setOpen] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      if (id === 1 && !loading) {
        dispatch(getNDATimeline({ project_id: param?.projectId, doc_type: 'NDA' }));
      }
      setOpen(id);
    }
  };

  const bidUpdatesDataSet = [];
  contractTimeline?.timeline?.map((item) =>
    bidUpdatesDataSet.push({
      color: getTimeLineDotColor(item?.status),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{getProjectStatus({ status: item?.status, type: 'NDA' })}</h6>
            <span className="d-block mb-1">
              {item?.signed_on ? DateTime.fromMillis(item?.signed_on).toFormat('MMM dd, yy') : '-'}
            </span>
            {item?.status !== 'PROJECT_STARTED' && item?.status !== 'PROJECT_COMPLETED' && (
              <NameInfo name={item.name} info={item.role} img={item?.image_uri} />
            )}
          </div>
          <div className="meta-data">
            <span className="time ms-auto">
              {item?.signed_on ? DateTime?.fromMillis(item?.signed_on)?.toRelative() : '-'}
            </span>
            <span onClick={() => navigate(`doc/nda/${item?.document_id}`)} className="d-none card-cta">
              View submitted document
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
    <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
      <AccordionItem>
        <AccordionHeader onClick={() => toggle(1)} targetId="1" className="active-accordion-header">
          <AccordionHeadStyle>
            <div className="title-head">
              <span className="step d-block">STEP {userData?.userType === userTypes.client ? 3 : 2}</span>
              <span className="d-flex">
                NDA <span className="indicator" />
                {ndaData?.is_contract_terminated === false ? (
                  <span> {!ndaData?.is_signed ? <span className="indicator" /> : ''}</span>
                ) : (
                  ''
                )}
              </span>
            </div>

            {ndaData?.is_contract_terminated === false ? (
              <div>
                {ndaData?.is_signed ? (
                  <div className="d-flex gap-1 aling-items-center">
                    <CardText className="d-none view-card-cta">Give rating</CardText>
                    <CardText onClick={handleContract} className="view-card-cta">
                      View
                    </CardText>

                    <div className="d-flex gap-1 aling-items-center">
                      <div className="me-1">
                        <span className="key">Updated at</span>
                        <CardText className="value">
                          {ndaData?.updated_at ? DateTime.fromMillis(ndaData?.updated_at).toFormat('MMM dd, yy') : '-'}
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
                    {ndaData?.updated_at ? DateTime.fromMillis(ndaData?.updated_at).toFormat('MMM dd, yy') : '-'}
                  </CardText>
                </div>
              </div>
            )}
          </AccordionHeadStyle>
        </AccordionHeader>

        {loading ? (
          <ComponentSpinner />
        ) : bidUpdatesDataSet?.length > 0 ? (
          <AccordionBody accordionId="1" className="accordion-status-body">
            <div style={{ maxHeight: '27rem', overflowY: 'auto' }} className="pt-50 pe-50">
              <Timeline data={bidUpdatesDataSet} />
            </div>
          </AccordionBody>
        ) : null}
      </AccordionItem>
    </UncontrolledAccordion>
  );
};
export default NDATimeline;
