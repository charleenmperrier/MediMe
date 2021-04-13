import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { dataContext } from "../hooks/DataProvider";
import IconButton from "../IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./ClinicDetail.scss";
import axios from "axios";

const findClinicById = (clinics, id) => {
  let name;
  clinics.forEach((clinic) => {
    if (clinic.id === id) {
      name = clinic.name;
    }
  });
  return name;
};

const findDoctorById = (doctors, id) => {
  let name;
  doctors.forEach((doctor) => {
    if (doctor.id === id) {
      name = doctor.name;
    }
  });

  return name;
};

const formatDate = (visit) => {
  const dateData = visit.date;
  const date = new Date(dateData);

  return date.toDateString();
};

export default function ClinicDetail() {
  const { clinicalVisits, clinics, doctors, clinicalVisitDetail, handleClinicEditClick } = useContext(
    dataContext
  );

  // Manage redirect state based on axios call
  const [redirect, setRedirect] = useState(false);

  const visit = clinicalVisits.find(
    (visit) => visit.id === clinicalVisitDetail
  );

  const onDelete = () => {
    axios
      .delete(`/api/clinics/${visit.id}`)
      .then(res => {
        !res.data.error && setRedirect(true);
      })
      .catch(err => console.log(err));
  };

  const onEdit = () => {
    console.log("edit button clicked");
  };

  return (
    <section className="clinic-detail">
       {(redirect) && <Redirect to="/clinics" />}
      <div className="clinics-list--icons">
        <ArrowBackIosIcon />
      </div>
      <h1 className="clinics-list--title">Clinical Visit Detail</h1>

      <div className="clinic-detail--container">
        <div className="clinic-detail--data">
          <h5 className="">Date:</h5>
          <p className="form-body">{visit && formatDate(visit)}</p>
        </div>

        <div className="clinic-detail--data">
          <h5 className="form-label">Clinic:</h5>
          <p className="form-body">
            {visit && findClinicById(clinics, visit.clinic_id)}
          </p>
        </div>

        <div className="clinic-detail--data">
          <h5 className="form-label">Doctor:</h5>
          <p className="form-body">
            {visit && findDoctorById(doctors, visit.referral_doctor_id)}
          </p>
        </div>

        <div className="clinic-detail--data">
          <h5 className="form-label">Reason for visit:</h5>
          <p className="form-body">{visit && visit.reason_for_visit}</p>
        </div>

        <div className="clinic-detail--data">
          <h5 className="form-label">Doctor's diagnosis:</h5>
          <p className="form-body">{visit && visit.doctor_diagnosis}</p>
        </div>
      </div>

      <div className="clinic-detail--user-action">
        <IconButton
          delete
          variant="outlined"
          color="secondary"
          onClick={onDelete}
        >
          Delete
        </IconButton>
        <Link to="/clinics/edit"><IconButton
          edit
          variant="contained"
          color="secondary"
          onClick={() => handleClinicEditClick(visit.id)}
        >
          Edit
        </IconButton></Link>
      </div>
    </section>
  );
}

