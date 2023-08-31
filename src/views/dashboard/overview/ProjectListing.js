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

import Project from './Project';
import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace } from '../../../utility/Utils';

import {
  profilePercentage,
  recommendedProjects,
  recommendedProjectsLoading,
  userData,
} from '../../../redux/selectors/dashboardSelectors';
import { getRecommendedProjects } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { userTypes } from '../../../utility/constants/Constant';
import { selectUserData } from '../../../redux/selectors/authSelectors';

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
            <div
              onClick={() => navigate('/marketplace/all_listings')}
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Explore Projects
            </div>
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

  useEffect(() => {
    if (userDetailsData?.user_type === userTypes.talent || userDetailsData?.user_type === userTypes.team) {
      dispatch(getRecommendedProjects());
    }
  }, [userDetailsData]);

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

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1">Active Projects</AccordionHeader>
        <AccordionBody accordionId="1">
          <ProjectsListingWrap>
            {isTab ? (
              <Empty active recommended={false} payment={false} />
            ) : (
              <Empty active recommended={false} payment={false} />
            )}
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="2">Upcoming Projects</AccordionHeader>
        <AccordionBody accordionId="2">
          <ProjectsListingWrap>
            {isTab ? (
              <Empty active={false} recommended payment={false} />
            ) : (
              <Empty active={false} recommended payment={false} />
            )}
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
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
                <div style={{ height: '430px' }} className="d-flex justify-content-center gap-1">
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
