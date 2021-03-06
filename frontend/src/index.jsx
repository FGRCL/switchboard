import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeaderBar from "./general/HeaderBar";
import HomePage from "./general/HomePage";
import DeviceListPage from "./devicelist/DeviceListPage";
import StreamingTablePage from "./createStream/StreamingPage";
import DeviceDetailsPage from "./deviceDetailsPage/DeviceDetailsPage";

import * as DeviceApi from "./api/DeviceApi";
import * as StreamApi from "./api/StreamApi";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderBar />
      <Switch>
        <Route exact path={["/", "/Home"]} component={HomePage} />
        <Route
          exact
          path="/Devices"
          render={(props) => (
            <DeviceListPage {...props} dataSource={DeviceApi} />
          )}
        />
        <Route
          exact
          path="/Streaming"
          render={(props) => (
            <StreamingTablePage
              {...props}
              deviceDataSource={DeviceApi}
              streamDataSource={StreamApi}
            />
          )}
        />
        <Route
          exact
          path="/Devices/Details/:deviceId"
          component={DeviceDetailsPage}
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
