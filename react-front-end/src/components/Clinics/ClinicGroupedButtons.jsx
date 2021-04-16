import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import TextButtonGroup from "../TextButtonGroup";
import "./ClinicGroupedButtons.scss";

const GroupedButtonTheme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#AED6B5",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f77777",
      contrastText: "#fff",
    }
  },
});

export default function ClinicGroupedButtons(props) {
  const clinicGroupArray = [
    { id: 1, name: "HOSPITAL" },
    { id: 2, name: "CLINIC" }
    
  ];

  const colorByErrorState = error => {
    return error ? "secondary" : "primary";
  }

  const clinicGroup = clinicGroupArray.map((value) => {
    return (
      <ThemeProvider theme={GroupedButtonTheme}>
        <TextButtonGroup
          color={colorByErrorState(props.validate)}
          key={value.id}
          setState={() => props.onChange(value.name)}
          groupButtons
          selected={value.name === props.state}
          value={value.name}
          error={props.validate}
        >
          {value.name}
        </TextButtonGroup>
      </ThemeProvider>
    );
  });

  return <div className="grouped-buttons--container">{clinicGroup}</div>;
};
