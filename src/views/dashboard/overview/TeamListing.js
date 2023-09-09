/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import CardSkeleton from '@src/assets/images/gifs/card_skeleton.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';

import TeamTalentCard from './TeamTalentCard';
import TeamInvitationCard from './TeamInvitationCard';
import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace } from '../../../utility/Utils';

import {
  profilePercentage,
  selectGetMyTeam,
  selectGetMyTeamLoading,
  selectRecommendedTeams,
  selectRecommendedTeamsLoading,
  selectTeamInvitation,
  selectTeamInvitationLoading,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import { getMyTeam, getRecommendedTeams, getTeamInvitation } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { userTypes } from '../../../utility/constants/Constant';
import MyTeamCard from './MyTeamCard';

const Empty = ({ active, recommended, isTeam, payment, isEducationNotCompleted }) => {
  const navigate = useNavigate();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const onAddDetailsClick = (path) => {
    navigate(path, {
      state: { isEditing: true },
    });
  };
  return (
    <ProjectWrapper>
      <Card className="empty-card">
        <CardBody className="empty empty-h-25">
          <div>
            {active && <img src={ActiveProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {recommended && <img src={UpcomingProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {payment && <img src={PaymentsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {active && (
              <CardText className="get-started">
                Lets get you <br /> started!
              </CardText>
            )}
            {isTeam && <img src={TeamNoDataGif} className="empty-gif" alt="empty-gif" />}

            {payment && (
              <CardText className="font-weight-normal get-started">
                No Upcoming <br /> Payment
              </CardText>
            )}
          </div>
          {active && (
            <div
              onClick={() => navigate('/marketplace/all_listings')}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Explore Projects
            </div>
          )}
          {isEducationNotCompleted && recommended ? (
            <div
              onClick={() =>
                onAddDetailsClick(
                  returnDetailsForMarketPlace(userDetailsData?.user_type, profilePercentageData?.values_missing)?.path,
                )
              }
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Complete your profile <br /> to get started!
            </div>
          ) : recommended ? (
            <div
              onClick={() => navigate('/marketplace/all_listings')}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Explore Projects
            </div>
          ) : (
            <div className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer">
              Explore Teams
            </div>
          )}
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

const AccordionHeadStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .view-all-cta {
    display: none;
    font-size: 0.875rem;
    color: ${theme.activeColor};
    text-decoration: underline;
    margin-right: 1rem;
    font-weight: 400;
  }
`;

const TeamListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePercentageData = useSelector(profilePercentage);

  const toggle = (id) => (open === id ? setOpen(null) : setOpen(id));

  useEffect(() => {
    if (open === '1') {
      dispatch(getMyTeam());
    }
    if (open === '2') {
      dispatch(getTeamInvitation());
    }
    if (open === '3') {
      dispatch(getRecommendedTeams());
    }
  }, [open]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  const userDetailsData = useSelector(userData);
  const myTeam = useSelector(selectGetMyTeam);
  const isMyTeamLoading = useSelector(selectGetMyTeamLoading);

  const teamInvitation = useSelector(selectTeamInvitation);
  const isTeamInviteLoading = useSelector(selectTeamInvitationLoading);

  const recommendedTeams = useSelector(selectRecommendedTeams);
  const isRecommendedTeamsLoading = useSelector(selectRecommendedTeamsLoading);

  const handleViewAll = (e) => {
    e.stopPropagation();
    navigate('/marketplace/all_listings', { state: { isRecommended: true } });
  };
  const [isSliderLoading, setIsSliderLoading] = useState(false);
  useEffect(() => {
    setIsSliderLoading(true);
    setTimeout(() => {
      setIsSliderLoading(false);
    }, 1000);
  }, [open]);

  // console.log(recommendedTeams);

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        {userDetailsData?.user_type === userTypes.talent && (
          <>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">My teams</span>
                {myTeam?.data?.length > 0 && (
                  <CardText onClick={handleViewAll} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || isMyTeamLoading ? (
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {myTeam?.data?.length > 0 && isTab ? (
                    myTeam?.data?.map((project) => (
                      <MyTeamCard isRecommendedTeam key={project.id} data={project} recommended />
                    ))
                  ) : myTeam?.data?.length > 0 ? (
                    <>
                      {myTeam?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {myTeam?.data?.map((project, index) => (
                            <MyTeamCard
                              isRecommendedTeam
                              className={`slide-${index}`}
                              key={project.id}
                              data={project}
                              recommended
                            />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {myTeam?.data?.map((project) => (
                            <MyTeamCard
                              isRecommendedTeam
                              className="custom-slider-project"
                              key={project.id}
                              data={project}
                              recommended
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Empty
                      isTeam
                      active={false}
                      isEducationNotCompleted={returnDetailsForMarketPlace(
                        userDetailsData?.user_type,
                        profilePercentageData?.values_missing,
                      )}
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {userDetailsData?.user_type === userTypes.talent && (
          <>
            <AccordionHeader targetId="2">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Team invites</span>
                {teamInvitation?.data?.length > 0 && (
                  <CardText onClick={handleViewAll} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || isTeamInviteLoading ? (
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {teamInvitation?.data?.length > 0 && isTab ? (
                    teamInvitation?.data?.map((project) => (
                      <TeamInvitationCard isRecommendedTeam key={project.id} data={project} recommended />
                    ))
                  ) : teamInvitation?.data?.length > 0 ? (
                    <>
                      {teamInvitation?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {teamInvitation?.data?.map((project, index) => (
                            <TeamInvitationCard
                              isRecommendedTeam
                              className={`slide-${index}`}
                              key={project.id}
                              data={project}
                              recommended
                            />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {teamInvitation?.data?.map((project) => (
                            <TeamInvitationCard
                              isRecommendedTeam
                              className="custom-slider-project"
                              key={project.id}
                              data={project}
                              recommended
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Empty
                      isTeam
                      active={false}
                      isEducationNotCompleted={returnDetailsForMarketPlace(
                        userDetailsData?.user_type,
                        profilePercentageData?.values_missing,
                      )}
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {userDetailsData?.user_type === userTypes.talent && (
          <>
            <AccordionHeader targetId="3">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Recommended Teams</span>
                {recommendedTeams?.data?.length > 0 && (
                  <CardText onClick={handleViewAll} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              {isSliderLoading || isRecommendedTeamsLoading ? (
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', objectFit: 'contain' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {recommendedTeams?.data?.length > 0 && isTab ? (
                    recommendedTeams?.data?.map((project) => (
                      <TeamTalentCard isRecommendedTeam key={project.id} data={project} />
                    ))
                  ) : recommendedTeams?.data?.length > 0 ? (
                    <>
                      {recommendedTeams?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {recommendedTeams?.data?.map((project, index) => (
                            <TeamTalentCard
                              isRecommendedTeam
                              className={`slide-${index}`}
                              key={project.id}
                              data={project}
                            />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {recommendedTeams?.data?.map((project) => (
                            <TeamTalentCard
                              isRecommendedTeam
                              className="custom-slider-project"
                              key={project.id}
                              data={project}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Empty
                      isTeam
                      active={false}
                      isEducationNotCompleted={returnDetailsForMarketPlace(
                        userDetailsData?.user_type,
                        profilePercentageData?.values_missing,
                      )}
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default TeamListing;

Empty.propTypes = {
  active: Proptypes.bool,
  recommended: Proptypes.bool,
  payment: Proptypes.bool,
  isEducationNotCompleted: Proptypes.bool,
  isTeam: Proptypes.bool,
};

Empty.defaultProps = {
  active: false,
  recommended: false,
  payment: false,
  isEducationNotCompleted: false,
  isTeam: false,
};

// no team when then explore teams text recommd team
// 535. page focus on top scroll top.
