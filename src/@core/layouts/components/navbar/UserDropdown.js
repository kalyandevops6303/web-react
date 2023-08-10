// ** React Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShowToastMessage from '../../../../@core/components/toast';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { User, Power, Check, CheckCircle } from 'react-feather';

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledTooltip } from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../redux/selectors/dashboardSelectors';

import { logoutAction, switchProfile } from '../../../../redux/actions/authActions';
import { capitalize } from 'lodash';
import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';
import { userTypes } from '../../../../utility/constants/Constant';
import { getItem, setItem } from '../../../../utility/localStorageControl';
import { selectIsTeamLoggedIn } from '../../../../redux/selectors/authSelectors';
import ProfileSwitchModal from '../../../../views/modals/ProfileSwitchModal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const teamDataMock = {
  _id: '6486b2b2b03b9ecd06909871',
  user_type: 'TEAM',
  email: 'rajat@yopmail.com',
  country_code: '91',
  email_verified: true,
  oauth_type: 'none',
  phone: '9876690876',
  phone_verified: true,
  checkpoint: 'COMPLETE',
  account_status: 'ACTIVE',
  phone_country: {},
  availability: {
    timezone: {
      _id: '6479f0fafe992bcffe2ab719',
      offset: 19800,
      offset_name: 'UTC+05:30',
      name: 'Asia/Kolkata',
      abbreviation: 'IST',
    },
    weekdays_avl: {
      start_time: 10,
      end_time: 18,
      days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    },
    weekends_avl: {
      end_time: null,
      start_time: null,
    },
  },
  talent_info: {
    currency_preference: {
      _id: '6475a97308b60176c1a25c20',
      code: 'INR',
      name: 'Indian National Rupee',
    },
    languages_write: [],
    first_name: 'Team',
    last_name: '1',
    image_uri: 'assets/trumio_logo.png',
    projects_worked_on_count: 0,
    languages_read: [],
    social_links: [
      {
        platform: 'linkedIn',
        url: 'https://linkedin.com/user=1122',
      },
    ],
    tagline: 'Professional Procrastinator',
    languages_speak: [],
    educational_institute: [
      {
        institution: {
          _id: '648317fe99d9a45dd6e9b855',
          name: 'Graphic Era University',
        },
        education: {
          _id: '64830f8cb03b9ecd069097e5',
          name: 'Bachelor of Technology',
        },
      },
    ],
    hourly_rate: 80,
    work_experience: 12,
    rating: 4,
    professional_intro: 'I am what you can call a blockchain enthusiast',
    role: {
      _id: '6486a8e3e402d96bc5d28d36',
      name: 'AI Engineer',
    },
    current_residency: {
      country: {
        _id: '6479c2071183add75cda4db1',
        latitude: '20.00000000',
        code: 'IN',
        dial_code: '91',
        name: 'India',
        longitude: '77.00000000',
      },
      state: {
        _id: '6479c620a93f95115d35924c',
        country_id: '6479c2071183add75cda4db1',
        name: 'Uttarakhand',
      },
      city: {
        _id: '6479ed63fe992bcffe295c67',
        name: 'Dehradun',
        country_id: '6479c2071183add75cda4db1',
        state_id: '6479c620a93f95115d35924c',
      },
      street_address: '',
      house_number: '',
      zip_code: '',
    },
    expertise: {
      skills: [
        {
          _id: '6486a65e34730cac6a480442',
          name: 'Cryptography',
        },
        {
          _id: '6486a65e34730cac6a480456',
          name: 'Hadoop',
        },
        {
          _id: '6486a65e34730cac6a480470',
          name: 'Python',
        },
        {
          _id: '6486a65e34730cac6a480479',
          name: 'RESTful APIs',
        },
      ],
      tools: [
        {
          _id: '6486a6c33cf46b7a02d8be1f',
          name: 'Git',
        },
        {
          _id: '6486a6c33cf46b7a02d8be78',
          name: 'React',
        },
      ],
      certificates: [],
    },
  },
};

