const express = require("express");
const router = express.Router();

module.exports = (client) => {
  // Get all doctors
  router.get("/", (req, res) => {
    const query = `SELECT * FROM pharmacies;`;

    client
      .query(query)
      .then((data) => {
        const pharmacies = data.rows;
        res.json({ pharmacies });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Add new pharmacy
  router.post("/", (req, res) => {
    const query = `
      INSERT INTO pharmacies (name)
      VALUES ($1)
      RETURNING *
      ;`;

    client
      .query(query, [req.body.name])
      .then((data) => {
        const pharmacies = data.rows;
        res.status(200).json({ pharmacies });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
