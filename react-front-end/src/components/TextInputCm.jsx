import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import "./TextInput.scss";

export default function TextInputCm(props) {
  return (
    <form className="text-input--container" noValidate autoComplete="off">
      <TextField
        InputProps={{
          endAdornment: <InputAdornment position="end">CM</InputAdornment>,
        }}
        required={props.required}
        error={
          props.required &&
          props.validate &&
          (props.value === "" || props.value === null)
        }
        helperText={
          !props.value && props.validate && "This field cannot be blank."
        }
        id="outlined-basic"
        variant="outlined"
        multiline
        className="text-input--field"
        label={props.children}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={(event) => props.setInput(event.target.value)}
      />
    </form>
  );
}