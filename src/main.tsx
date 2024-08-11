import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/app.scss";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
