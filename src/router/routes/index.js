// ** React Imports
import { Fragment } from 'react';

// ** Layouts
import BlankLayout from '@layouts/BlankLayout';
import VerticalLayout from '@src/layouts/VerticalLayout';
import HorizontalLayout from '@src/layouts/HorizontalLayout';
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper';

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute';

// ** Utils
import { isObjEmpty } from '@utils';

import FlexternshipRoutes from './flexternship-routes';

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Merge Routes
const Routes = FlexternshipRoutes;

// eslint-disable-next-line consistent-return
const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    }
    return {};
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          // eslint-disable-next-line no-unused-expressions
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          // eslint-disable-next-line no-param-reassign
          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || 'vertical';
  const layouts = ['vertical', 'horizontal', 'blank'];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { Routes, getRoutes };
