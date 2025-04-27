const db = require("../db/schema");

const insertOrUpdate = (table, row) => {
  const keys = Object.keys(row);
  const placeholders = keys.map(() => "?").join(", ");
  const updates = keys.map((k) => `${k} = ?`).join(", ");

  let conflictColumn = "id"; // Default conflict column
  if (table === "Testers") {
    conflictColumn = "tester_code";
  } else if (table === "Consultants") {
    conflictColumn = "consultant_code";
  }

  const sql = `
    INSERT INTO ${table} (${keys.join(", ")})
    VALUES (${placeholders})
    ON CONFLICT(${conflictColumn}) DO UPDATE SET ${updates}
  `;
  // const sql = `
  //   INSERT INTO ${table} (${keys.join(", ")})
  //   VALUES (${placeholders})
  //   ON CONFLICT(id) DO UPDATE SET ${updates}
  // `;

  const values = [...keys.map(k => row[k]), ...keys.map(k => row[k])];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
// const insertOrUpdate = (table, row) => {
//   const keys = Object.keys(row);
//   const placeholders = keys.map(() => "?").join(", ");
//   const updates = keys.map((k) => `${k} = ?`).join(", ");

//   const sql = `
//     INSERT INTO ${table} (${keys.join(", ")})
//     VALUES (${placeholders})
//     ON CONFLICT(id) DO UPDATE SET ${updates}
//   `;

//   const values = [...keys.map(k => row[k]), ...keys.map(k => row[k])];

//   console.log("Executing SQL:", sql); // Debugging
//   console.log("With values:", values); // Debugging

//   return new Promise((resolve, reject) => {
//     db.run(sql, values, function (err) {
//       if (err) {
//         console.error("SQL Error:", err); // Debugging
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

exports.deleteTPA = async (req, res) => {
  try {
    const rows = req.body.tpa || [];
    for (const row of rows) {
      if (row.isDeleted === 1) {
        await db.run("DELETE FROM Process_TPA WHERE id = ?", [row.id]);
      } else {
        await insertOrUpdate("Process_TPA", row);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to sync TPA");
  }
};

// Similar for Process_Testing and Process_Consultancy
exports.deleteTesting = async (req, res) => {
  const rows = req.body.testing || [];
  for (const row of rows) {
    if (row.isDeleted === 1) {
      await db.run("DELETE FROM Process_Testing WHERE id = ?", [row.id]);
    } else {
      await insertOrUpdate("Process_Testing", row);
    }
  }
  res.sendStatus(200);
};

exports.deleteConsultancy = async (req, res) => {
  const rows = req.body.consultancy || [];
  for (const row of rows) {
    if (row.isDeleted === 1) {
      await db.run("DELETE FROM Process_Consultancy WHERE id = ?", [row.id]);
    } else {
      await insertOrUpdate("Process_Consultancy", row);
    }
  }
  res.sendStatus(200);
};

// New function to handle syncing all tables dynamically
exports.uploadChanges = async (req, res) => {
  try {
    const changes = req.body;

    for (const [table, rows] of Object.entries(changes)) {
      for (const row of rows) {
        if (row.isDeleted === 1) {
          await db.run(`DELETE FROM ${table} WHERE id = ?`, [row.id]);
        } else {
          await insertOrUpdate(table, row);
        }
      }
    }

    res.json({ message: "Data synced successfully" });
  } catch (err) {
    console.error("Sync Error:", err);
    res.status(500).json({ message: "Failed to sync data" });
  }
};

//yash added estimation

// Sync Process_Estimation table
exports.syncProcessEstimation = async (req, res) => {
  try {
    const rows = req.body.estimation || [];
    for (const row of rows) {
      if (row.isDeleted === 1) {
        await db.run("DELETE FROM Process_Estimation WHERE id = ?", [row.id]);
      } else {
        await insertOrUpdate("Process_Estimation", row);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Sync Error:", err);
    res.status(500).send("Failed to sync Process_Estimation");
  }
};

// Sync EstimationDetails table
exports.syncEstimationDetails = async (req, res) => {
  try {
    const rows = req.body.estimationDetails || [];
    for (const row of rows) {
      if (row.isDeleted === 1) {
        await db.run("DELETE FROM EstimationDetails WHERE id = ?", [row.id]);
      } else {
        await insertOrUpdate("EstimationDetails", row);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Sync Error:", err);
    res.status(500).send("Failed to sync EstimationDetails");
  }
};