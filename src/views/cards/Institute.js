import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import AvatarGroup from '@components/avatar-group';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { InstituteCardWrap } from './style';

const Institute = () => {
  const avatarGroupArr = [
    {
      title: 'Billy Hopkins',
      img: lisa,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Amy Carson',
      img: lisa,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Brandon Miles',
      img: lisa,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Daisy Weber',
      img: lisa,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Jenny Looper',
      img: lisa,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
  ];

  return (
    <InstituteCardWrap>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle className="card-title mb-1 d-flex justify-space-between">
              <span>Carlton University - Dale</span>
            </CardTitle>
            <span className="me-3">22 June 2021</span>
          </div>
          <CardText className="institute-desc mb-1">
            It’s like sketching on a whiteboard. Go On, Unleash Your Creativity! Life’s too short for bad software. Try
            Balsamiq Wireframes for Free! Work Faster Smarter. Mockups for Windows.
          </CardText>

          <div className="avatar-wrap mb-1">
            {avatarGroupArr.length > 4 ? (
              <span className="d-flex avatars">
                <AvatarGroup size="md" className="mr-4" data={avatarGroupArr.slice(0, 3)} />
                +3
              </span>
            ) : (
              <AvatarGroup size="md" data={avatarGroupArr} />
            )}
          </div>
          <div className="d-flex">
            <RatingBadge number="4.1" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">51 Projects</CardText>
          </div>
        </CardBody>
      </Card>
    </InstituteCardWrap>
  );
};
export default Institute;
