import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import { Box } from "@material-ui/core";
import HorizontalTabPanel from "../HorizontalTabPanel";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");

describe("Horizontal Tab Panel", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Throws an error when", () => {
    it("Does not render children if the index and value are different", () => {
      wrapper = Enzyme.shallow(
        <HorizontalTabPanel index={1} value={5}>
          <div id="unique" />
        </HorizontalTabPanel>
      );

      expect(wrapper.children).toHaveLength(1);
      expect(wrapper.find(Box)).toHaveLength(0);
    });
  });
  it("Renders any children passed only if the index and value are the same", () => {
    wrapper = Enzyme.shallow(
      <HorizontalTabPanel index={1} value={1}>
        <div id="unique" />
      </HorizontalTabPanel>
    );

    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
  });
});
