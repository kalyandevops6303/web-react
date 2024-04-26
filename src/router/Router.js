// ** Router imports
import { useRoutes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLayout } from '@hooks/useLayout';
import { GOOGLE_ANALYTICS_CONSTANTS } from '../constants';
// ** GetRoutes
import { getRoutes } from './routes';

ReactGA.initialize(GOOGLE_ANALYTICS_CONSTANTS.TRACKING_ID);

// ** Hooks Imports

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  const allRoutes = getRoutes(layout);

  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
