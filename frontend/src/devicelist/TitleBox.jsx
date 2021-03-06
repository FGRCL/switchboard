import React from "react";
import { Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import StreamButton from "../general/Buttons/StreamButton";
import AddDeviceButton from "../general/Buttons/AddDeviceButton";

export default function TitleBox() {
  return (
    <>
      <Box className="flexContents headerAreaNoUnderline">
        <div className="title">My Devices</div>
        <div className="alignRightFloat">
          <NavLink
            to="/Streaming"
            activeClassName="hideLinkStyle"
            className="hideLinkStyle"
            exact
          >
            <StreamButton id="DeviceListStreamBtn" type="submit" />
          </NavLink>
          <AddDeviceButton id="DeviceListAddDevBtn" />
        </div>
      </Box>
    </>
  );
}
