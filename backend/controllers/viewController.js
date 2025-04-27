const db = require("../db/schema");
const ExcelJS = require('exceljs');

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

// //yash
// const exportToExcel = async (res, tableName, fileName) => {
//   const query = `SELECT * FROM ${tableName}`;

//   db.all(query, [], async (err, rows) => {
//     if (err) {
//       console.error("Excel export error:", err);
//       return res.status(500).json({ error: "Database error during Excel export" });
//     }

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet(tableName);

//     if (rows.length > 0) {
//       worksheet.columns = Object.keys(rows[0]).map(key => ({
//         header: key,
//         key: key,
//         width: 20
//       }));

//       rows.forEach(row => worksheet.addRow(row));
//     }

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader("Content-Disposition", `attachment; filename=${fileName}.xlsx`);

//     await workbook.xlsx.write(res);
//     res.end();
//   });
// };

// exports.downloadTestingExcel = (req, res) => {
//   exportToExcel(res, "Process_Testing", "Testing_Records");
// };

// exports.downloadTPAExcel = (req, res) => {
//   exportToExcel(res, "Process_TPA", "TPA_Records");
// };

// exports.downloadConsultancyExcel = (req, res) => {
//   exportToExcel(res, "Process_Consultancy", "Consultancy_Records");
// };



exports.exportConsultancyExcel = (req, res) => {
  const query = `SELECT * FROM Process_Consultancy`;

  db.all(query, [], async (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch records" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Consultancy Records');

      worksheet.columns = Object.keys(rows[0] || {}).map(key => ({
        header: key,
        key: key,
        width: 20
      }));

      rows.forEach(row => {
        worksheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=consultancy.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (excelErr) {
      console.error("Excel generation error:", excelErr);
      res.status(500).json({ error: "Failed to generate Excel file" });
    }
  });
};
exports.exportTestingExcel = (req, res) => {
  const query = `SELECT * FROM Process_Testing`;

  db.all(query, [], async (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch records" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Testing Records');

      worksheet.columns = Object.keys(rows[0] || {}).map(key => ({
        header: key,
        key: key,
        width: 20
      }));

      rows.forEach(row => {
        worksheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=testing.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (excelErr) {
      console.error("Excel generation error:", excelErr);
      res.status(500).json({ error: "Failed to generate Excel file" });
    }
  });
};

exports.exportTPAExcel = (req, res) => {
  const query = `SELECT * FROM Process_TPA`;

  db.all(query, [], async (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch records" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('TPA Records');

      worksheet.columns = Object.keys(rows[0] || {}).map(key => ({
        header: key,
        key: key,
        width: 20
      }));

      rows.forEach(row => {
        worksheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=tpa.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (excelErr) {
      console.error("Excel generation error:", excelErr);
      res.status(500).json({ error: "Failed to generate Excel file" });
    }
  });
};

//yash added estimation
// Pagination for Process_Estimation
exports.getPaginatedEstimation = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM Process_Estimation`;
  const dataQuery = `
    SELECT * FROM Process_Estimation
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

// Fetch Process_Estimation by ID
exports.getEstimationByID = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Process_Estimation WHERE id = ?`;

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
};

// Fetch EstimationDetails by Party ID
exports.getEstimationDetailsByParty = (req, res) => {
  const party_id = req.params.party_id;

  const query = `
    SELECT * FROM EstimationDetails
    WHERE party_id = ?
  `;

  db.all(query, [party_id], (err, rows) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Failed to fetch estimation details" });
    }

    res.json(rows);
  });
};

// Export Process_Estimation to Excel
exports.exportEstimationExcel = (req, res) => {
  const query = `SELECT * FROM Process_Estimation`;

  db.all(query, [], async (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch records" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Estimation Records');

      worksheet.columns = Object.keys(rows[0] || {}).map(key => ({
        header: key,
        key: key,
        width: 20
      }));

      rows.forEach(row => {
        worksheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=estimation.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (excelErr) {
      console.error("Excel generation error:", excelErr);
      res.status(500).json({ error: "Failed to generate Excel file" });
    }
  });
};

// Export EstimationDetails to Excel
exports.exportEstimationDetailsExcel = (req, res) => {
  const query = `SELECT * FROM EstimationDetails`;

  db.all(query, [], async (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Failed to fetch records" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Estimation Details');

      worksheet.columns = Object.keys(rows[0] || {}).map(key => ({
        header: key,
        key: key,
        width: 20
      }));

      rows.forEach(row => {
        worksheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=estimation_details.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (excelErr) {
      console.error("Excel generation error:", excelErr);
      res.status(500).json({ error: "Failed to generate Excel file" });
    }
  });
};
