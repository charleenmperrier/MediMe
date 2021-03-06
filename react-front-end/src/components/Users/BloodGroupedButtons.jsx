//
import TextButtonGroup from "../TextButtonGroup";

// Material UI Components
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Stylesheet
import "./BloodGroupedButtons.scss";

const GroupedButtonTheme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#AACFD0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f77777",
      contrastText: "#fff",
    },
  },
});

export default function BloodGroupedButtons(props) {
  const bloodGroupArray = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "O" },
    { id: 4, name: "AB" },
    { id: 5, name: "UNKNOWN" },
  ];

  const colorByStates = (validation, valueSelected) => {
    return validation && !valueSelected ? "secondary" : "primary";
  };

  const bloodGroup = bloodGroupArray.map((value) => {
    return (
      <ThemeProvider key={value.id} theme={GroupedButtonTheme}>
        <TextButtonGroup
          color={colorByStates(props.validate, props.state)}
          setState={(event) => props.onChange(value.name)}
          groupButtons
          selected={value.name === props.state}
          value={value.name}
        >
          {value.name}
        </TextButtonGroup>
      </ThemeProvider>
    );
  });

  return <div className="grouped-buttons--container-blood">{bloodGroup}</div>;
}
