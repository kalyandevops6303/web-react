import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import Nobidgif from '@src/assets/images/gifs/no_bids.gif';

import { ProjectWrapper } from './style';
import { AccordionName } from './DashboardConstant';

const ExtraCardWithCount = ({ height, width, onViewAll, count, accordionName }) => {
  const getEmptyGifSource = () => {
    switch (accordionName) {
      case AccordionName.recommendedTeams:
      case AccordionName.recommendedTalents:
      case AccordionName.myTeam:
        return TeamNoDataGif;
      case AccordionName.upcomingProjects:
      case AccordionName.recommendedProjects:
        return UpcomingProjectsEmptyGif;
      case AccordionName.activeProjects:
        return ActiveProjectsEmptyGif;
      case AccordionName.payments:
        return PaymentsEmptyGif;
      case AccordionName.receivedBids:
        return Nobidgif;
      default:
        return TeamNoDataGif;
    }
  };

  return (
    <ProjectWrapper>
      <Card className="empty-card  w-100">
        <CardBody
          className="empty empty-h-25 d-flex justify-content-start"
          style={{
            height: `${height}px`,
            width: `${width}px`,
            flexDirection: accordionName === AccordionName.myTeam ? 'row' : 'auto',
            alignItems: accordionName === AccordionName.myTeam ? 'end' : '',
          }}
        >
          <img
            src={getEmptyGifSource()}
            style={{
              height: accordionName === AccordionName.myTeam ? '100%' : '65%',
              objectFit: 'contain',
              marginTop: '1rem',
              marginBottom: height > 300 ? '-2rem' : 'auto',
            }}
            className="empty-gif object-fit-contain"
            alt="empty-gif"
          />
          <div
            onClick={onViewAll}
            className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
          >
            {`+ ${count} more`}
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

ExtraCardWithCount.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  onViewAll: PropTypes.func,
  count: PropTypes.number,
  accordionName: PropTypes.string,
};

ExtraCardWithCount.defaultProps = {
  height: '',
  width: '',
  onViewAll: () => {},
  count: '',
  accordionName: '',
};

export default ExtraCardWithCount;
