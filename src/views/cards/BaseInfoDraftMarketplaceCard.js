import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { BidsReceivedWrapper, DraftSkillsAndToolsContainer } from './style';

const BaseInfoDraftMarketplaceCard = ({ data, setDeleteDraftModal }) => {
  const navigate = useNavigate();

  const project = data?.project;

  return (
    <div>
      <div>
        {project?.skills_required?.length ? (
          <BadgeGroup
            title="Skills"
            data={project?.skills_required}
            color="light-blue"
            id={`tooltip-skills-project-${data?._id}`}
          />
        ) : (
          <DraftSkillsAndToolsContainer>
            <p className="heading mb-50">Skills</p>
            <p className="empty-text">
              <i>(Add Skills)</i>
            </p>
          </DraftSkillsAndToolsContainer>
        )}
        {project?.tools_required?.length ? (
          <BadgeGroup
            title="Tools"
            data={project?.tools_required}
            color="light-blue"
            id={`tooltip-tools-project-${data?._id}`}
          />
        ) : (
          <DraftSkillsAndToolsContainer>
            <p className="heading mb-50">Tools</p>
            <p className="empty-text">
              <i>(Add Tools)</i>
            </p>
          </DraftSkillsAndToolsContainer>
        )}
      </div>
      <BidsReceivedWrapper>
        <div className="d-flex justify-content-end mt-3">
          <Button
            color="flat-danger"
            className="me-1"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDraftModal(true);
            }}
          >
            Delete Draft
          </Button>
          <div className="relist-btn-wrapper">
            <Button
              color="primary"
              outline
              className="relist-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-project/${project?._id}`);
              }}
            >
              Edit Draft
            </Button>
          </div>
        </div>
      </BidsReceivedWrapper>
    </div>
  );
};

BaseInfoDraftMarketplaceCard.propTypes = {
  data: PropTypes.object,
  setDeleteDraftModal: PropTypes.func,
};

BaseInfoDraftMarketplaceCard.defaultProps = {
  data: {},
  setDeleteDraftModal: () => {},
};

export default BaseInfoDraftMarketplaceCard;
