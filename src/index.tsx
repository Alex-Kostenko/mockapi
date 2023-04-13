import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';
import TabsProvider from './context/table';
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TabsProvider>
      <Provider store={store}>
        <App />
        <div id="modal"></div>
      </Provider>
    </TabsProvider>
  </React.StrictMode>,
);

reportWebVitals();
