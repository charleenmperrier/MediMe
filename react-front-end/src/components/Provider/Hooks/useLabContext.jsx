// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

export default function useLabContext() {
  // Lab states
  const [labs, setLabs] = useState([]);
  const [labRecords, setLabRecords] = useState([]);
  const [labRecordDetailId, setLabRecordDetailId] = useState({});
  const [labRecordEditId, setLabRecordEditId] = useState({});

  // Labs database calls
  const labExists = (name) => {
    return labs.find((lab) => lab.name === name) ? true : false;
  };

  const addLab = (formData) => {
    return axios
      .post("/api/labs/list", formData)
      .then(() => refreshAllLabsList())
      .catch((err) => console.log(err));
  };

  const addLabRecord = (formData) => {
    return axios
      .post("/api/labs/", formData)
      .then((res) => {
        refreshAllLabs();

        return res;
      })
      .catch((err) => console.log(err));
  };

  const editLabRecord = (formData) => {
    return axios
      .put(`/api/labs/${labRecordDetailId}`, formData)
      .then((res) => {
        refreshAllLabs();

        return res;
      })
      .catch((err) => console.log(err));
  };

  const deleteLabRecord = () => {
    return axios
      .delete(`/api/labs/${labRecordDetailId}`)
      .then((res) => {
        refreshAllLabs();

        return res;
      })
      .catch((err) => console.log(err));
  };

  const refreshAllLabs = () => {
    return axios.get("/api/labs").then((res) => {
      setLabRecords(res.data.lab_records);
    });
  };

  const refreshAllLabsList = () => {
    return axios.get("/api/labs/list").then((res) => {
      setLabs(res.data.labs);
    });
  }

  useEffect(() => {
    const apiLabRecordsUrl = "/api/labs";
    const apiLabsUrl = "/api/labs/list";

    Promise.all([axios.get(apiLabRecordsUrl), axios.get(apiLabsUrl)]).then(
      (res) => {
        const records = res[0].data.lab_records;
        const labs = res[1].data.labs;

        setLabRecords(records);
        setLabs(labs);

        return;
      }
    );
  }, []);

  // Lab exports
  const labData = {
    labs,
    setLabs,
    labRecords,
    setLabRecords,
    labRecordDetailId,
    labRecordEditId,
    setLabRecordDetailId,
    setLabRecordEditId,
    addLabRecord,
    deleteLabRecord,
    editLabRecord,
    labExists,
    addLab,
  };

  return labData;
};
