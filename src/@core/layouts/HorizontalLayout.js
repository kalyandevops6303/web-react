/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// ** React Imports

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { handleMenuHidden, handleContentWidth } from '@store/layout';

// ** Third Party Components
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';

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

const HorizontalLayout = (props) => {
  // ** Props
  const { footer, children } = props;

  // ** Hooks
  const { skin, setSkin } = useSkin();
  const [isRtl, setIsRtl] = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();

  // ** States
  const isNavbarSearchBarOpen = useSelector((state) => state.search?.isNavbarSearchBarOpen);

  // ** Store Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state) => state.layout);

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

  // if (!isMounted) {
  //   return null;
  // }

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
          {/* {navbar ? navbar({ skin, setSkin }) : <NavbarComponent skin={skin} setSkin={setSkin} />} */}

          <NavbarComponent skin={skin} setSkin={setSkin} />
        </div>
      </Navbar>

      {children}
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
