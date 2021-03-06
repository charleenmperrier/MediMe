const express = require("express");
const router = express.Router();
const { addVaccination, addDose, updateDose } = require("../db/queries/queries-vaccinations");

module.exports = (client) => {
  // Get all vaccinations
  router.get("/", (req, res) => {
    const query = `SELECT * FROM vaccinations ORDER BY id DESC;`;

    client
      .query(query)
      .then((data) => {
        const vaccinations = data.rows;
        res.json({ vaccinations });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Add new vaccination record
  router.post("/", (req, res) => {
    const user_id = 1;

    addVaccination({ user_id, ...req.body })
      .then((cv) => res.json(cv))
      .catch((err) => res.json({ error: err.message }));
  });

  // Delete vaccination record
  router.delete("/:id", (req, res) => {
    const query = `DELETE FROM vaccinations WHERE id = $1`;

    client
      .query(query, [req.params.id])
      .then(res.status(200).json({ status: "succcessfully deleted" }))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Get all doses
  router.get("/dose", (req, res) => {
    const query = `SELECT * FROM vaccination_doses ORDER BY date_taken ASC`;

    client
      .query(query)
      .then((data) => {
        const doses = data.rows;
        res.status(200).json({ doses });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Get one specific vaccination record
  router.get("/:id", (req, res) => {
    const query = `SELECT * FROM vaccination_doses WHERE id = $1;`;

    client
      .query(query, [req.params.id])
      .then((data) => {
        const doses = data.rows;
        res.status(200).json({ doses });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Get all doses associated to specific vaccination
  router.get("/:id/dose", (req, res) => {
    const query = `SELECT * FROM vaccination_doses WHERE vaccination_id = $1;`;

    client
      .query(query, [req.params.id])
      .then((data) => {
        const doses = data.rows;
        res.status(200).json({ doses });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Add new dose record
  router.post("/:id/dose", (req, res) => {
    const id = req.params.id;

    addDose({ id, ...req.body })
      .then((dose) => res.status(200).json(dose))
      .catch((err) => res.json({ error: err.message }));
  });

  // Get specific dose record
  router.get("/:id/dose/:doseId", (req, res) => {
    const query = `SELECT * FROM vaccination_doses WHERE vaccination_id = $1 AND id = $2;`;

    client
      .query(query, [req.params.id, req.params.doseId])
      .then((data) => {
        const doses = data.rows;
        res.status(200).json({ doses });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Edit an existing dose record
  router.put("/:id/dose/:doseId", (req, res) => {
    const id = req.params.id;
    const doseId = req.params.doseId;

    updateDose({ id, doseId, ...req.body })
      .then((dose) => res.status(200).json(dose))
      .catch((err) => res.json({ error: err.message }));
  });

  // Delete dose record
  router.delete("/:id/dose/:doseId", (req, res) => {
    const query = `DELETE FROM vaccination_doses WHERE vaccination_id = $1 AND id = $2`;

    client
      .query(query, [req.params.id, req.params.doseId])
      .then(res.status(200).json({ status: "succcessfully deleted" }))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  return router;
};
