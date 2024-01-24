/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';

import CardSkeleton from '@src/assets/images/gifs/card_skeleton.gif';

import TalentsListingForTeamUser from './TalentsListingForTeamUser';
import TeamTalentCard from './TeamTalentCard';
import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace } from '../../../utility/Utils';

import {
  profilePercentage,
  selectJoinRequestMember,
  selectJoinRequestMemberLoading,
  selectRecommendedTalent,
  selectRecommendedTalentLoading,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import { getJoinRequest, getRecommendedProjects, getRecommendedTalent } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';
import Tag from '../../../@core/components/tags';
import { AccordionName } from './DashboardConstant';
import ViewAllCard from './ViewAllCard';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';

const Empty = ({ active, recommended, isTeam, payment, isEducationNotCompleted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

  const dispatch = useDispatch();

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
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
            {isTeam && <img src={TeamNoDataGif} className="empty-gif" alt="empty-gif" />}

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
              onClick={() => {
                if (!isDisabled) {
                  navigate('/marketplace/talents');
                  dispatch(setActiveNavTab('marketplace'));
                }
              }}
              className={`font-weight-normal text-center text-primary project-cta mt-25  ${
                isDisabled ? 'text-muted cursor-not-allowed' : 'cursor-pointer'
              }} `}
            >
              Invite Talent
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

const TalentListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const joinRequests = useSelector(selectJoinRequestMember);
  const isJoinRequestLoading = useSelector(selectJoinRequestMemberLoading);

  const recommendedTalent = useSelector(selectRecommendedTalent);
  const isRecommendedTalentLoading = useSelector(selectRecommendedTalentLoading);

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

  const toggle = (id) => (open === id ? setOpen(null) : setOpen(id));

  useEffect(() => {
    // if (open === '1') {
    //   dispatch(getJoinRequest(userDetailsData?._id));
    // }
    // if (open === '2') {
    //   dispatch(getRecommendedTalent(userDetailsData?._id));
    // }

    dispatch(getJoinRequest(userDetailsData?._id));
    dispatch(getRecommendedTalent(userDetailsData?._id));
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  useEffect(() => {
    if (userDetailsData?.user_type === userTypes.talent) {
      dispatch(getRecommendedProjects());
    }
  }, [userDetailsData]);

  const handleViewAll = (e) => {
    e.stopPropagation();
    navigate('/marketplace/talents', { state: { isRecommended: true } });
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
        <AccordionHeader targetId="1">
          <AccordionHeadStyle>
            <span className="d-flex align-items-center">
              Join Requests <Tag>{joinRequests?.metadata?.total_records}</Tag>
            </span>
            {joinRequests?.data?.length > 0 && (
              <CardText
                onClick={() => {
                  if (!isDisabled) {
                    navigate('/my-teams/join_requests');
                    dispatch(setActiveNavTab('my-teams'));
                  }
                }}
                className={`view-all-cta ${isDisabled && 'text-muted'}`}
              >
                View All
              </CardText>
            )}
          </AccordionHeadStyle>
        </AccordionHeader>
        <AccordionBody accordionId="1">
          {isSliderLoading || isJoinRequestLoading ? (
            <div style={{ height: '200px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
            </div>
          ) : (
            <ProjectsListingWrap>
              {joinRequests?.data?.length > 0 && isTab ? (
                joinRequests?.data?.map((project) => (
                  <TalentsListingForTeamUser key={project.id} data={project} recommended />
                ))
              ) : joinRequests?.data?.length > 0 ? (
                <>
                  {joinRequests?.data?.length >= 4 ? (
                    <Slider {...settings}>
                      <ViewAllCard
                        accordionName={AccordionName.joinRequest}
                        height="218px"
                        onViewAll={() => {
                          if (!isDisabled) {
                            navigate('/my-teams/join_requests');
                            dispatch(setActiveNavTab('my-teams'));
                          }
                        }}
                        viewAll="View All"
                      />
                      {joinRequests?.data?.map((project, index) => (
                        <TalentsListingForTeamUser
                          className={`slide-${index}`}
                          key={project.id}
                          data={project}
                          recommended
                        />
                      ))}
                    </Slider>
                  ) : (
                    <div className="custom-slider-wrap">
                      {joinRequests?.data?.map((project) => (
                        <TalentsListingForTeamUser
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
      </AccordionItem>

      <AccordionItem>
        <AccordionHeader targetId="2">
          <AccordionHeadStyle>
            <span className="d-flex align-items-center">
              {userDetailsData?.team_type === userTypes.club ? 'Recommended Members' : 'Recommended Talents'}{' '}
              <Tag>{recommendedTalent?.metadata?.total_records}</Tag>
            </span>
            {recommendedTalent?.data?.length > 0 && (
              <CardText
                onClick={() => {
                  if (!isDisabled) {
                    handleViewAll();
                  }
                }}
                className={`view-all-cta ${isDisabled && 'text-muted'}`}
              >
                View All
              </CardText>
            )}
          </AccordionHeadStyle>
        </AccordionHeader>
        <AccordionBody accordionId="2">
          {isSliderLoading || isRecommendedTalentLoading ? (
            <div style={{ height: '200px' }} className="d-flex align-items-center gap-1 pe-1 ps-1">
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
              <img style={{ width: '30%', height: '160px' }} src={CardSkeleton} alt="...Loading" />
            </div>
          ) : (
            <ProjectsListingWrap>
              {recommendedTalent?.data?.length > 0 && isTab ? (
                recommendedTalent?.data?.map((project) => (
                  <TeamTalentCard key={project.id} data={project} recommended />
                ))
              ) : recommendedTalent?.data?.length > 0 ? (
                <>
                  {recommendedTalent?.data?.length >= 4 ? (
                    <Slider {...settings}>
                      <ViewAllCard
                        accordionName={
                          userDetailsData?.team_type === userTypes.club
                            ? AccordionName.recommendedMembers
                            : AccordionName.recommendedTalents
                        }
                        height="208px"
                        onViewAll={() => {
                          if (!isDisabled) {
                            handleViewAll();
                          }
                        }}
                        viewAll="View All"
                      />
                      {recommendedTalent?.data?.map((project, index) => (
                        <TeamTalentCard className={`slide-${index}`} key={project.id} data={project} recommended />
                      ))}
                    </Slider>
                  ) : (
                    <div className="custom-slider-wrap">
                      {recommendedTalent?.data?.map((project) => (
                        <TeamTalentCard className="custom-slider-project" key={project.id} data={project} recommended />
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
      </AccordionItem>
    </Accordion>
  );
};

export default TalentListing;

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
