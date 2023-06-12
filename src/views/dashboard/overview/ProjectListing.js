/* eslint-disable react/require-default-props */
import { useState } from 'react';
import Proptypes from 'prop-types';
import Slider from 'react-slick';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import Project from './Project';
import { ProjectWrapper, ProjectsListingWrap } from './style';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab } from '../../../utility/Utils';
import Tag from '../../../@core/components/tags';

const Empty = ({ active }) => (
  <ProjectWrapper>
    <Card className="empty-card">
      <CardBody className="empty empty-h-25">
        <img src={active ? ActiveProjectsEmptyGif : UpcomingProjectsEmptyGif} className="empty-gif" alt="empty-gif" />
        {active && (
          <CardText className="get-started">
            Lets get you <br /> started!
          </CardText>
        )}
        <div className="font-weight-normal text-center text-primary project-cta mt-25">Explore Project</div>
      </CardBody>
    </Card>
  </ProjectWrapper>
);

const ProjectListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const ProjectsArray = [
    {
      id: 1,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT  ',
      teamName: 'Asia research and development',
    },
    {
      id: 2,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT Mindtress Mindtress',
      teamName: 'Asia research and development research',
    },
    {
      id: 3,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT  ',
      teamName: 'Asia research and development',
    },
    {
      id: 4,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT Mindtress Mindtress',
      teamName: 'Asia research and development research',
    },
    {
      id: 5,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT  ',
      teamName: 'Asia research and development',
    },
    {
      id: 6,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT Mindtress Mindtress',
      teamName: 'Asia research and development research',
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1">
          Active Projects <Tag>0</Tag>
        </AccordionHeader>
        <AccordionBody accordionId="1">
          <ProjectsListingWrap>
            {isTab ? (
              <>
                {/* {ProjectsArray.map((project) => (
                  <Project key={project.id} data={project} />
                ))} */}
                <Empty active />
              </>
            ) : (
              <>
                {/* <Slider {...settings}> */}
                {/* {ProjectsArray.map((project, index) => (
                  <Project className={`slide-${index}`} key={project.id} data={project} />
                ))} */}
                <Empty active />
                {/* </Slider> */}
              </>
            )}
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="2">
          Upcoming Projects <Tag hasNew>0 new</Tag>
        </AccordionHeader>
        <AccordionBody accordionId="2">
          <ProjectsListingWrap>
            {isTab ? (
              <>
                {/* {ProjectsArray.map((project) => (
                  <Project key={project.id} data={project} />
                ))} */}
                <Empty active={false} />
              </>
            ) : (
              <>
                {/* <Slider {...settings}> */}
                {/* {ProjectsArray.map((project, index) => (
                  <Project className={`slide-${index}`} key={project.id} data={project} />
                ))} */}
                <Empty active={false} />
                {/* </Slider> */}
              </>
            )}
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="3">Recommended Projects</AccordionHeader>
        <AccordionBody accordionId="3">
          <ProjectsListingWrap>
            {isTab ? (
              <>
                {ProjectsArray.map((project) => (
                  <Project key={project.id} data={project} recommended />
                ))}
                <Empty active={false} />
              </>
            ) : (
              <Slider {...settings}>
                {ProjectsArray.map((project, index) => (
                  <Project className={`slide-${index}`} key={project.id} data={project} recommended />
                ))}
                <Empty active={false} />
              </Slider>
            )}
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default ProjectListing;

Empty.propTypes = {
  active: Proptypes.bool,
};

Empty.defaultProps = {
  active: false,
};
