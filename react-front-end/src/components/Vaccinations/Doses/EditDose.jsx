// Libraries
import { useContext, useState } from "react";
import { Redirect } from "react-router";

// Components
import DateInput from "../../DateInput";
import DateInputOpt from "../../DateInputOpt";
import IconButton from "../../IconButton";
import TextInput from "../../TextInput";

// Helpers
import { dataContext } from "../../Provider/DataProvider";

// Stylesheet
import "../../../styles/form.scss";

export default function EditDose() {
  // Redirect state
  const [redirect, setRedirect] = useState("");

  // Validate form error state
  const [validate, setValidate] = useState(false);

  const {
    vaccinationDetailId,
    doseDetailId,
    doses,
    editDoseRecord,
  } = useContext(dataContext);

  // Fnd dose from dose id
  const dose = doses.find((dose) => dose.id === doseDetailId);

  const [serialNum, setSerialNum] = useState(dose.serial_number);
  const [dateTaken, setDateTaken] = useState(dose.date_taken);
  const [administrationSite, setAdministrationSite] = useState(
    dose.administration_site
  );
  const [nextDose, setNextDose] = useState(dose.next_scheduled_dose);

  const onCancel = () => setRedirect(true);

  const onSave = () => {
    const doseInput = {
      id: vaccinationDetailId,
      serial_number: serialNum,
      date_taken: dateTaken,
      administration_site: administrationSite,
      next_scheduled_dose: nextDose,
      doseId: doseDetailId,
    };

    editDoseRecord(doseInput).then((res) => {
      doseInput.date_taken &&
      doseInput.serial_number &&
      doseInput.administration_site
        ? setRedirect(true)
        : setValidate(true);
    });
  };

  return (
    <section className="doses-edit">
      {redirect && <Redirect to="/vaccinations/dose/view" />}
      <h1 className="doses-form--title">Update Vaccination Dose</h1>
      <div className="doses-form--container">
        <div className="doses-form--field">
          <DateInput
            value={dateTaken}
            setInput={setDateTaken}
            validate={validate}
          >
            Date Taken:
          </DateInput>

          <TextInput
            required
            value={serialNum}
            setInput={setSerialNum}
            validate={validate}
          >
            Serial Number:
          </TextInput>
          <TextInput
            required
            value={administrationSite}
            setInput={setAdministrationSite}
            validate={validate}
          >
            Administration Site:
          </TextInput>
          <div className="doses-form--next">
            <DateInputOpt notRequired value={nextDose} setInput={setNextDose}>
              Next Scheduled Date:
            </DateInputOpt>
          </div>
        </div>
        <div className="doses-form--user-action">
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
