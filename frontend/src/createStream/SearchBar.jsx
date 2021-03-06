import React from "react";
import { InputAdornment, makeStyles, TextField } from "@material-ui/core";

import { Search } from "@material-ui/icons/";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.classes = makeStyles((theme) => ({
      search: {
        position: "relative",
        right: 0,
        marginLeft: 0,
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto"
        }
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        alignItems: "left",
        justifyContent: "center"
      },
      inputRoot: {
        color: "inherit"
      }
    }));
  }

  render() {
    return (
      <>
        <div className="searchField">
          <TextField
            placeholder="Search"
            InputProps={{
              "aria-label": "search",
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <Search />
                </InputAdornment>
              )
            }}
            size="small"
            variant="outlined"
          />
        </div>
      </>
    );
  }
}
