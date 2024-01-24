import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { getItem } from '../../../utility/localStorageControl';
import { userTypes } from '../../../utility/constants/Constant';
import { selectCurrentProfile } from '../../../redux/selectors/profileSelectors';
import capitalize from '../../../lib/capitalize';

const DetailsHeader = () => {
  const param = useParams();
  const userData = useSelector(selectAuthUserData);
  const isOwnProfile = param?.userId === userData?._id;
  const isTeamView = param?.userType.toUpperCase() === userTypes.team;
  const isClubView = param?.userType.toUpperCase() === userTypes.club;
  const currentProfile = useSelector(selectCurrentProfile);

  const baseRoute = getItem('baseRoute');

  let secondaryRoute;

  if (baseRoute === 'marketplace') {
    secondaryRoute = getItem('selectedMarketplaceTab');
  } else if (baseRoute === 'projects') {
    secondaryRoute = getItem('selectedProjectTab');
  } else if (baseRoute === 'my-teams') {
    secondaryRoute = getItem('selectedMyTeamsTab');
  } else {
    secondaryRoute = null;
  }

  const baseRouteWithoutDash = baseRoute?.replace(/[-_]/g, ' ');
  const secondaryRouteWithoutDash = secondaryRoute?.replace(/[-_]/g, ' ');

  const defaultBreadCrumb = [
    { title: 'Profile', link: '#' },
    {
      title:
        isTeamView || isClubView
          ? currentProfile?.name
          : `${currentProfile?.first_name} ${currentProfile?.last_name}` || 'User',
    },
  ];
  const dynamicBreadCrumb = [
    { title: capitalize(baseRouteWithoutDash), link: `/${baseRoute}` },
    ...(secondaryRoute
      ? [{ title: capitalize(secondaryRouteWithoutDash), link: `/${baseRoute}/${secondaryRoute}` }]
      : []),
    {
      title:
        isTeamView || isClubView
          ? currentProfile?.name
          : `${currentProfile?.first_name} ${currentProfile?.last_name}` || 'User',
    },
  ];

  return (
    <div className="d-flex justify-content-between mb-2 pb-2 rounded top-head">
      <div className="d-flex justify-content-between fixed-header">
        <BreadCrumbs data={isOwnProfile ? defaultBreadCrumb : dynamicBreadCrumb} />
      </div>
    </div>
  );
};

export default DetailsHeader;
