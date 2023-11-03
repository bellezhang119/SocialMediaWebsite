import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authRecuver from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  presistStore,
  PresistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PRESIST,
  PURGE,
  REGISTER
} from "redux-presist";
import storage from "redux-presist/lib/storage";
import { PresistGate } from "redux-presist/integration/react";

const presistConfig = { key: "root", storage, version: 1};
const presistedReducer = presistedReducer(presistConfig, authReducer);
const store = configStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    specializableCheck: {
      ignoreActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PRESIST,
        PURGE,
        REGISTER
      ],
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PresistGate loading={null} presistor={persistStore(store)}>
      <App />
      </PresistGate>
    </Provider>
  </React.StrictMode>
);
