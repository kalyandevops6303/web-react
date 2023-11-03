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
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import CardSkeleton from '@src/assets/images/gifs/card_skeleton.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';

import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace } from '../../../utility/Utils';

import {
  profilePercentage,
  projectsBidsForClient,
  projectsBidsForClientLoading,
  recommendedTeamsForClient,
  recommendedTeamsForClientLoading,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import { getProjectsBidsForClient, getRecommendedTeamsForClient } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { userTypes } from '../../../utility/constants/Constant';
import ProjectBidCard from './ProjectBidCard';
import RecommendedTeamsCardForClient from './RecommendedTeamsCardForClient';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';

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
              onClick={() => navigate('/create-project')}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Create Project
            </div>
          ) : (
            <div
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
              onClick={() => navigate('/marketplace/teams')}
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

const OpenListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePercentageData = useSelector(profilePercentage);

  const toggle = (id) => (open === id ? setOpen(null) : setOpen(id));

  useEffect(() => {
    if (open === '1') {
      dispatch(getProjectsBidsForClient());
    }
    if (open === '2') {
      dispatch(getRecommendedTeamsForClient());
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

  const projectsBidsForClientData = useSelector(projectsBidsForClient);
  const projectsBidsForClientIsLoading = useSelector(projectsBidsForClientLoading);

  const recommendedTeamsForClientData = useSelector(recommendedTeamsForClient);
  const recommendedTeamsForClientIsLoading = useSelector(recommendedTeamsForClientLoading);

  const handleViewAll = (e, path) => {
    e.stopPropagation();
    navigate(path);
    dispatch(setActiveNavTab('marketplace'));
  };
  const handleViewAllRecommendedTeam = (e, path) => {
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
        {userDetailsData?.user_type === userTypes.client && (
          <>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Received Bids</span>
                {projectsBidsForClientData?.data?.length > 0 && (
                  <CardText onClick={(e) => handleViewAll(e, '/marketplace/my_bids')} className="view-all-cta">
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              {isSliderLoading || projectsBidsForClientIsLoading ? (
                <div style={{ height: '200px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                  <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {projectsBidsForClientData?.data?.length > 0 && isTab ? (
                    projectsBidsForClientData?.data?.map((project) => (
                      <ProjectBidCard key={project._id} data={project} />
                    ))
                  ) : projectsBidsForClientData?.data?.length > 0 ? (
                    <>
                      {projectsBidsForClientData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {projectsBidsForClientData?.data?.map((project, index) => (
                            <ProjectBidCard className={`slide-${index}`} key={project._id} data={project} />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {projectsBidsForClientData?.data?.map((project) => (
                            <ProjectBidCard className="custom-slider-project" key={project._id} data={project} />
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
      </AccordionItem>

      <AccordionItem>
        {userDetailsData?.user_type === userTypes.client && (
          <>
            <AccordionHeader targetId="2">
              <AccordionHeadStyle>
                <span className="d-flex align-items-center">Recommended Teams</span>
                {recommendedTeamsForClientData?.data?.length > 0 && (
                  <CardText
                    onClick={(e) => handleViewAllRecommendedTeam(e, '/marketplace/teams')}
                    className="view-all-cta"
                  >
                    View All
                  </CardText>
                )}
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              {isSliderLoading || recommendedTeamsForClientIsLoading ? (
                <div style={{ height: '230px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                  <img style={{ width: '32%', height: '210px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '210px' }} src={CardSkeleton} alt="...Loading" />
                  <img style={{ width: '32%', height: '210px' }} src={CardSkeleton} alt="...Loading" />
                </div>
              ) : (
                <ProjectsListingWrap>
                  {recommendedTeamsForClientData?.data?.length > 0 && isTab ? (
                    recommendedTeamsForClientData?.data?.map((team) => (
                      <RecommendedTeamsCardForClient isRecommendedTeam key={team._id} data={team} />
                    ))
                  ) : recommendedTeamsForClientData?.data?.length > 0 ? (
                    <>
                      {recommendedTeamsForClientData?.data?.length >= 4 ? (
                        <Slider {...settings}>
                          {recommendedTeamsForClientData?.data?.map((team, index) => (
                            <RecommendedTeamsCardForClient
                              isRecommendedTeam
                              className={`slide-${index}`}
                              key={team.id}
                              data={team}
                            />
                          ))}
                        </Slider>
                      ) : (
                        <div className="custom-slider-wrap">
                          {recommendedTeamsForClientData?.data?.map((team) => (
                            <RecommendedTeamsCardForClient
                              isRecommendedTeam
                              className="custom-slider-project"
                              key={team.id}
                              data={team}
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

export default OpenListing;

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
