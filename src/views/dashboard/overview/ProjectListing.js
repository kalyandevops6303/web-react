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
import CardSkeleton from '@src/assets/images/gifs/card_loader.gif';

import Project from './Project';
import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace } from '../../../utility/Utils';

import {
  activeProjectsForClient,
  activeProjectsForClientLoading,
  activeProjectsForTalent,
  activeProjectsForTalentLoading,
  activeProjectsForTeam,
  activeProjectsForTeamLoading,
  profilePercentage,
  recommendedProjects,
  recommendedProjectsLoading,
  upcomingProjectsForClient,
  upcomingProjectsForClientLoading,
  upcomingProjectsForTalent,
  upcomingProjectsForTalentLoading,
  upcomingProjectsForTeam,
  upcomingProjectsForTeamLoading,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import {
  getActiveProjectsForClient,
  getActiveProjectsForTalent,
  getActiveProjectsForTeam,
  getRecommendedProjects,
  getUpcomingProjectsForClient,
  getUpcomingProjectsForTalent,
  getUpcomingProjectsForTeam,
} from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { userTypes } from '../../../utility/constants/Constant';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import ActiveProjectCard from './ActiveProjectCard';
import UpcomingProjectCard from './UpcomingProjectCard';
import ActiveProjectCardForTalent from './ActiveProjectCardForTalent';
import UpcomingProjectCardForTalent from './UpcomingProjectCardForTalent';
import UpcomingProjectCardForTeam from './UpcomingProjectCardForTeam';
import ActiveProjectCardForTeam from './ActiveProjectCardForTeam';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';

const Empty = ({ active, recommended, payment, isEducationNotCompleted }) => {
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
            <>
              {userDetailsData?.user_type === userTypes.client ? (
                <div
                  onClick={() => navigate('/create-project')}
                  className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
                >
                  Create Project
                </div>
              ) : (
                <div
                  onClick={() => navigate('/marketplace/all_listings')}
                  className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
                >
                  Explore Projects
                </div>
              )}
            </>
          ) : (
            ''
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

const ProjectListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePercentageData = useSelector(profilePercentage);

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  const userDetailsData = useSelector(selectUserData);
  const recommendedProjectsData = useSelector(recommendedProjects);
  const isRecommendedLoading = useSelector(recommendedProjectsLoading);

  const activeProjectsForClientData = useSelector(activeProjectsForClient);
  const activeProjectsForClientIsLoading = useSelector(activeProjectsForClientLoading);

  const upcomingProjectsForClientData = useSelector(upcomingProjectsForClient);
  const upcomingProjectsForClientIsLoading = useSelector(upcomingProjectsForClientLoading);

  const activeProjectsForTalentData = useSelector(activeProjectsForTalent);
  const activeProjectsForTalentIsLoading = useSelector(activeProjectsForTalentLoading);

  const upcomingProjectsForTalentData = useSelector(upcomingProjectsForTalent);
  const upcomingProjectsForTalentIsLoading = useSelector(upcomingProjectsForTalentLoading);

  const activeProjectsForTeamData = useSelector(activeProjectsForTeam);
  const activeProjectsForTeamIsLoading = useSelector(activeProjectsForTeamLoading);

  const upcomingProjectsForTeamData = useSelector(upcomingProjectsForTeam);
  const upcomingProjectsForTeamIsLoading = useSelector(upcomingProjectsForTeamLoading);

  const handleViewAll = (e) => {
    e.stopPropagation();
    navigate('/marketplace/all_listings', { state: { isRecommended: true } });
    dispatch(setActiveNavTab('marketplace'));
  };
  const [isSliderLoading, setIsSliderLoading] = useState(false);
  useEffect(() => {
    setIsSliderLoading(true);
    setTimeout(() => {
      setIsSliderLoading(false);
    }, 1000);
  }, [open]);

  useEffect(() => {
    if (open === '1') {
      if (userDetailsData?.user_type === userTypes.client) {
        dispatch(getActiveProjectsForClient());
      } else if (userDetailsData?.user_type === userTypes.talent) {
        dispatch(getActiveProjectsForTalent());
      } else if (userDetailsData?.team_type === userTypes.team) {
        dispatch(getActiveProjectsForTeam());
      } else if (userDetailsData?.team_type === userTypes.club) {
        dispatch(getActiveProjectsForTeam());
      }
    }
    if (open === '2') {
      if (userDetailsData?.user_type === userTypes.client) {
        dispatch(getUpcomingProjectsForClient());
      } else if (userDetailsData?.user_type === userTypes.talent) {
        dispatch(getUpcomingProjectsForTalent());
      } else if (userDetailsData?.team_type === userTypes.team) {
        dispatch(getUpcomingProjectsForTeam());
      } else if (userDetailsData?.team_type === userTypes.club) {
        dispatch(getUpcomingProjectsForTeam());
      }
    }
    if (open === '3') {
      if (
        userDetailsData?.user_type === userTypes.talent ||
        userDetailsData?.team_type === userTypes.team ||
        userDetailsData?.team_type === userTypes.club
      ) {
        dispatch(getRecommendedProjects({ user_type: userDetailsData?.user_type }));
      }
    }
  }, [open]);

  const onViewAllClick = (e, path) => {
    e.stopPropagation();
    navigate(path);
    dispatch(setActiveNavTab('projects'));
  };

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      {userDetailsData?.user_type === userTypes.client && (
        <>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Active Projects</span>
                {activeProjectsForClientData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/ongoing')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || activeProjectsForClientIsLoading ? (
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {activeProjectsForClientData?.data?.length > 0 && isTab ? (
                    activeProjectsForClientData?.data?.map((project) => (
                      <ActiveProjectCard key={project._id} data={project} />
                    ))
                  ) : activeProjectsForClientData?.data?.length > 0 ? (
                    <>
                      {activeProjectsForClientData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {activeProjectsForClientData?.data?.map((project, index) => (
                            <ActiveProjectCard className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {activeProjectsForClientData?.data?.map((project) => (
                            <ActiveProjectCard className="custom-slider-project" key={project._id} data={project} />
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Upcoming Projects</span>
                {activeProjectsForClientData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/upcoming')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || upcomingProjectsForClientIsLoading ? (
                <div style={{ height: '250px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {upcomingProjectsForClientData?.data?.length > 0 && isTab ? (
                    upcomingProjectsForClientData?.data?.map((project) => (
                      <UpcomingProjectCard key={project._id} data={project} />
                    ))
                  ) : upcomingProjectsForClientData?.data?.length > 0 ? (
                    <>
                      {upcomingProjectsForClientData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {upcomingProjectsForClientData?.data?.map((project, index) => (
                            <UpcomingProjectCard className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {upcomingProjectsForClientData?.data?.map((project) => (
                            <UpcomingProjectCard className="custom-slider-project" key={project._id} data={project} />
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
        </>
      )}
      {userDetailsData?.user_type === userTypes.talent && (
        <>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Active Projects</span>
                {activeProjectsForTalentData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/ongoing')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || activeProjectsForTalentIsLoading ? (
                <div style={{ height: '340px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1, height: '310px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1, height: '310px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1, height: '310px' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {activeProjectsForTalentData?.data?.length > 0 && isTab ? (
                    activeProjectsForTalentData?.data?.map((project) => (
                      <ActiveProjectCardForTalent key={project._id} data={project} />
                    ))
                  ) : activeProjectsForTalentData?.data?.length > 0 ? (
                    <>
                      {activeProjectsForTalentData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {activeProjectsForTalentData?.data?.map((project, index) => (
                            <ActiveProjectCardForTalent className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {activeProjectsForTalentData?.data?.map((project) => (
                            <ActiveProjectCardForTalent
                              className="custom-slider-project"
                              key={project._id}
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Upcoming Projects</span>
                {upcomingProjectsForTalentData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/upcoming')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || upcomingProjectsForTalentIsLoading ? (
                <div style={{ height: '250px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {upcomingProjectsForTalentData?.data?.length > 0 && isTab ? (
                    upcomingProjectsForTalentData?.data?.map((project) => (
                      <UpcomingProjectCardForTalent key={project._id} data={project} />
                    ))
                  ) : upcomingProjectsForTalentData?.data?.length > 0 ? (
                    <>
                      {upcomingProjectsForTalentData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {upcomingProjectsForTalentData?.data?.map((project, index) => (
                            <UpcomingProjectCardForTalent
                              className={`slide-${index}`}
                              key={project._id}
                              data={project}
                            />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {upcomingProjectsForTalentData?.data?.map((project) => (
                            <UpcomingProjectCardForTalent
                              className="custom-slider-project"
                              key={project._id}
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
        </>
      )}
      {userDetailsData?.user_type === userTypes.team && (
        <>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Active Projects</span>
                {activeProjectsForTeamData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/ongoing')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || activeProjectsForTeamIsLoading ? (
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {activeProjectsForTeamData?.data?.length > 0 && isTab ? (
                    activeProjectsForTeamData?.data?.map((project) => (
                      <ActiveProjectCardForTeam key={project._id} data={project} />
                    ))
                  ) : activeProjectsForTeamData?.data?.length > 0 ? (
                    <>
                      {activeProjectsForTeamData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {activeProjectsForTeamData?.data?.map((project, index) => (
                            <ActiveProjectCardForTeam className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {activeProjectsForTeamData?.data?.map((project) => (
                            <ActiveProjectCardForTeam
                              className="custom-slider-project"
                              key={project._id}
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Upcoming Projects</span>
                {activeProjectsForTeamData?.data?.length > 0 && (
                  <CardText onClick={(e) => onViewAllClick(e, '/projects/upcoming')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || upcomingProjectsForTeamIsLoading ? (
                <div style={{ height: '250px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {upcomingProjectsForTeamData?.data?.length > 0 && isTab ? (
                    upcomingProjectsForTeamData?.data?.map((project) => (
                      <UpcomingProjectCardForTeam key={project._id} data={project} />
                    ))
                  ) : upcomingProjectsForTeamData?.data?.length > 0 ? (
                    <>
                      {upcomingProjectsForTeamData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {upcomingProjectsForTeamData?.data?.map((project, index) => (
                            <UpcomingProjectCardForTeam className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {upcomingProjectsForTeamData?.data?.map((project) => (
                            <UpcomingProjectCardForTeam
                              className="custom-slider-project"
                              key={project._id}
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </AccordionItem>
        </>
      )}
      <AccordionItem>
        {userDetailsData?.user_type !== userTypes.client && (
          <>
            <AccordionHeader targetId="3">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Recommended Projects</span>
                {recommendedProjectsData?.data?.length > 0 && (
                  <CardText onClick={handleViewAll} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              {isSliderLoading || isRecommendedLoading ? (
                <div style={{ height: '400px' }} className="d-flex justify-content-center gap-1">
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {recommendedProjectsData?.data?.length > 0 && isTab ? (
                    recommendedProjectsData?.data?.map((project) => (
                      <Project key={project.id} data={project} recommended />
                    ))
                  ) : recommendedProjectsData?.data?.length > 0 ? (
                    <>
                      {recommendedProjectsData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {recommendedProjectsData?.data?.map((project, index) => (
                            <Project className={`slide-${index}`} key={project.id} data={project} recommended />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {recommendedProjectsData?.data?.map((project) => (
                            <Project className="custom-slider-project" key={project.id} data={project} recommended />
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
                      recommended
                      payment={false}
                    />
                  )}
                </ProjectsListingWrap>
              )}
            </AccordionBody>
          </>
        )}
        {userDetailsData?.user_type === userTypes.client && (
          <>
            <AccordionHeader targetId="3">Upcoming Payments</AccordionHeader>
            <AccordionBody accordionId="3">
              <ProjectsListingWrap>
                {isTab ? (
                  <Empty active={false} recommended={false} payment />
                ) : (
                  <Empty active={false} recommended={false} payment />
                )}
              </ProjectsListingWrap>
            </AccordionBody>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ProjectListing;

Empty.propTypes = {
  active: Proptypes.bool,
  recommended: Proptypes.bool,
  payment: Proptypes.bool,
  isEducationNotCompleted: Proptypes.bool,
};

Empty.defaultProps = {
  active: false,
  recommended: false,
  payment: false,
  isEducationNotCompleted: false,
};
