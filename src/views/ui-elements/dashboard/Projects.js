/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';
import EmptyGif from '@src/assets/images/GetStarted.gif';
import Project from './Project';
import { ProjectWrapper, ProjectsListingWrap, Tagwrapper } from './style';

const Tag = ({ children, hasNew }) => (
  <Tagwrapper>
    <span className="tag">{children}</span>
    {hasNew && <span className="dot" />}
  </Tagwrapper>
);
Tag.propTypes = {
  children: PropTypes.element,
  hasNew: PropTypes.bool,
};
const Empty = () => (
  <ProjectWrapper>
    <Card>
      <CardBody className="empty empty-h-25">
        <img src={EmptyGif} className="empty-gif" alt="empty-gif" />
        <CardText className="get-started">
          Lets get you <br /> started!
        </CardText>
        <div className="font-weight-normal text-center text-primary project-cta mt-25">Explore Project</div>
      </CardBody>
    </Card>
  </ProjectWrapper>
);

const Projects = () => {
  const [open, setOpen] = useState('1');

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const ProjectsArray = [
    {
      id: 1,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT  ',
      teamName: 'Asia research and develpment',
    },
    {
      id: 2,
      name: 'Project Infinity Updates Project Infinity Updates Project Infinity kUpdates Project Infinity Updates',
      clientName: 'Mindtress PVT Mindtress Mindtress',
      teamName: 'Asia research and develpment research',
    },
  ];

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1">
          Active Projects <Tag>2</Tag>
        </AccordionHeader>
        <AccordionBody accordionId="1">
          <ProjectsListingWrap>
            {ProjectsArray.map((project) => (
              <Project key={project.id} data={project} />
            ))}
            <Empty />
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="2">
          Upcoming Projects <Tag hasNew>4 new</Tag>
        </AccordionHeader>
        <AccordionBody accordionId="2">
          <ProjectsListingWrap>
            {ProjectsArray.map((project) => (
              <Project key={project.id} data={project} />
            ))}
            <Empty />
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId="3">Recommended Projects</AccordionHeader>
        <AccordionBody accordionId="3">
          <ProjectsListingWrap>
            {ProjectsArray.map((project) => (
              <Project key={project.id} data={project} />
            ))}
            <Empty />
          </ProjectsListingWrap>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Projects;
