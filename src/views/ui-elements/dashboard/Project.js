/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText, Badge, Row, Col } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import hat from '@src/assets/images/hat.png';

import { ProjectWrapper } from './style';

const UserSection = ({ users, tagName, name, isClient }) => (
  <div className="user-section">
    <Badge className={`rounded ${isClient && 'light-client'}`} color={`light-${isClient ? 'client' : 'info'}`}>
      {tagName}
    </Badge>
    {isClient && (
      <Badge className="client-badge">
        <img src={hat} alt="client-badge" />
      </Badge>
    )}
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

const Project = ({ data }) => {
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
  return (
    <ProjectWrapper>
      <Card className="card-app-design">
        <CardBody>
          <Badge color="light-success">In-Progress</Badge>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-1.5">
            {data.name || 'Project Infinity kUpdates Project Infinity Updates'}
          </CardTitle>
          <div className="main-row">
            <UserSection tagName="Client" name={data.clientName} users={singleAvatar} isClient />
            <UserSection tagName="Team" name={data.teamName} users={avatarGroupArr} />
          </div>

          <div className="design-group mb-50 pt-2">
            <h6 className="section-label">Milstone 2</h6>
          </div>
          <Row>
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
              <CardText>Quality control & audit</CardText>
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
};
export default Project;