const UserDropdown = () => {
  const userDetailsData = useSelector(userData);
  const currentUserDetails = useSelector((state) => state.auth.currentUserData);
  const isTeamLoggedIn = useSelector(selectIsTeamLoggedIn);
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isProfileSwitchLoading, setProfileSwitchLoading] = useState(false);

  const handleEdit = () => {};

  const handleLogout = () => {
    const onSuccess = () => {
      navigate('/auth/login');
      const keyToPreserve = 'isUserVisited';
      const preservedValue = getItem(keyToPreserve);
      // eslint-disable-next-line no-undef
      window.localStorage.clear();
      if (preservedValue) {
        setItem(keyToPreserve, preservedValue);
      }
    };

    dispatch(logoutAction({ fcmToken, onSuccess }));
  };
  const LineWrapper = styled.div`
    position: relative;
    .line {
      height: 2px;
      background: ${theme.activeColor};
      width: 90%;
      position: absolute;
      bottom: -12px;
      margin: auto;
      left: 0;
      right: 0;
    }
  `;

  const userName = isTeamLoggedIn
    ? userDetailsData?.name
    : userDetailsData
    ? userDetailsData?.user_type === userTypes.talent
      ? userDetailsData?.talent_info?.first_name + ' ' + userDetailsData?.talent_info?.last_name || 'User'
      : userDetailsData?.client_info?.first_name + ' ' + userDetailsData?.client_info?.last_name || 'User'
    : 'User';

  const UserDropDownWrapper = styled.div`
    a {
      text-decoration: none;
      color: inherit;
    }
    .isActive {
      background: ${theme.primary}1f;
      color: ${theme.primary};
    }
    .logout {
      color: ${theme.red};
      padding: 1rem 1.2rem;
      display: block;
    }
    .edit {
      color: ${theme.primary};
      padding: 1rem 1.2rem;
      display: block;
      border-top: 1px solid ${theme.cardHeaderBorderColor};
      margin-top: 1rem;
      &:active {
        color: white;
      }
    }
    .dropdown-item {
      width: 100%;
    }
  `;
  const teams = [
    {
      _id: '64c72b189087ae128ed8a1e3',
      checkpoint: 'COMPLETE',
      country_code: '+91',
      oauth_type: 'none',
      user_type: 'TEAM',
      name: 'Team system 1',
      phone: '7727866212',
      phone_verified: true,
      email_verified: true,
      account_status: 'ACTIVE',
      email: 't595@yopmail.com',
      phone_country: {},
      availability: {
        timezone: {
          _id: '6479f0fafe992bcffe2ab6e8',
          offset: 7200,
          offset_name: 'UTC+02:00',
          name: 'Africa/Lubumbashi',
          abbreviation: 'CAT',
        },
        weekdays_avl: {
          start_time: 4,
          end_time: 10,
          days: ['TUESDAY', 'WEDNESDAY'],
        },
        weekends_avl: {
          start_time: 6,
          end_time: 11,
          days: ['SATURDAY', 'SUNDAY'],
        },
      },
      talent_info: {
        currency_preference: {
          _id: '6478b0d1679b91d695ad5354',
          name: 'Bangladeshi taka',
          code: 'BDT',
        },
        current_residency: {
          country: {
            _id: '6479c2071183add75cda4db1',
            latitude: '20.00000000',
            code: 'IN',
            dial_code: '91',
            name: 'India',
            longitude: '77.00000000',
          },
          state: {
            _id: '6479c620a93f95115d35922d',
            country_id: '6479c2071183add75cda4db1',
            name: 'Assam',
          },
          city: {
            _id: '6479ed63fe992bcffe294e5d',
            name: 'Badarpur',
            country_id: '6479c2071183add75cda4db1',
            state_id: '6479c620a93f95115d35922d',
          },
          street_address: '',
          house_number: '',
          zip_code: '',
        },
        educational_institute: [
          {
            institution: {
              _id: '648317ae99d9a45dd6e9b0be',
              name: 'Alaska Pacific University',
            },
            education: {
              _id: '64830f8cb03b9ecd069097d1',
              name: 'Bachelor of Accountancy',
            },
          },
        ],
        expertise: {
          skills: [
            {
              _id: '6486a65e34730cac6a48042b',
              name: '.NET Framework',
            },
            {
              _id: '6486a65e34730cac6a480434',
              name: 'ASP.NET',
            },
            {
              _id: '6486a65e34730cac6a480437',
              name: 'Azure (Microsoft Azure)',
            },
            {
              _id: '6486a65e34730cac6a480443',
              name: 'D3.js (Data-Driven Documents)',
            },
            {
              _id: '6486a65e34730cac6a480466',
              name: 'Mobile App Development (iOS/Android)',
            },
          ],
          tools: [
            {
              _id: '6486a6c33cf46b7a02d8bde3',
              name: 'Amazon AI Services',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde4',
              name: 'Amazon ECS',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde5',
              name: 'Amazon Web Services (AWS)',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde6',
              name: 'Angular',
            },
            {
              _id: '6486a6c33cf46b7a02d8bdf2',
              name: 'AWS CloudFormation',
            },
          ],
          certificates: [
            {
              _id: '6487fb571c9a617ebd3d4e51',
              name: 'AWS Certified Solutions Architect - Associate',
            },
          ],
        },
        first_name: 'Divya',
        hourly_rate: 600,
        image_uri:
          'https://trumiodev.blob.core.windows.net/trumio-public/profile/64c72b189087ae128ed8a1e4/ca7a41b7-aca7-4a2e-a4a5-2430f6f30444.jpg',
        languages_read: [
          {
            _id: '64831445a51384fb6948e67a',
            name: 'Hindi',
          },
        ],
        languages_speak: [
          {
            _id: '64831445a51384fb6948e6c2',
            name: 'Assamese',
          },
        ],
        languages_write: [
          {
            _id: '64831445a51384fb6948e678',
            name: 'English',
          },
        ],
        last_name: 'Singh',
        professional_intro: 'Intro',
        projects_worked_on_count: 0,
        rating: 0,
        role: {
          _id: '6486a8e3e402d96bc5d28d43',
          name: 'Blockchain Developer',
        },
        social_links: [],
        tagline: 'Tag line',
        work_experience: 15,
      },
    },
    {
      _id: '64c72b189087ae128ed8a1e5',
      checkpoint: 'COMPLETE',
      country_code: '+91',
      oauth_type: 'none',
      user_type: 'TEAM',
      name: 'Team system 2',
      phone: '7727866212',
      phone_verified: true,
      email_verified: true,
      account_status: 'ACTIVE',
      email: 't595@yopmail.com',
      phone_country: {},
      availability: {
        timezone: {
          _id: '6479f0fafe992bcffe2ab6e8',
          offset: 7200,
          offset_name: 'UTC+02:00',
          name: 'Africa/Lubumbashi',
          abbreviation: 'CAT',
        },
        weekdays_avl: {
          start_time: 4,
          end_time: 10,
          days: ['TUESDAY', 'WEDNESDAY'],
        },
        weekends_avl: {
          start_time: 6,
          end_time: 11,
          days: ['SATURDAY', 'SUNDAY'],
        },
      },
      talent_info: {
        currency_preference: {
          _id: '6478b0d1679b91d695ad5354',
          name: 'Bangladeshi taka',
          code: 'BDT',
        },
        current_residency: {
          country: {
            _id: '6479c2071183add75cda4db1',
            latitude: '20.00000000',
            code: 'IN',
            dial_code: '91',
            name: 'India',
            longitude: '77.00000000',
          },
          state: {
            _id: '6479c620a93f95115d35922d',
            country_id: '6479c2071183add75cda4db1',
            name: 'Assam',
          },
          city: {
            _id: '6479ed63fe992bcffe294e5d',
            name: 'Badarpur',
            country_id: '6479c2071183add75cda4db1',
            state_id: '6479c620a93f95115d35922d',
          },
          street_address: '',
          house_number: '',
          zip_code: '',
        },
        educational_institute: [
          {
            institution: {
              _id: '648317ae99d9a45dd6e9b0be',
              name: 'Alaska Pacific University',
            },
            education: {
              _id: '64830f8cb03b9ecd069097d1',
              name: 'Bachelor of Accountancy',
            },
          },
        ],
        expertise: {
          skills: [
            {
              _id: '6486a65e34730cac6a48042b',
              name: '.NET Framework',
            },
            {
              _id: '6486a65e34730cac6a480434',
              name: 'ASP.NET',
            },
            {
              _id: '6486a65e34730cac6a480437',
              name: 'Azure (Microsoft Azure)',
            },
            {
              _id: '6486a65e34730cac6a480443',
              name: 'D3.js (Data-Driven Documents)',
            },
            {
              _id: '6486a65e34730cac6a480466',
              name: 'Mobile App Development (iOS/Android)',
            },
          ],
          tools: [
            {
              _id: '6486a6c33cf46b7a02d8bde3',
              name: 'Amazon AI Services',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde4',
              name: 'Amazon ECS',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde5',
              name: 'Amazon Web Services (AWS)',
            },
            {
              _id: '6486a6c33cf46b7a02d8bde6',
              name: 'Angular',
            },
            {
              _id: '6486a6c33cf46b7a02d8bdf2',
              name: 'AWS CloudFormation',
            },
          ],
          certificates: [
            {
              _id: '6487fb571c9a617ebd3d4e51',
              name: 'AWS Certified Solutions Architect - Associate',
            },
          ],
        },
        first_name: 'Divya',
        hourly_rate: 600,
        image_uri:
          'https://trumiodev.blob.core.windows.net/trumio-public/profile/64c72b189087ae128ed8a1e4/ca7a41b7-aca7-4a2e-a4a5-2430f6f30444.jpg',
        languages_read: [
          {
            _id: '64831445a51384fb6948e67a',
            name: 'Hindi',
          },
        ],
        languages_speak: [
          {
            _id: '64831445a51384fb6948e6c2',
            name: 'Assamese',
          },
        ],
        languages_write: [
          {
            _id: '64831445a51384fb6948e678',
            name: 'English',
          },
        ],
        last_name: 'Singh',
        professional_intro: 'Intro',
        projects_worked_on_count: 0,
        rating: 0,
        role: {
          _id: '6486a8e3e402d96bc5d28d43',
          name: 'Blockchain Developer',
        },
        social_links: [],
        tagline: 'Tag line',
        work_experience: 15,
      },
    },
  ];

  const handleShowModal = () => {
    ShowToastMessage('success', `Profile switched successfully`);
  };
  const handleSwitch = (data) => {
    dispatch(switchProfile({ data, onSuccess: handleShowModal }));
  };
  console.log(isProfileSwitchLoading);

  const currentUserName = currentUserDetails
    ? currentUserDetails?.user_type === userTypes.talent
      ? currentUserDetails?.talent_info?.first_name + ' ' + currentUserDetails?.talent_info?.last_name || 'User'
      : currentUserDetails?.client_info?.first_name + ' ' + currentUserDetails?.client_info?.last_name || 'User'
    : 'User';
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name truncate-1 fw-bold" id="username">
            {userName}
          </span>
          {userName?.length > 15 && (
            <UncontrolledTooltip placement="right" target="username">
              <div className="d-flex flex-column align-items-start">
                <p className="m-0">{userName}</p>
              </div>
            </UncontrolledTooltip>
          )}
          <span className="user-status">{capitalize(userDetailsData?.user_type) || 'Role'}</span>
        </div>
        {userDetailsData?.user_type === userTypes.talent ? (
          <Avatar
            img={
              userDetailsData?.talent_info?.image_uri.length > 0
                ? userDetailsData?.talent_info?.image_uri
                : defaultAvatar
            }
            imgHeight="40"
            imgWidth="40"
          />
        ) : (
          <Avatar
            img={
              userDetailsData?.client_info?.image_uri.length > 0
                ? userDetailsData?.client_info?.image_uri
                : defaultAvatar
            }
            imgHeight="40"
            imgWidth="40"
          />
        )}
      </DropdownToggle>

      {location?.pathname?.split?.('/')?.[3] === userDetailsData?._id && (
        <LineWrapper>
          <div className="line"></div>
        </LineWrapper>
      )}

      <UserDropDownWrapper>
        <DropdownMenu end>
          <DropdownItem
            className="d-flex justify-content-between"
            // tag={Link}
            onClick={() => handleSwitch(currentUserDetails)}

            // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
          >
            <section className="user-info-avatar d-flex align-items-center">
              <div className="user-info me-1 user-nav">
                <span className="mb-50 user-name fw-bold text-start d-block" id="username">
                  {currentUserName}
                </span>
                {currentUserName?.length > 15 && (
                  <UncontrolledTooltip placement="right" target="username">
                    <div className="d-flex flex-column align-items-start">
                      <p className="text-start m-0">{currentUserName}</p>
                    </div>
                  </UncontrolledTooltip>
                )}
                <span className="w-100 font-small-3 d-block user-status text-start">
                  {capitalize(userDetailsData?.user_type) || 'Role'}
                </span>
              </div>
              {userDetailsData?.user_type === userTypes.talent ? (
                <Avatar
                  img={
                    userDetailsData?.talent_info?.image_uri.length > 0
                      ? userDetailsData?.talent_info?.image_uri
                      : defaultAvatar
                  }
                  imgHeight="40"
                  imgWidth="40"
                />
              ) : (
                <Avatar
                  img={
                    userDetailsData?.client_info?.image_uri.length > 0
                      ? userDetailsData?.client_info?.image_uri
                      : defaultAvatar
                  }
                  imgHeight="40"
                  imgWidth="40"
                />
              )}
            </section>
            <Check className="m-auto ms-3 me-0" size={14} />
          </DropdownItem>

          {teams?.map((team) => (
            <DropdownItem
              className="d-flex justify-content-between isActive"
              // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
              onClick={() => handleSwitch(team)}
            >
              <section className="user-info-avatar d-flex align-items-center">
                <div className="user-info me-1 user-nav">
                  <span className="mb-50 user-name fw-bold text-start d-block" id="username">
                    {team?.name}
                  </span>
                  {team?.name?.length > 15 && (
                    <UncontrolledTooltip placement="right" target="username">
                      <div className="d-flex flex-column align-items-start">
                        <p className="text-start m-0">{team?.name}</p>
                      </div>
                    </UncontrolledTooltip>
                  )}
                  <span className="w-100 font-small-3 d-block user-status text-start">
                    {capitalize(userDetailsData?.user_type) || 'Role'}
                  </span>
                </div>
                {userDetailsData?.user_type === userTypes.talent ? (
                  <Avatar
                    img={
                      userDetailsData?.talent_info?.image_uri.length > 0
                        ? userDetailsData?.talent_info?.image_uri
                        : defaultAvatar
                    }
                    imgHeight="40"
                    imgWidth="40"
                  />
                ) : (
                  <Avatar
                    img={
                      userDetailsData?.client_info?.image_uri.length > 0
                        ? userDetailsData?.client_info?.image_uri
                        : defaultAvatar
                    }
                    imgHeight="40"
                    imgWidth="40"
                  />
                )}
              </section>
              <Check className="m-auto ms-3 me-0" size={14} />
            </DropdownItem>
          ))}

          <DropdownItem onClick={handleEdit} className="w-100 edit">
            <span className="align-middle ">Edit Profile</span>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} className="w-100 logout">
            <span className="align-middle ">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UserDropDownWrapper>
      {isProfileSwitchLoading && <ProfileSwitchModal modal={isProfileSwitchLoading} />}
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
