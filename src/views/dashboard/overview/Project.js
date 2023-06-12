/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText, Badge, Row, Col } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import hat from '@src/assets/images/hat.png';

import { ProjectWrapper } from './style';
import theme from '../../../configs/themeVariables';

const UserSection = ({ users, tagName, name, isClient }) => (
  <div className="user-section">
    <div className="d-flex">
      <Badge className={`rounded ${isClient && 'light-client'}`} color={`light-${isClient ? 'client' : 'info'}`}>
        {tagName}
      </Badge>
      {isClient && (
        <Badge className="client-badge">
          <img src={hat} alt="client-badge" />
        </Badge>
      )}
    </div>
    <CardText className="mt-50 truncate-2 active-project-users">{name}</CardText>
    <div className="avatar-wrap">
      {users.length > 3 ? (
        <span className="d-flex avatars">
          <AvatarGroup size="sm" className="mr-4" data={users.slice(0, 3)} />
          +3
        </span>
      ) : (
        <AvatarGroup data={users} />
      )}
    </div>
  </div>
);

UserSection.propTypes = {
  users: PropTypes.array,
  isClient: PropTypes.bool,
  name: PropTypes.string,
  tagName: PropTypes.string,
};

const TagsSection = ({ tags }) => (
  <div className="tags-container">
    {tags.length > 4 ? (
      <>
        {tags.slice(0, 4).map((tag) => (
          <Badge key={tag} className="tag-margin">
            {tag}
          </Badge>
        ))}
        <span className="additional-text">+3</span>
      </>
    ) : (
      <>
        {tags.slice(0, 4).map((tag) => (
          <Badge key={tag} className="tag-margin">
            {tag}
          </Badge>
        ))}
      </>
    )}
  </div>
);

TagsSection.propTypes = {
  tags: PropTypes.array,
};

const Project = ({ data, className, recommended }) => {
  const avatarGroupArr = [
    {
      title: 'Billy Hopkins',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Amy Carson',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Brandon Miles',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Daisy Weber',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Jenny Looper',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
  ];

  const singleAvatar = [
    {
      title: 'Brandon Miles',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
  ];
  const designPlanningArr = [
    {
      title: 'Due Date',
      subtitle: '12 Apr, 21',
    },
  ];

  const AmountArr = [
    {
      title: 'Amount',
      subtitle: '$ 12000',
    },
  ];

  const tags = ['Polygon', 'Webflow', 'Figma', 'Webflow', 'Figma', 'Webflow', 'Webflow', 'Webflow'];

  const percent = 71;

  const giveStrokeColor = (percentage) => {
    if (percentage <= 40) {
      return theme.red;
      // eslint-disable-next-line
    } else if (percentage > 40 && percentage <= 70) {
      return theme.orange;
    } else {
      return theme.green;
    }
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <Badge color="light-success">In-Progress</Badge>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-1.5">
            {data.name || 'Project Infinity kUpdates Project Infinity Updates'}
          </CardTitle>
          <div className="d-flex w-100 mb-1">
            <div className="circular-progressbar-container">
              <CircularProgressbarWithChildren
                value={percent}
                styles={{
                  path: {
                    stroke: giveStrokeColor(percent),
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    stroke: '#E9ECEF',
                    strokeLinecap: 'round',
                    transform: 'rotate(0turn)',
                    transformOrigin: 'center center',
                  },
                }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <p className="percentage-text m-0">{percent}%</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <TagsSection tags={tags} />
          </div>
          <div className="main-row">
            <UserSection tagName="Client" name={data.clientName} users={singleAvatar} isClient />
            {!recommended && <UserSection tagName="Team" name={data.teamName} users={avatarGroupArr} />}
          </div>
          {!recommended && (
            <div className="design-group mb-50 pt-2">
              <h6 className="section-label">Milestone 2</h6>
            </div>
          )}
          <Row className="mt-1">
            <Col lg="6">
              <div className="design-planning-wrapper">
                {designPlanningArr.map((item) => (
                  <div key={item.title} className="design-planning">
                    <CardText className="mb-25">{item.title}</CardText>
                    <h6 className="mb-0">{item.subtitle}</h6>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg="6">
              {recommended ? (
                <div className="design-planning-wrapper">
                  {AmountArr.map((item) => (
                    <div key={item.title} className="design-planning">
                      <CardText className="mb-25">{item.title}</CardText>
                      <h6 className="mb-0">{item.subtitle}</h6>
                    </div>
                  ))}
                </div>
              ) : (
                <CardText>Quality control & audit</CardText>
              )}
            </Col>
          </Row>
          <div className="font-weight-normal text-center text-primary project-cta mt-25">View Project</div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

Project.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  recommended: PropTypes.bool,
};
export default Project;
