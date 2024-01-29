/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import CardSkeleton from '@src/assets/images/gifs/card_skeleton.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';

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
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';

const Empty = ({ active, recommended, isTeam, payment, isEducationNotCompleted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const dispatch = useDispatch();

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path);
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
              onClick={() => {
                navigate('/marketplace/all_listings');
                dispatch(setActiveNavTab('marketplace'));
              }}
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
              onClick={() => {
                navigate('/marketplace/all_listings');
                dispatch(setActiveNavTab('marketplace'));
              }}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Explore Projects
            </div>
          ) : (
            <div
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
              onClick={() => {
                navigate('/marketplace/teams');
                dispatch(setActiveNavTab('marketplace'));
              }}
            >
              View Teams
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

  const handleViewAll = (e, path) => {
    e.stopPropagation();
    navigate(path, { state: { isRecommended: true } });
    dispatch(setActiveNavTab('marketplace'));
  };
  const [isSliderLoading, setIsSliderLoading] = useState(false);
  useEffect(() => {
    setIsSliderLoading(true);
    setTimeout(() => {
      setIsSliderLoading(false);
    }, 1000);
  }, [open]);

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        {userDetailsData?.user_type === userTypes.talent && (
          <>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">My Teams</span>
                {myTeam?.data?.length > 0 && (
                  <CardText onClick={(e) => handleViewAll(e, '/marketplace/teams')} className="view-all-cta d-none">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || isMyTeamLoading ? (
                <div style={{ height: '150px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                  <img style={{ width: '32%', height: '140px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '140px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '140px' }} src={CardSkeleton} alt="...Loading" />
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
                <span className="d-flex align-items-center">Team Invites</span>
                {teamInvitation?.data?.length > 0 && (
                  <CardText
                    onClick={() => {
                      navigate('/projects/invited');
                      dispatch(setActiveNavTab('projects'));
                    }}
                    className=" view-all-cta"
                  >
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || isTeamInviteLoading ? (
                <div style={{ height: '250px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                  <img style={{ width: '32%', height: '270px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '270px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '270px' }} src={CardSkeleton} alt="...Loading" />
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
                  <CardText onClick={(e) => handleViewAll(e, '/marketplace/teams')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              {isSliderLoading || isRecommendedTeamsLoading ? (
                <div style={{ height: '230px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                  <img style={{ width: '32%', height: '220px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '220px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '220px' }} src={CardSkeleton} alt="...Loading" />
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
                      active={false}
                      isEducationNotCompleted={returnDetailsForMarketPlace(
                        userDetailsData?.user_type,
                        profilePercentageData?.values_missing,
                      )}
                      payment={false}
                      recommended
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
