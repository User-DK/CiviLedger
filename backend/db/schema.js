const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

const materialTestsMap = {
  Aggregate: {
    'Sieve Analysis for 40mm Below': 550,
    'Group Test for 40mm Below': 2300,
    'Flakiness Index for 40mm Below': 750,
    'Group Test for 40mm Above': 2700,
    'Flakiness Index for 40mm Above': 750,
    'Bulk Density': 550,
    'Moisture Content': 550,
    'Deleterious Material': 550,
    'Impact Test': 750,
    'Crushing Value': 750,
    'Abrasion Test': 1000,
    'Sp. Gravity': 550,
    'Water Absorption': 550,
    'LL PL Earth Work': 1000,
  },
  Bitumen: {
    'Bitumen: Penetration, Softening Point, Sp. Gravity': 1650,
    'Ductility': 1000,
    'Penetration': 550,
    'Softening Point': 550,
  },
  SOIL: {
    'LL PL Earth Work': 1000,
    'Proctor Density': 1500,
    'Sieve Analysis for Hard Murum': 1000,
    'Liquid lim. & Plastic lim.-Murum': 1000,
  },
  Paving_Mixtures: {
    'Sieve Analysis Mix Material': 550,
    'Group Test Mix Material': 2300,
    'Flakiness Mix Material': 750,
    'Extraction Mix Material': 1350,
  },
  BT_Mix_Designs: {
    'GSB Mix Design': 15000,
    'BM Job Mix Design': 7500,
    'BC Job Mix Design': 15500,
  },
  Building_Materials: {
    'Cement Testing': 3500,
    'Cement Testing (7D)': 5000,
    'Cement Testing Complete': 5000,
    'Crushed Sand (Sieve +Silt)': 1100,
    'Bricks (Wet, Dry, Water Absorption)': 3000,
    'Bricks (Wet, Dry, Water Absorption, Efflorescence)': 2250,
    'Concrete Cube': 500,
    'Steel testing': 1200,
    'Concrete Mix Design': 12500,
    '20 mm Aggregate (Sieve Analysis)': 550,
    '10 mm Aggregate (Sieve Analysis)': 1850,
    '10/20 mm Aggregate (Gr. Test)': 2300,
    'Vitrified Tile': 2000,
  },
};


db.serialize(async () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Testers (
      tester_code TEXT PRIMARY KEY,
      tester_name TEXT NOT NULL,
      phone_number TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Consultants (
      consultant_code TEXT PRIMARY KEY,
      consultant_name TEXT NOT NULL,
      phone_number TEXT,
      password TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Process_TPA (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_party TEXT,
      name_of_corporation TEXT,
      details_of_work TEXT,
      amount REAL,
      total_incl_gst REAL,
      visit_status INTEGER,
      document_receipt TEXT,
      report_status INTEGER,
      payment_status INTEGER,
      payment_date TEXT,
      jv_no TEXT,
      receipt_no TEXT,
      consultant_code TEXT,
      date TEXT,
      remarks TEXT,
      entered_by TEXT,
      FOREIGN KEY (consultant_code) REFERENCES Consultants (consultant_code),
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Process_Testing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_party TEXT,
      details_of_work TEXT,
      amount REAL,
      total_incl_gst REAL,
      material_receipt TEXT,
      testing_status INTEGER,
      report_status INTEGER,
      payment_status INTEGER,
      payment_date TEXT,
      jv_no TEXT,
      receipt_no TEXT,
      date TEXT,
      testers TEXT,
      remarks TEXT,
      entered_by TEXT,
      FOREIGN KEY (testers) REFERENCES Testers (tester_code),
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    );
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS Process_Consultancy (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_party TEXT,
      details_of_work TEXT,
      amount REAL,
      total_incl_gst REAL,
      material_receipt TEXT,
      testing_status INTEGER,
      report_status INTEGER,
      payment_date TEXT,
      jv_no TEXT,
      receipt_no TEXT,
      date TEXT,
      material_properties TEXT,
      cube_preparation TEXT,
      casting TEXT,
      demoulding TEXT,
      testing TEXT,
      remarks TEXT,
      entered_by TEXT,
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code),
      FOREIGN KEY (material_properties) REFERENCES Testers (tester_code),
      FOREIGN KEY (cube_preparation) REFERENCES Testers (tester_code),
      FOREIGN KEY (casting) REFERENCES Testers (tester_code),
      FOREIGN KEY (demoulding) REFERENCES Testers (tester_code),
      FOREIGN KEY (testing) REFERENCES Testers (tester_code)
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS material_types(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material_name TEXT
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS test_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      material_type TEXT,
      test_name TEXT,
      rate INTEGER,
      FOREIGN KEY (material_type) REFERENCES material_types (material_name),
      UNIQUE(material_type, test_name)
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS Process_Estimation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_party TEXT,
      service_type TEXT,
      igst REAL,
      cgst REAL,
      sgst REAL,
      total_amount REAL,
      total_amount_inc_gst REAL
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS EstimationDetails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      party_id INTEGER,
      material_type TEXT,
      test_name TEXT,
      no_of_tests INTEGER,
      total_amount REAL,
      FOREIGN KEY (party_id) REFERENCES Process_Estimation (id),
      FOREIGN KEY (material_type) REFERENCES material_types (material_name),
      FOREIGN KEY (material_type, test_name) REFERENCES test_rates (material_type, test_name)
    );
  `);

  try {
    for (const materialType of Object.keys(materialTestsMap)) {
      await runQuery(
        `INSERT OR IGNORE INTO material_types (material_name) VALUES (?)`,
        [materialType]
      );
    }

    for (const [materialType, tests] of Object.entries(materialTestsMap)) {
      for (const [testName, rate] of Object.entries(tests)) {
        await runQuery(
          `INSERT OR IGNORE INTO test_rates (material_type, test_name, rate) VALUES (?, ?, ?)`,
          [materialType, testName, rate]
        );
      }
    }
  } catch (error) {
    console.error("Error inserting material types and test rates:", error.message);
  }
});



module.exports = db;
