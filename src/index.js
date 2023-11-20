import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import { appRouter } from './App';
// import { store } from './redux/Store';
// import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
     <RouterProvider router={appRouter} />
    {/* </Provider> */}
  </React.StrictMode>
);


