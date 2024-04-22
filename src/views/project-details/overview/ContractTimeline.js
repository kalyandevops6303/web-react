/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, CardText, UncontrolledAccordion } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useNavigate, useParams } from 'react-router-dom';
import { AccordionHeadStyle } from '../style';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import {
  projectDetails,
  selectContractData,
  selectContractTimeline,
} from '../../../redux/selectors/projectDetailsSelectors';
import { getProjectStatus, getTimeLineDotColor } from '../../../utility/Utils';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { getContractTimeline } from '../../../redux/actions/projectDetailsAction';

const ContractTimeline = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const loading = useSelector((state) => state?.projectDetails?.getContractTimelineLoading);

  const contractData = useSelector(selectContractData);
  const contractTimeline = useSelector(selectContractTimeline);
  const projectDetailsData = useSelector(projectDetails);
  const userType = useSelector(selectUserType);
  const bidUpdatesDataSet = [];
  const [open, setOpen] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      if (id === 1 && !loading) {
        dispatch(getContractTimeline({ project_id: param?.projectId, doc_type: 'CONTRACT' }));
      }
      setOpen(id);
    }
  };

  contractTimeline?.timeline?.map((item) =>
    bidUpdatesDataSet.push({
      color: getTimeLineDotColor(item?.status),
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div className="timeline-single-item">
            <h6 className="mb-25">{getProjectStatus({ status: item?.status, type: 'CONTRACT' })}</h6>
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
            {item?.status !== 'PROJECT_STARTED' && item?.status !== 'PROJECT_COMPLETED' && (
              <span onClick={() => navigate(`doc/contract/${item?.document_id}`)} className="d-none card-cta">
                View submitted document
              </span>
            )}
          </div>
        </div>
      ),
    }),
  );
  const handleContract = () => {
    navigate('doc/contract');
  };
  const handleRating = () => {
    navigate(`/project-details/${projectDetailsData?._id}/rating`);
  };
  const handlePayement = () => {
    navigate(`/project-details/${projectDetailsData?._id}/payment`);
  };
  return (
    <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
      <AccordionItem>
        <AccordionHeader onClick={() => toggle(1)} targetId="1" className="active-accordion-header">
          <AccordionHeadStyle>
            <div className="title-head">
              <span className="step d-block">
                STEP{' '}
                {(() => {
                  switch (userType) {
                    case userTypes.client:
                      return projectDetailsData?.nda?.is_nda ? 4 : 3;
                    default:
                      return projectDetailsData?.nda?.is_nda ? 3 : 2;
                  }
                })()}
              </span>
              <span className="d-flex">
                Contract
                {contractData?.is_contract_terminated === false ? (
                  <span> {!contractData?.is_signed ? <span className="indicator" /> : ''}</span>
                ) : (
                  ''
                )}
              </span>
            </div>

            {contractData?.is_contract_terminated === false ? (
              <div>
                {contractData?.is_signed ? (
                  <div className="d-flex gap-1 aling-items-center">
                    {userType === userTypes.client &&
                      contractData?.is_documents_signed &&
                      !contractData?.is_payment_made && (
                        <CardText className="view-card-cta" onClick={handlePayement}>
                          Make payment
                        </CardText>
                      )}
                    {projectDetailsData?.status === 'COMPLETED' ? (
                      <CardText className="view-card-cta" onClick={handleRating}>
                        Give rating
                      </CardText>
                    ) : (
                      <CardText onClick={handleContract} className="view-card-cta">
                        View
                      </CardText>
                    )}
                    <CardText className="d-none view-all-cta">Give rating</CardText>
                    <div className="d-flex gap-1 aling-items-center">
                      <div className="me-1">
                        <span className="key">Updated at</span>
                        <CardText className="value">
                          {contractData?.updated_at
                            ? DateTime.fromMillis(contractData?.updated_at).toFormat('MMM dd, yy')
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
            ) : (
              <div className="d-flex gap-1 aling-items-center">
                <div className="me-1">
                  <span className="key">Terminated at</span>
                  <CardText className="value">
                    {contractData?.contract_terminated_at
                      ? DateTime.fromMillis(contractData?.contract_terminated_at).toFormat('MMM dd, yy')
                      : '-'}
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
export default ContractTimeline;
