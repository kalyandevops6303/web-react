/* eslint-disable no-undef */
// ** React Imports
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

// ** Toast
import { Toaster } from 'react-hot-toast';

// ** Redux Imports
import store from './redux/store';

// ** ThemeColors Context

import { ThemeContext } from './utility/context/ThemeColors';

// ** ThemeConfig
import themeConfig from './configs/themeConfig';

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner';

// ** Ripple Button
import './@core/components/ripple-button';

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** React Hot Toast Styles
import '@styles/react/libs/react-hot-toasts/react-hot-toasts.scss';

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css';
import './@core/scss/core.scss';
import './assets/scss/style.scss';

// ** Service Worker
import * as serviceWorker from './serviceWorker';
import Error from './views/Error';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

// eslint-disable-next-line no-undef
const container = document.getElementById('root');
const root = createRoot(container);

Bugsnag.start({
  apiKey: 'fad92880f0bc76c77a15a659d5ac0c1d',
  plugins: [new BugsnagPluginReact()],
});
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

root.render(
  <ErrorBoundary FallbackComponent={Error}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={<Spinner />}>
            <ThemeContext>
              <LazyApp />
              <Toaster position={themeConfig.layout.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
            </ThemeContext>
          </Suspense>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </ErrorBoundary>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
