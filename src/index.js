import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import "./index.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.min.css";

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
