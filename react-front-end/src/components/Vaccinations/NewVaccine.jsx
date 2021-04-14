import { useContext, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../BackButton";

import TextInput from "../TextInput";

import IconButton from "../IconButton";
import { dataContext } from "../hooks/DataProvider";

import "../../styles/form.scss";

export default function VaccineNew() {

  const [redirect, setRedirect] = useState('');

  const onCancel = () => setRedirect(true);
  const onSave = () => console.log("saved button clikced");

  return (
    <section className="clinics-new">
      {redirect && <Redirect to="/vaccinations" />}
      <div className="clinics-list--icons">
        <BackButton />
      </div>
      <h1 className="clinics-list--title">New Vaccination</h1>
      <div className="clinics-form--container">
        <div className="clinics--form--field">
          
          
          
          <TextInput >
            Vaccine Name
          </TextInput>
          <TextInput >
            Total # of doses
          </TextInput>
        </div>
        <div className="clinics-form--user-action">
          <IconButton
            cancel
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </IconButton>
          <IconButton
            save
            variant="contained"
            color="secondary"
            onClick={onSave}
          >
            Save
          </IconButton>
        </div>
      </div>
    </section>
  );
}