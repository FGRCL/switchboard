import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HeaderBar from './HeaderAppBar';
import HomePage from "./General/HomePage";
import DeviceListPage from './devicelist/DeviceListPage';
import StreamingTablePage from './createStream/StreamingPage';
import * as DeviceApi from "./api/DeviceApi";


import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderBar />
      <Switch>
        <Route exact path={["/", "/Home"]} component={HomePage} />
        <Route exact path="/Devices" 
          render={(props) => (
            <DeviceListPage {...props} dataSource={DeviceApi} />
        )} />
        <Route exact path="/Streaming" 
        render={(props) => (
            <StreamingTablePage {...props} dataSource={DeviceApi} />
        )}  />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
