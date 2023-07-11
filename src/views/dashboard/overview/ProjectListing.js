/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import Project from './Project';
import { ProjectWrapper, ProjectsListingWrap } from './style';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab } from '../../../utility/Utils';
import Tag from '../../../@core/components/tags';
import { recommendedProjects, userData } from '../../../redux/selectors/dashboardSelectors';
import { getRecommendedProjects } from '../../../redux/actions/dashboardActions';

const Empty = ({ active, recommended, payment }) => (
  <ProjectWrapper>
    <Card className="empty-card">
      <CardBody className="empty empty-h-25">
        {active && <img src={ActiveProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
        {recommended && <img src={UpcomingProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
        {payment && <img src={PaymentsEmptyGif} className="empty-gif" alt="empty-gif" />}
        {active && (
          <CardText className="get-started">
            Lets get you <br /> started!
          </CardText>
        )}
        {payment && <CardText className="get-started">No Upcoming Payment</CardText>}
        {active ||
          (recommended && (
            <div className="font-weight-normal text-center text-primary project-cta mt-25">Explore Projects</div>
          ))}
      </CardBody>
    </Card>
  </ProjectWrapper>
);

const ProjectListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();

  const dispatch = useDispatch();

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  const userDetailsData = useSelector(userData);
  const recommendedProjectsData = useSelector(recommendedProjects);

  useEffect(() => {
    if (userDetailsData?.user_type === 'TALENT') {
      dispatch(getRecommendedProjects());
    }
  }, [userDetailsData]);

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1">
          Active Projects <Tag>0</Tag>
        </AccordionHeader>
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
        <AccordionHeader targetId="2">
          Upcoming Projects <Tag>0</Tag>
        </AccordionHeader>
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
        {userDetailsData?.user_type === 'TALENT' && (
          <>
            <AccordionHeader targetId="3">
              Recommended Projects <Tag>{recommendedProjectsData?.data?.length}</Tag>
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <ProjectsListingWrap>
                {isTab ? (
                  // eslint-disable-next-line
                  <>
                    {recommendedProjectsData?.data?.map((project) => (
                      <Project key={project.id} data={project} recommended />
                    ))}
                  </>
                ) : (
                  <Slider {...settings}>
                    {recommendedProjectsData?.data?.map((project, index) => (
                      <Project className={`slide-${index}`} key={project.id} data={project} recommended />
                    ))}
                  </Slider>
                )}
              </ProjectsListingWrap>
            </AccordionBody>
          </>
        )}
        {userDetailsData?.user_type === 'CLIENT' && (
          <>
            <AccordionHeader targetId="3">
              Upcoming Payments <Tag>0 new</Tag>
            </AccordionHeader>
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
};

Empty.defaultProps = {
  active: false,
  recommended: false,
  payment: false,
};
