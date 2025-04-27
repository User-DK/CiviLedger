const db = require("../db/schema");

const insertOrUpdate = (table, row) => {
  const keys = Object.keys(row);
  const placeholders = keys.map(() => "?").join(", ");
  const updates = keys.map((k) => `${k} = ?`).join(", ");

  const sql = `
    INSERT INTO ${table} (${keys.join(", ")})
    VALUES (${placeholders})
    ON CONFLICT(id) DO UPDATE SET ${updates}
  `;

  const values = [...keys.map(k => row[k]), ...keys.map(k => row[k])];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

exports.uploadTPA = async (req, res) => {
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
exports.uploadTesting = async (req, res) => {
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

exports.uploadConsultancy = async (req, res) => {
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