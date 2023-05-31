// ** React Imports
import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

// ** Toast
import { Toaster } from 'react-hot-toast';

// ** Redux Imports
import { store } from './redux/store';

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

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

// eslint-disable-next-line no-undef
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
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
  </GoogleOAuthProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
