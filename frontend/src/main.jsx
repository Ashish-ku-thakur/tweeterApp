import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>
);







