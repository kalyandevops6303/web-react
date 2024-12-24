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
import Nobidgif from '@src/assets/images/gifs/no_bids.gif';
import { appPermissionsSelector } from '@src/redux/selectors/authSelectors';
import Tag from '../../../@core/components/tags';
import ViewAllCard from './ExtraCardWithCount';
import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace, calculateRemainingBidsCount } from '../../../utility/Utils';

import {
  profilePercentage,
  projectsBidsForClient,
  projectsBidsForClientLoading,
  recommendedTeamsForClient,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import { getProjectsBidsForClient } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { userTypes } from '../../../utility/constants/Constant';
import ProjectBidCard from './ProjectBidCard';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';
import { AccordionName } from './DashboardConstant';
import PermissionWrapper from '@/PermissionWrapper';

const Empty = ({ active, recommended, isTeam, payment, receivedBid, isEducationNotCompleted }) => {
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
            {receivedBid && <img src={Nobidgif} className="empty-gif" alt="empty-gif" />}
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
            {receivedBid && !isEducationNotCompleted && (
              <CardText className="font-weight-normal get-started">No Project Bids</CardText>
            )}
          </div>
          {active && (
            <div
              onClick={() => {
                dispatch(setActiveNavTab('marketplace'));
                navigate('/marketplace/all_listings');
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
          ) : recommended && !isTeam ? (
            <div
              onClick={() => navigate('/create-project')}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Create Project
            </div>
          ) : (
            <div
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
              onClick={() => {
                dispatch(setActiveNavTab('marketplace'));
                navigate('/marketplace/teams');
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

const OpenListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePercentageData = useSelector(profilePercentage);
  const appPermissions = useSelector(appPermissionsSelector);

  const toggle = (id) => (open === id ? setOpen(null) : setOpen(id));

  useEffect(() => {
    dispatch(getProjectsBidsForClient());
  }, []);

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

  const handleViewAll = (e, path) => {
    e.stopPropagation();
    navigate(path);
    dispatch(setActiveNavTab('marketplace'));
  };

  const handleReceivedBids = () => {
    navigate('/marketplace/my_bids', { state: { isOpenListing: true } });
  };

  const [isSliderLoading, setIsSliderLoading] = useState(false);
  useEffect(() => {
    setIsSliderLoading(true);
    setTimeout(() => {
      setIsSliderLoading(false);
    }, 150);
  }, [open]);

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.OPEN_LISTINGS.RECEIVED_BIDS']}>
        <AccordionItem>
          {userDetailsData?.user_type === userTypes.client && (
            <>
              <AccordionHeader targetId="1">
                <AccordionHeadStyle>
                  <span className="d-flex align-items-center">
                    Received Bids
                    <Tag
                      hasNew={
                        projectsBidsForClientData?.unreadCount > 0 ? recommendedTeamsForClientData?.unreadCount : false
                      }
                      count={projectsBidsForClientData?.data?.filter((bid) => !bid?.is_expired).length}
                    />
                  </span>

                  {projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length > 0 && (
                    <CardText onClick={handleReceivedBids} className="view-all-cta">
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
                    {projectsBidsForClientData?.data?.filter((bid) => !bid?.is_expired).length > 0 && isTab ? (
                      projectsBidsForClientData?.data
                        ?.filter((bid) => bid.is_expired === false)
                        ?.map((project) => (
                          <ProjectBidCard
                            accordionName={AccordionName?.receivedBids}
                            key={project._id}
                            data={project}
                          />
                        ))
                    ) : projectsBidsForClientData?.data?.filter((bid) => !bid?.is_expired).length > 0 ? (
                      <>
                        {projectsBidsForClientData?.data?.filter((bid) => !bid?.is_expired).length >= 4 ? (
                          <Slider {...settings}>
                            {projectsBidsForClientData?.data?.map((project, index) => (
                              <ProjectBidCard
                                accordionName={AccordionName?.receivedBids}
                                className={`slide-${index}`}
                                key={project._id}
                                data={project}
                              />
                            ))}
                            {projectsBidsForClientData?.metadata?.total_records > 10 && (
                              <ViewAllCard
                                accordionName={AccordionName?.receivedBids}
                                height={182}
                                onViewAll={(e) => handleViewAll(e, '/marketplace/my_bids')}
                                count={calculateRemainingBidsCount(projectsBidsForClientData)}
                              />
                            )}
                          </Slider>
                        ) : (
                          <div className="custom-slider-wrap">
                            {projectsBidsForClientData?.data
                              ?.filter((bid) => bid.is_expired === false)
                              .map((project) => (
                                <ProjectBidCard
                                  accordionName={AccordionName?.receivedBids}
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
                        receivedBid
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
      </PermissionWrapper>
      <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.OPEN_LISTINGS.EXPIRED_LISTINGS']}>
        <AccordionItem>
          {userDetailsData?.user_type === userTypes.client && (
            <>
              <AccordionHeader targetId="2">
                <AccordionHeadStyle>
                  <span className="d-flex align-items-center">
                    Expired Listings
                    <Tag
                      hasNew={
                        projectsBidsForClientData?.unReadExpiredBidsCount > 0
                          ? recommendedTeamsForClientData?.unReadExpiredBidsCount
                          : false
                      }
                      count={projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length}
                    />
                  </span>
                  {projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length > 0 && (
                    <CardText onClick={handleReceivedBids} className="view-all-cta">
                      View All
                    </CardText>
                  )}
                </AccordionHeadStyle>
              </AccordionHeader>
              <AccordionBody accordionId="2">
                {isSliderLoading || projectsBidsForClientIsLoading ? (
                  <div style={{ height: '200px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
                    <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                    <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                    <img style={{ width: '32%', height: '155px' }} src={CardSkeleton} alt="...Loading" />
                  </div>
                ) : (
                  <ProjectsListingWrap>
                    {projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length > 0 && isTab ? (
                      projectsBidsForClientData?.data
                        ?.filter((bid) => bid.is_expired === true)
                        .map((project) => (
                          <ProjectBidCard accordionName={AccordionName.receivedBids} key={project._id} data={project} />
                        ))
                    ) : projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length > 0 ? (
                      <>
                        {projectsBidsForClientData?.data?.filter((bid) => !!bid?.is_expired).length >= 4 ? (
                          <Slider {...settings}>
                            {projectsBidsForClientData?.data
                              ?.filter((bid) => bid.is_expired === true)
                              .map((project, index) => (
                                <ProjectBidCard
                                  accordionName={AccordionName.receivedBids}
                                  className={`slide-${index}`}
                                  key={project._id}
                                  data={project}
                                />
                              ))}
                            {projectsBidsForClientData?.metadata?.total_records > 10 && (
                              <ViewAllCard
                                accordionName={AccordionName.receivedBids}
                                height={182}
                                onViewAll={(e) => handleViewAll(e, '/marketplace/my_bids')}
                                count={calculateRemainingBidsCount(projectsBidsForClientData)}
                              />
                            )}
                          </Slider>
                        ) : (
                          <div className="custom-slider-wrap">
                            {projectsBidsForClientData?.data
                              ?.filter((bid) => bid.is_expired === true)
                              .map((project) => (
                                <ProjectBidCard
                                  accordionName={AccordionName.receivedBids}
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
                        receivedBid
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
      </PermissionWrapper>
    </Accordion>
  );
};

export default OpenListing;

Empty.propTypes = {
  active: Proptypes.bool,
  recommended: Proptypes.bool,
  payment: Proptypes.bool,
  receivedBid: Proptypes.bool,
  isEducationNotCompleted: Proptypes.bool,
  isTeam: Proptypes.bool,
};

Empty.defaultProps = {
  active: false,
  recommended: false,
  payment: false,
  receivedBid: false,
  isEducationNotCompleted: false,
  isTeam: false,
};
