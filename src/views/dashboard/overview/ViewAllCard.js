/* eslint-disable no-nested-ternary */
import React from 'react';
import Proptypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import { ProjectWrapper } from './style';
import { AccordionName } from './DashboardConstant';

const ViewAllCard = ({ height, width, onViewAll, cta, accordionName }) => (
  <ProjectWrapper>
    <Card className="empty-card w-100">
      <CardBody
        className="empty empty-h-25 d-flex"
        style={{
          height,
          width,
          flexDirection: accordionName === AccordionName.myTeam ? 'row' : 'auto',
          alignItems: accordionName === AccordionName.myTeam ? 'end' : '',
        }}
      >
        <img
          src={
            accordionName === AccordionName.recommendedTeams ||
            accordionName === AccordionName.recommendedTalents ||
            accordionName === AccordionName.myTeam
              ? TeamNoDataGif
              : accordionName === AccordionName.upcomingProjects || accordionName === AccordionName.recommendedProjects
              ? UpcomingProjectsEmptyGif
              : accordionName === AccordionName.activeProjects
              ? ActiveProjectsEmptyGif
              : accordionName === AccordionName.payments
              ? PaymentsEmptyGif
              : TeamNoDataGif
          }
          style={{
            height: accordionName === AccordionName.myTeam ? '100%' : '65%',
            objectFit: 'contain',
            marginTop: '1rem',
          }}
          className="empty-gif object-fit-contain"
          alt="empty-gif"
        />
        <div
          onClick={onViewAll}
          className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
        >
          {cta || 'View All'}
        </div>
      </CardBody>
    </Card>
  </ProjectWrapper>
);

export default ViewAllCard;

ViewAllCard.propTypes = {
  height: Proptypes.string,
  width: Proptypes.string,
  onViewAll: Proptypes.func,
  cta: Proptypes.string,
  accordionName: Proptypes.string,
};

ViewAllCard.defaultProps = {
  height: '',
  width: '',
  onViewAll: () => {},
  cta: '',
  accordionName: '',
};
