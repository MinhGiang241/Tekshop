import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configurationStore";
import "./index.css";
import App from "./App";

ReactDOM.render(
  // @ts-ignore
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
