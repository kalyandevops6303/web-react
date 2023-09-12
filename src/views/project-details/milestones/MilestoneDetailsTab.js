/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import { Button, Card, CardText, Input, Label, Spinner } from 'reactstrap';
import Avatar from '@components/avatar';
import Proptypes from 'prop-types';
import { ExternalLink, Link, Plus, Trash2 } from 'react-feather';
import { useSelector } from 'react-redux';

import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { formatDate } from '../../../utility/Utils';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { acceptMilestoneService, submitMilestoneService } from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';

const MilestoneDetailsTab = ({ selectedMilestone }) => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [links, setLinks] = useState(selectedMilestone.links);
  const [isLoading, setIsLoading] = useState(false);
  const [teamButtonText, setTeamButtonText] = useState('Submit');
  const [clientButtonText, setClientButtonText] = useState('Accept');

  const userDataLocal = useSelector(selectAuthUserData);

  const submitMilestone = async () => {
    setIsLoading(true);
    try {
      setTeamButtonText('Submitting...');
      await submitMilestoneService(selectedMilestone._id, {
        links,
        documents: selectedMilestone.documents,
      });
      setTeamButtonText('Submitted');
    } catch (error) {
      errorHandler(error);
      setTeamButtonText('Submit');
    }
    setIsLoading(false);
  };

  const acceptMilestone = async () => {
    setIsLoading(true);
    try {
      setClientButtonText('Accepting...');
      await acceptMilestoneService(selectedMilestone._id);
      setClientButtonText('Accepted');
    } catch (error) {
      errorHandler(error);
      setClientButtonText('Accept');
    }
    setIsLoading(false);
  };

  return (
    <div>
      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          toggleModal={() => setRaiseDisputeModal(!raiseDisputeModal)}
          primaryFilter="all"
        />
      )}
      <Card className="gray-card">
        <div className="mb-3 d-flex gap-5">
          <div>
            <CardText className="fw-normal mb-0 fs-6">Start</CardText>
            <CardText className="fw-bolder fs-5 mb-0">{formatDate(selectedMilestone.start_date)}</CardText>
          </div>
          <div>
            <CardText className="fw-normal mb-0 fs-6">Duration</CardText>
            <CardText className="fw-bolder fs-5 mb-0">{`${
              selectedMilestone.estimated_duration.duration
            }${selectedMilestone.estimated_duration.duration_type?.[0]?.toLocaleLowerCase()}`}</CardText>
          </div>
          {selectedMilestone.numbers_of_hours ? (
            <div>
              <CardText className="fw-normal mb-0 fs-6">Hours/week</CardText>
              <CardText className="fw-bolder fs-5 mb-0">{selectedMilestone.numbers_of_hours} hr</CardText>
            </div>
          ) : null}
          <div>
            <CardText className="fw-normal mb-0 fs-6">Talent Cost</CardText>
            <CardText className="fw-bolder fs-5 mb-0">$ {selectedMilestone.estimated_cost}</CardText>
          </div>
          <div>
            <CardText className="fw-normal mb-0 fs-6">Status</CardText>
            <CardText className="fw-bolder fs-5 mb-0">
              {selectedMilestone.status === 'IN_PROGRESS' ? 'In Progress' : 'In Review'}
            </CardText>
          </div>
        </div>
        <div className="white-card w-100">
          <CardText className="fw-bolder fs-4 mb-1">Milestone Name</CardText>
          <CardText className="fw-normal mb-3 fs-6">{selectedMilestone.name}</CardText>
          <CardText className="fw-bolder fs-4 mb-1">Description</CardText>
          <CardText className="fw-normal mb-0 fs-6">{selectedMilestone.description}</CardText>
        </div>
        <hr className="my-2" />
        <div className="white-card w-100">
          <CardText className="fw-bolder fs-4 mb-1">Milestone Deliverables</CardText>
          {links.map((item, index) =>
            userDataLocal.user_type === userTypes.client ? (
              <div
                className="white-card d-flex mb-1 px-1 medium-shadow align-items-center justify-content-between py-16"
                // eslint-disable-next-line react/no-array-index-key
                key={`links-${index}`}
              >
                <div className="d-flex">
                  <Link size="18" className="me-1" />
                  <p className="mb-0">{item}</p>
                </div>
                <Avatar
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    window.open(item, '_blank');
                  }}
                  color="light-primary"
                  icon={<ExternalLink size="14" />}
                  className=""
                />
              </div>
            ) : (
              <div
                className="white-card d-flex mb-1 px-1 medium-shadow align-items-end justify-content-between py-16"
                // eslint-disable-next-line react/no-array-index-key
                key={`links-${index}`}
              >
                <div className="w-50">
                  <Label>Link</Label>
                  <Input
                    value={item}
                    onChange={(e) => {
                      setLinks([...links.slice(0, index), e.target.value, ...links.slice(index + 1)]);
                    }}
                  />
                </div>
                <Trash2 className="color-danger me-1 mb-1" />
              </div>
            ),
          )}
          {userDataLocal.user_type === userTypes.client ? null : (
            <div
              onClick={() => setLinks([...links, ''])}
              className="d-flex mt-1 fs-5 color-primary align-items-center cursor-pointer fw-bold"
            >
              <Avatar color="light-primary" icon={<Plus size="14" />} className="me-1" />
              Add Link
            </div>
          )}
        </div>
      </Card>
      <div className="d-flex justify-content-end">
        <Button className="me-2 raise-dispute-btn" onClick={() => setRaiseDisputeModal(true)}>
          Raise Dispute
        </Button>
        {userDataLocal.user_type === userTypes.client ? (
          <Button onClick={() => acceptMilestone()} disabled={clientButtonText !== 'Accept'} color="primary">
            {isLoading ? <Spinner className="me-1" size="sm" /> : null}
            {clientButtonText}
          </Button>
        ) : (
          <Button onClick={() => submitMilestone()} disabled={teamButtonText !== 'Submit'} color="primary">
            {isLoading ? <Spinner className="me-1" size="sm" /> : null}
            {teamButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

MilestoneDetailsTab.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
};

export default MilestoneDetailsTab;
