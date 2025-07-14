// ** Router imports
import { useRoutes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLayout } from '@hooks/useLayout';

// ** GetRoutes
import { getRoutes } from './routes';

// ** Hooks Imports

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);

  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
