import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  MenuItem
} from "@material-ui/core";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import axios from "axios";

import DeleteDeviceButton from "../Buttons/DeleteDeviceButton";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const mockHistoryPush = jest.fn();
const mockHistoryGo = jest.fn();
const mockHistory = {
  location: { pathname: null },
  push: mockHistoryPush,
  go: mockHistoryGo
};

jest.mock("react-router-dom", () => ({
  useHistory: () => {
    return mockHistory;
  }
}));

const flushPromises = () => new Promise(setImmediate);

describe("DeleteButton", () => {
  let wrapper;

  const setOpen = jest.fn();
  const handleClick = jest.spyOn(React, "useState");

  beforeEach(() => {
    handleClick.mockImplementation((open) => [open, setOpen]);
    wrapper = Enzyme.shallow(
      <DeleteDeviceButton button deleteId="1:10:111:999" />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should have 3 total buttons and one dialog for button = true", () => {
    expect(wrapper.find(Button)).toHaveLength(3);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
  it("Should have 2 buttons, one dialog, and one menu item for button = false", () => {
    wrapper = Enzyme.shallow(
      <DeleteDeviceButton button={false} deleteId="1:10:111:999" />
    );

    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(MenuItem)).toHaveLength(1);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
  it("Should open a confirmation dialog when clicked", () => {
    // click delete button and check that dialog state is open
    wrapper.find("#deleteBtn").simulate("click");
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  describe("Delete device dialog", () => {
    it("Should render with correct child elements", () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
      expect(wrapper.find(DialogContentText)).toHaveLength(1);
      expect(wrapper.find(DialogActions)).toHaveLength(1);
    });

    describe("Cancel button", () => {
      it("Should close the dialog when clicked", () => {
        // click delete button to set open to true
        wrapper.find("#deleteBtn").simulate("click");
        expect(setOpen).toHaveBeenCalledWith(true);

        // click cancel
        wrapper.find("#cancelDeleteBtn").simulate("click");

        // open should be false now
        expect(setOpen).toHaveBeenCalledWith(false);
      });
    });

    describe("ConfirmButton", () => {
      describe("on DeviceListPage", () => {
        it("Should call axios.delete, close the dialog and refresh the page when clicked", async () => {
          // Pretend we are on the device list page
          mockHistory.location.pathname = "/Devices";

          // click the delete button to set open to true
          wrapper.find("#deleteBtn").simulate("click");
          expect(setOpen).toHaveBeenCalledWith(true);

          // mock axios before clicking confirm
          const axiosPromise = Promise.resolve();
          axios.delete.mockImplementationOnce(() => axiosPromise);

          // click confirm
          wrapper.find("#confirmDeleteBtn").simulate("click");

          // check that axios.delete was called
          expect(axios.delete).toHaveBeenCalled();

          // Wait for axios promise to finish
          await flushPromises();

          // check that refresh has been called
          expect(mockHistoryGo).toHaveBeenCalledWith(0);

          // open should be false
          expect(setOpen).toHaveBeenCalledWith(false);
        });
      });

      describe("on DeviceDetailsPage", () => {
        it("Should call axios.delete, close the dialog and redirect to device list page when clicked", async () => {
          // Pretend we are on the device details page
          mockHistory.location.pathname = "Devices/Details/sample_sender";

          // click the delete button to set open to true
          wrapper.find("#deleteBtn").simulate("click");
          expect(setOpen).toHaveBeenCalledWith(true);

          // mock axios before clicking confirm
          const axiosPromise = Promise.resolve();
          axios.delete.mockImplementationOnce(() => axiosPromise);

          // click confirm
          wrapper.find("#confirmDeleteBtn").simulate("click");

          // check that axios.delete was called
          expect(axios.delete).toHaveBeenCalled();

          // Wait for axios promise to finish
          await flushPromises();

          // check that redirect has been called
          expect(mockHistoryPush).toHaveBeenCalledWith("/Devices");

          // open should be false
          expect(setOpen).toHaveBeenCalledWith(false);
        });
      });
    });
  });
});
