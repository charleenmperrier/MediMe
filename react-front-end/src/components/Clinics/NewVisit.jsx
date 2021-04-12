import { useState } from "react";
import TextInput from "../TextInput";
import ClinicGroupedButtons from "./ClinicGroupedButtons";
import DateInput from "../DateInput";
import IconButton from "../IconButton";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./NewVisit.scss";

export default function NewVisit() {
  const [typeOfVisit, setTypeOfVisit] = useState(null)
  
  const onCancel = () => {
    console.log('cancel button clicked');
  }
  const onSave = () => {
    console.log('save button clicked');
  }

  return (
    <section className="clinic-new">
      <div className="clinics-list--icons">
        <ArrowBackIosIcon />
      </div>
      <h1 className="clinics-list--title">New Clinical Visit</h1>
      <div className="form">
      <div className="clinic-new--form">
        <DateInput>Date:</DateInput>
        <ClinicGroupedButtons onChange={ setTypeOfVisit } state={ typeOfVisit } />
        <TextInput required>Medical Center:</TextInput>
        <TextInput required>Doctor:</TextInput>
        <TextInput>Reason for Visit:</TextInput>
        <TextInput>Doctor's Diagnosis</TextInput>
      </div>
      <div className="form--user-action">
        <IconButton cancel variant="outlined" color="secondary" onClick={() => onCancel()}>Cancel</IconButton>
        <IconButton save variant="contained" color="secondary" onClick={() => onSave()}>Save</IconButton>
      </div>
      </div>
      
    </section>
  )
};

