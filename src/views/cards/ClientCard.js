/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, UncontrolledTooltip } from 'reactstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { PropTypes } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MapPin } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Avatar from '@components/avatar';
import hat from '@src/assets/images/hat.svg';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { ClientCardWrap } from './style';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import TextToolTip from './TextToolTip';
import { Elevate } from '../styled';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';

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
const ClientCard = ({ isSearchPage, data, userType }) => {
  const [isFavorite, setIsFavorite] = useState(data?.is_favorite);
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocationPrimary = () => {
    if (location.pathname.split('/').includes('marketplace'))
      return { title: 'Marketplace', link: '/marketplace/all_listings' };
    if (location.pathname.split('/').includes('search')) return { title: 'Search', link: '/search' };
    return '';
  };
  const fromLocationSecondary = () => {
    if (location.pathname.split('/').includes('all_listings')) return { title: 'Marketplace', link: location.pathname };
    if (location.pathname.split('/').includes('my_listings')) return { title: 'My listings', link: location.pathname };
    if (location.pathname.split('/').includes('talents')) return { title: 'Talent', link: location.pathname };
    if (location.pathname.split('/').includes('clients')) return { title: 'Clients', link: location.pathname };
    return '';
  };
  const fromLocationSearch = () => {
    if (data?.user_type === userTypes.client) return { title: 'Clients', link: '' };
    return { title: 'Talent', link: '' };
  };
  // const description = data?.company_tagline || data?.professional_intro;
  const locationDetails = data?.user_type === userTypes.client ? data?.office_address : data?.current_residency;

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(
        makeFav({
          user_id: data?.user_id,
          user_type: data?.user_type,
          onError: () => setIsFavorite(false),
        }),
      );
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(false);
      dispatch(removeFav({ user_id: data?.user_id, onError: () => setIsFavorite(true) }));
    }
  };

  const handleCard = () => {
    const state = {
      from: {
        primary: fromLocationPrimary(),
        secondary: fromLocationSecondary() || fromLocationSearch(),
      },
    };
    navigate(`/profile/${data?.user_type === userTypes.client ? 'client' : 'talent'}/${data?.user_id}`, { state });
  };

  const clientSkills = data?.project_area_of_interest?.skills ?? [];

  return (
    <ClientCardWrap userType={userType} clientCard>
      <Card style={{ height: '93%' }} onClick={handleCard} className="cursor-pointer">
        <Elevate style={{ height: '100%' }}>
          <CardBody>
            <Col className="d-flex justify-content-between">
              <div className="d-flex align-items-center" style={{ width: '60%' }}>
                <Avatar
                  img={data?.image_uri?.length > 0 ? data?.image_uri : defaultAvatar}
                  imgHeight="40"
                  imgWidth="40"
                  className={`client-card-photo me-1 mb-1 `}
                />
                <div className="d-flex flex-column" style={{ width: '70%' }}>
                  <CardTitle className="text-decoration-none marketplace-card-title mb-0 text-truncate">
                    {data?.first_name}&nbsp;
                    {data?.last_name}
                  </CardTitle>
                  <p
                    className="font-small-3 fw-300 mb-25 marketplace-card-role"
                    style={{ width: '80%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {data?.user_type === userTypes.client
                      ? data?.company_name || 'Company Name'
                      : data?.role?.name || 'Role'}
                  </p>

                  <div className="d-flex w-100" style={{ marginLeft: '-2px' }}>
                    {locationDetails ? (
                      <div className="d-flex align-items-center overflow-hidden">
                        <MapPin size={18} className="me-50" />
                        <TextToolTip
                          text={`${locationDetails?.city?.name ?? ''}, ${locationDetails?.country?.name ?? ''}`}
                          id={`tooltip-location-${data?.user_id}`}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-start" style={{ width: '40%' }}>
                <div className="d-flex w-100 gap-50 justify-content-end">
                  {data?.is_alma_mater && (
                    <Badge className="bg-white" style={{ marginTop: '-5px' }}>
                      <img src={hat} alt="client-badge" />
                    </Badge>
                  )}
                  {!isSearchPage && (
                    <div className="mb-25">
                      {isFavorite ? (
                        <Heart
                          className="cursor-pointer d-flex heart"
                          fill={theme.red}
                          stroke={theme.red}
                          onClick={(e) => handleUnLike(e)}
                          size={20}
                        />
                      ) : (
                        <Heart className="cursor-pointer d-flex heart" onClick={(e) => handleLike(e)} size={20} />
                      )}
                    </div>
                  )}
                </div>
                <div className="d-flex mt-1 justify-content-end w-100">
                  <RatingBadge number={Math.round(data?.rating ?? 0)} />
                  <CardText className="ps-50 font-small-3 fw-300 rating-label">
                    {data?.projects_worked_on_count ?? 0} Projects
                  </CardText>
                </div>
              </div>
            </Col>
            <div className="d-flex">
              <div
                className={`circular-progressbar-container mt-1 ${isSearchPage ? 'invisible' : ''}`}
                style={{ marginRight: '15px', width: '50px', height: '50px' }}
              >
                <CircularProgressbarWithChildren
                  value={data?.match_percentage ?? 0}
                  styles={{
                    path: {
                      stroke: giveStrokeColor(data?.match_percentage ?? 0),
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                      transform: 'rotate(0turn)',
                      transformOrigin: 'center center',
                    },
                    trail: {
                      stroke: theme.progressBarBg,
                      strokeLinecap: 'round',
                      transform: 'rotate(0turn)',
                      transformOrigin: 'center center',
                    },
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="percentage-text m-0">{data?.match_percentage ?? 0}%</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className=" w-100">
                {data?.project_area_of_interest?.area ? (
                  <div className="mt-1 badge-box-wrap mb-50">
                    <div className="info-key">Area of Interest</div>
                    <Badge
                      className="mt-50"
                      color=""
                      style={{ color: theme.lightBlueColor, backgroundColor: theme.lightBlueBgColor }}
                    >
                      {data?.project_area_of_interest?.area?.name}
                    </Badge>
                  </div>
                ) : null}
                <div className="badge-box-wrap mb-20 mt-1">
                  <div className="info-key">Desired Skills</div>
                  <div className="d-flex flex-row flex-wrap gap-50 mt-20">
                    {clientSkills?.map((skill) => (
                      <div className="badge-box mt-25" key={skill?._id}>
                        <Badge
                          id={`tooltip-${skill?._id}-${data?.user_id}`}
                          className={skill?.name?.length > 12 ? 'truncate-1' : ''}
                          color=""
                          style={{
                            color: theme.lightBlueColor,
                            backgroundColor: theme.lightBlueBgColor,
                          }}
                        >
                          {skill?.name}
                        </Badge>
                        {skill?.name?.length > 12 ? (
                          <UncontrolledTooltip target={`tooltip-${skill?._id}-${data?.user_id}`}>
                            {skill?.name}
                          </UncontrolledTooltip>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Elevate>
      </Card>
    </ClientCardWrap>
  );
};
ClientCard.propTypes = {
  data: PropTypes.object,
  userType: PropTypes.string,
  isSearchPage: PropTypes.bool,
};
ClientCard.defaultProps = {
  data: {},
  userType: 'string',
  isSearchPage: false,
};
export default ClientCard;
