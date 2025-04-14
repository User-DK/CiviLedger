const db = require("../db/schema");

exports.getPaginatedTPA = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM Process_TPA`;
  const dataQuery = `
    SELECT * FROM Process_TPA
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      console.error("Count error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).json({ error: "Failed to fetch records" });
      }

      res.json({
        page,
        totalPages,
        totalRecords: total,
        data: rows,
      });
    });
  });
};


exports.getPaginatedTesting = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM Process_Testing`;
  const dataQuery = `
    SELECT * FROM Process_Testing
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      console.error("Count error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).json({ error: "Failed to fetch records" });
      }

      res.json({
        page,
        totalPages,
        totalRecords: total,
        data: rows,
      });
    });
  });
};


exports.getPaginatedConsultancy = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM Process_Consultancy`;
  const dataQuery = `
    SELECT * FROM Process_Consultancy
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      console.error("Count error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).json({ error: "Failed to fetch records" });
      }

      res.json({
        page,
        totalPages,
        totalRecords: total,
        data: rows,
      });
    });
  });
};


exports.getTPAByID = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Process_TPA WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Failed to fetch record" });
    }

    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(row);
  });
}


exports.getTestingByID = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Process_Testing WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Failed to fetch record" });
    }

    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(row);
  });
}


exports.getConsultancyByID = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Process_Consultancy WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Failed to fetch record" });
    }

    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(row);
  });
}