// Libraries
import { useContext, useState } from "react";
import { Redirect } from "react-router";

// Components
import TextInput from "../../TextInput";
import DateInput from "../../DateInput";
import IconButton from "../../IconButton";

// Helpers
import { dataContext } from "../../hooks/DataProvider";

// Stylesheet
import "../../../styles/form.scss";


export default function DoseEdit() {
  // Redirect state
  const [redirect, setRedirect] = useState('');

  // Validate form error state
  const [validate, setValidate] = useState(false);
  
  // Uncomment vaccinationDetail and doseDetail after merge
  const {  vaccinationDetail ,  vaccinations, doseDetail, allDoses, editDoseRecord } = useContext(dataContext);

  // Find vaccine from vaccine id
  const vaccination = vaccinations.find((vaccination) => vaccination.id === vaccinationDetail);

  // Fnd dose from dose id
  const dose = allDoses.find((dose) => dose.id === doseDetail);


  const [serialNum, setSerialNum] = useState(dose.serial_number);
  const [dateTaken, setDateTaken] = useState(dose.date_taken);
  const [administrationSite, setAdministrationSite] = useState(dose.administration_site);
  const [nextDose, setNextDose] = useState(dose.next_scheduled_dose);

  const onCancel = () => setRedirect(true);

  const onSave = () => {
    const doseInput = {
      id: vaccinationDetail,
      serial_number: serialNum,
      date_taken: dateTaken,
      administration_site: administrationSite,
      next_scheduled_dose: nextDose,
      doseId: doseDetail
    }

    editDoseRecord(doseInput).then((res) => {
      (doseInput.date_taken && doseInput.serial_number && doseInput.administration_site) 
        ? setRedirect(true) 
        : setValidate(true);
    });
  };

  return (
    <section className="clinics-new">
      {redirect && <Redirect to="/vaccinations" />}
      <h1 className="clinics-list--title">Update Vaccination Dose</h1>
      <div className="clinics-form--container">
        <div className="clinics--form--field">
          <DateInput date={dateTaken} onChange={setDateTaken} validate={validate}>
            Date Taken:
          </DateInput>
          
          <TextInput required value={serialNum} setInput={setSerialNum} validate={validate}>
            Serial Number:
          </TextInput>
          <TextInput required value={administrationSite} setInput={setAdministrationSite} validate={validate}>
            Administration Site:
          </TextInput>

          <DateInput notRequired date={nextDose} onChange={setNextDose} >
            Next Scheduled Date:
          </DateInput>
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