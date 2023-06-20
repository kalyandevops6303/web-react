import React, { Suspense } from 'react';

// ** Router Import
import Router from './router/Router';

const App = () => (
  <React.StrictMode>
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  </React.StrictMode>
);

export default App;
