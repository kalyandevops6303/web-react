import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Clock, Home, Link, User, Shield, Crosshair } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { TabsContainer } from '../style';
import Account from '../Account';
import Personal from './Personal';
import Educational from './Educational';
import Availability from './Availability';
import Social from './Social';
import Payment from './Payment';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import EducationTabInactiveImg from '../../../assets/images/educationTabInactive.png';
import EducationTabActiveImg from '../../../assets/images/educationTabActive.png';
import InternHiring from './InternHiring';
import InternXobinHiring from './InternXobinHiring';
import { getQuestionsLink, getShowHiringTab } from '../../../redux/actions/hiringActions';
import PermissionWrapper from '@/PermissionWrapper';
import { appPermissionsSelector } from '@/redux/selectors/authSelectors';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showHiringTab = useSelector((state) => state.hiring?.showHiringTab);
  const questions = useSelector((state) => state.hiring?.questionsLink);
  const appPermissions = useSelector(appPermissionsSelector);
  const [hasQuestions, setHasQuestions] = useState(true);

  const [showTab, setShowTab] = useState(true);

  const onTabClick = (path) => {
    console.log('path', path);
    if (location.pathname.includes('profile-edit')) {
      navigate(path);
    }
  };

  const onFailure = () => {
    setShowTab(false);
  };

  useEffect(() => {
    if (questions?.length === 0) setHasQuestions(false);
  }, [questions]);

  return (
    <TabsContainer className="pt-2" isEditing={location.pathname.includes('profile-edit')}>
      <Nav pills className="mb-2">
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
          <NavItem
            onClick={() => {
              console.log('location.pathname', location.pathname);
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/account-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname === `/${userOnboarding.talent}/account-details` ||
                location.pathname === `/${userProfileEdit.talent}/account-details`
              }
            >
              <Home className="font-medium-3 me-50" />
              <span className="fw-bold">Account</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/personal-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname === `/${userOnboarding.talent}/personal-details` ||
                location.pathname === `/${userProfileEdit.talent}/personal-details`
              }
            >
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">Personal</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/educational-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname === `/${userOnboarding.talent}/educational-details` ||
                location.pathname === `/${userProfileEdit.talent}/educational-details`
              }
            >
              {location.pathname === `/${userOnboarding.talent}/educational-details` ||
              location.pathname === `/${userProfileEdit.talent}/educational-details` ? (
                <img src={EducationTabActiveImg} alt="education-active" width={20} height={20} className="me-50" />
              ) : (
                <img src={EducationTabInactiveImg} alt="education-inactive" width={20} height={20} className="me-50" />
              )}
              <span className="fw-bold">Education</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.AVAILABILITY']}>
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/availability-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname === `/${userOnboarding.talent}/availability-details` ||
                location.pathname === `/${userProfileEdit.talent}/availability-details`
              }
            >
              <Clock className="font-medium-3 me-50" />
              <span className="fw-bold">Availability</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/social-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname === `/${userOnboarding.talent}/social-details` ||
                location.pathname === `/${userProfileEdit.talent}/social-details`
              }
            >
              <Link className="font-medium-3 me-50" />
              <span className="fw-bold">Social</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PAYMENT']}>
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.talent}/payment-details`);
              }
            }}
          >
            <NavLink
              active={
                location.pathname.includes('payment-details') ||
                location.pathname === `/${userProfileEdit.talent}/payment-details`
              }
            >
              <Shield className="font-medium-3 me-50" />
              <span className="fw-bold">Payment</span>
            </NavLink>
          </NavItem>
        </PermissionWrapper>
        {/* {showHiringTab && <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/intern-hiring`);
            }
            else {
              onTabClick(`/${userOnboarding.talent}/intern-hiring`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname.includes(`/intern-hiring`) ||
              location.pathname === `/${userProfileEdit.talent}/intern-hiring`
            }
          >
            <Crosshair className="font-medium-3 me-50" />
            <span className="fw-bold">Get Hired</span>
          </NavLink>
        </NavItem>} */}
        {showHiringTab && showTab && (
          <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.GET_HIRED']}>
            <NavItem
              onClick={() => {
                if (location.pathname.includes('profile-edit')) {
                  onTabClick(`/${userProfileEdit.talent}/intern-xobin-hiring`);
                }
              }}
            >
              <NavLink
                active={
                  location.pathname.includes(`/intern-xobin-hiring`) ||
                  location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring`
                }
              >
                <Crosshair className="font-medium-3 me-50" />
                <span className="fw-bold">Get Hired</span>
              </NavLink>
            </NavItem>
          </PermissionWrapper>
        )}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {(location.pathname === `/${userOnboarding.talent}/account-details` ||
            location.pathname === `/${userProfileEdit.talent}/account-details`) && (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
              <Account tabNames={tabNames} />
            </PermissionWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.Personal}>
          {(location.pathname === `/${userOnboarding.talent}/personal-details` ||
            location.pathname === `/${userProfileEdit.talent}/personal-details`) && (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
              <Personal />
            </PermissionWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.Educational}>
          {(location.pathname === `/${userOnboarding.talent}/educational-details` ||
            location.pathname === `/${userProfileEdit.talent}/educational-details`) && (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
              <Educational />
            </PermissionWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.Availability}>
          {(location.pathname === `/${userOnboarding.talent}/availability-details` ||
            location.pathname === `/${userProfileEdit.talent}/availability-details`) && (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.AVAILABILITY']}>
              <Availability />
            </PermissionWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.Social}>
          {(location.pathname === `/${userOnboarding.talent}/social-details` ||
            location.pathname === `/${userProfileEdit.talent}/social-details`) && (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
              <Social />
            </PermissionWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.Payment}>
          {location.pathname.includes('payment-details') ||
          location.pathname === `/${userProfileEdit.talent}/payment-details` ? (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PAYMENT']}>
              <Payment />
            </PermissionWrapper>
          ) : null}
        </TabPane>
        <TabPane tabId={tabNames.InternHiring}>
          {location.pathname === `/${userProfileEdit.talent}/intern-hiring` ||
          location.pathname === `/${userOnboarding.talent}/intern-hiring` ? (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.GET_HIRED']}>
              <InternHiring />
            </PermissionWrapper>
          ) : null}
        </TabPane>
        <TabPane tabId={tabNames.InternXobinHiring}>
          {location.pathname.includes('intern-xobin-hiring') ||
          location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring` ||
          location.pathname === `/${userOnboarding.talent}/intern-xobin-hiring` ? (
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.XOBIN_HIRING']}>
              <InternXobinHiring />
            </PermissionWrapper>
          ) : null}
        </TabPane>
      </TabContent>
    </TabsContainer>
  );
};
export default Tabs;

Tabs.propTypes = {
  tabNames: Proptypes.object,
  active: Proptypes.string,
};

Tabs.defaultProps = {
  tabNames: {},
  active: '',
};
