const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
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
      password TEXT NOT NULL
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
      cumulative_amount REAL,
      cumulative_amount_incl_gst REAL,
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
      cumulative_amount REAL,
      cumulative_amount_incl_gst REAL,
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
      cumulative_amount REAL,
      cumulative_amount_incl_gst REAL,
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

});

module.exports = db;
