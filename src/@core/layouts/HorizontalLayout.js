/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// ** React Imports

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { handleMenuHidden, handleContentWidth } from '@store/layout';

// ** Third Party Components
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';
import { useLocation, useSearchParams } from 'react-router-dom';

// ** Reactstrap Imports
import { Navbar, Button } from 'reactstrap';

// ** Configs
import themeConfig from '@configs/themeConfig';

// ** Custom Components

import Customizer from '@components/customizer';
import ScrollToTop from '@components/scrolltop';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';
import { useSkin } from '@hooks/useSkin';
import { useLayout } from '@hooks/useLayout';
import { useNavbarType } from '@hooks/useNavbarType';
import { useFooterType } from '@hooks/useFooterType';
import { useNavbarColor } from '@hooks/useNavbarColor';

import NavbarComponent from './components/navbar';
import FooterComponent from './components/footer';

// ** Styles
import '@styles/base/core/menu/menu-types/horizontal-menu.scss';
import SwitchConfirmModal from '../../views/modals/SwitchConfirm';
import { selectUserData, selectUserType } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import { getTeamId } from '../../utility/Utils';
import { getUserData } from '../../redux/actions/authActions';

const HorizontalLayout = (props) => {
  // ** Props
  const { footer, children } = props;
  const [switchProfileModal, setSwitchProfileModal] = useState(false);

  // ** Hooks
  const { skin, setSkin } = useSkin();
  const [isRtl, setIsRtl] = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();
  const [isMounted, setIsMounted] = useState(false);

  // ** States
  const isNavbarSearchBarOpen = useSelector((state) => state.search?.isNavbarSearchBarOpen);
  const userType = useSelector(selectUserType);
  const userData = useSelector(selectUserData);

  // ** Store Vars
  const dispatch = useDispatch();
  const location = useLocation();
  const layoutStore = useSelector((state) => state.layout);
  const [searchParams] = useSearchParams();

  // ** Vars
  const { contentWidth } = layoutStore;
  const isHidden = layoutStore.menuHidden;

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val));

  // ** UseEffect Cleanup

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden',
  };

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
  };
  const cleanup = () => {
    setIsMounted(false);
  };

  const entity = searchParams.get('entity');
  const switchTeamId = searchParams.get('switch_team_id');

  useEffect(() => {
    if (
      ((entity === 'TALENT' && userType === userTypes.team) ||
        (switchTeamId && getTeamId() && getTeamId() !== switchTeamId) ||
        (switchTeamId && !getTeamId())) &&
      switchTeamId?.length > 0
    ) {
      setSwitchProfileModal(true);
    }
  }, []);

  useEffect(() => {
    const isAuthPath = window.location.pathname.includes('/auth');
    const isBasePath = window.location.pathname === '/';
    if (!userData && !isAuthPath && !isBasePath) {
      dispatch(getUserData());
    }
  }, []);

  // 1 ✅ Talent is logged and cliked on team email => Switch modal opens
  // 2 ✅ Talent is not logged in and click on team email => logout => Saved url => loggin and switch modal
  // 3 ✅ Talent is logged in and clicks on talents email => Direct redirection
  // 4 ✅ Talent is not logged in and clicks on talents email => logout => Saved url => loggin and no switch modal

  // 5 ✅ Team is logged and cliked on talent email => Switch modal opens
  // 6 ✅ Team is not logged in (Means it logout and its talent again) and click on talent email works as 4 => logout => Saved url => loggin and no switch modal
  // 7 ✅ Team is logged in and clicks on team email => Direct redirection
  // 8 ✅ Team is not logged in and clicks on team email => logout => Saved url => loggin and switch modal

  //  ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => cleanup();
  }, [location]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${
          footerClasses[footerType] || 'footer-static'
        } menu-expanded`,
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      <Navbar
        expand="lg"
        container={false}
        className={classnames(
          `${
            isNavbarSearchBarOpen ? 'active-search' : ''
          } header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center`,
          {
            'navbar-scrolled': true,
          },
        )}
      >
        <div className="navbar-container d-flex content ">
          <NavbarComponent skin={skin} setSkin={setSkin} />
        </div>
      </Navbar>
      {switchProfileModal ? (
        <SwitchConfirmModal
          entity={entity}
          navigateTo={location?.pathname}
          switchTeamId={switchTeamId}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(false)}
        />
      ) : (
        children
      )}
      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRtl={isRtl}
          layout={layout}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          isHidden={isHidden}
          setLayout={setLayout}
          footerType={footerType}
          navbarType={navbarType}
          setIsHidden={setIsHidden}
          themeConfig={themeConfig}
          navbarColor={navbarColor}
          contentWidth={contentWidth}
          setFooterType={setFooterType}
          setNavbarType={setNavbarType}
          setLastLayout={setLastLayout}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
        />
      ) : null}
      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
          'd-none': footerType === 'hidden',
        })}
      >
        {footer || <FooterComponent footerType={footerType} footerClasses={footerClasses} />}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};
export default HorizontalLayout;
