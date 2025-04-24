import { Alert } from 'react-native';

const SQLite = require('react-native-sqlite-storage');

SQLite.enablePromise(true);


const insertTestRates = [
  ['LL PL Earth Work', 1000],
  ['Proctor Density', 1500],
  ['Sieve Analysis for Hard Murrm', 1000],
  ['Liquid lim. & Plastic lim.-Murum', 1000],
  ['Sieve Analysis for 40mm Below', 550],
  ['Group Test for 40mm Below', 2300],
  ['Flakiness Index for 40mm Below', 750],
  ['Sieve Analysis for 40mm Above', 550],
  ['Group Test for 40mm Above', 2700],
  ['Flakiness Index for 40mm Above', 750],
  ['Bitumen: Penetration, Softening Point, Sp. Gravity', 1650],
  ['Ductility', 1000],
  ['Penetration', 550],
  ['Softening Point', 550],
  ['Sieve Analysis Mix Material', 550],
  ['Group Test Mix Material', 2300],
  ['Flakiness Mix Material', 750],
  ['Extraction Mix Material', 1350],
  ['GSB Mix Design', 15000],
  ['BM Job Mix Design', 7500],
  ['BC Job Mix Design', 15500],
  ['Cement Testing', 3500],
  ['Crushed Sand (Sieve +Silt)', 1100],
  ['Bricks (Wet, Dry, Water Absorption)', 3000],
  ['Bricks (Wet, Dry, Water Absorption,  Efflorescence)', 2250],
  ['Concrete Cube', 500],
  ['Steel testing', 1200],
  ['Concrete Mix Design', 12500],
  ['20 mm Aggregate (Sieve Analysis)', 550],
  ['10 mm Aggregate (Sieve Analysis)', 1850],
  ['10/20 mm Aggregate (Gr. Test)', 2300],
  ['Vitrified Tile', 2000],
  ['Bulk Density', 550],
  ['Moisture Content', 550],
  ['Deleterious Material', 550],
  ['Impact Test', 750],
  ['Crushing Value', 750],
  ['Abrasion Test', 1000],
  ['Sp. Gravity', 550],
  ['Water Absorption', 550],
  ['Cement Testing Complete', 5000],
  ['SOIL', 0],
  ['Aggregate', 0],
  ['Bitumen', 0],
  ['Paving_Mix', 0],
  ['BT_Mix_Design', 0],
  ['Building_Material', 0],
  ['Sieve Analysis for 40mm Below', 0],
  ['Group Test for 40mm Below', 0],
  ['Ductility', 0],
  ['Flakiness Mix Material', 0],
  ['BC Job Mix Design', 0],
  ['Cement Testing (7D)', 0],
  ['Bricks (Wet, Dry, Water Absorption)', 0],
  ['Bricks (Wet, Dry, Water Absorption, Efflorescence)', 0],
  ['Concrete Cube', 0],
  ['Concrete Mix Design', 0],
  ['10/20 mm Aggregate (Gr. Test)', 0],
  ['20 mm Aggregate (Sieve Analysis)', 0],
  ['10 mm Aggregate (Sieve Analysis)', 0],
  ['Vitrified Tile', 0]
];

export const openAndInitDB = async () => {
  try {
    const db = await SQLite.openDatabase({ name: 'Process.db', location: 'default' });
    await db.executeSql('PRAGMA foreign_keys = ON;');
    await createTables(db);
    return db;
  } catch (error) {
    console.error('DB Init Error:', error);
    throw error;
  }
};

export const createTables = async (db) => {
  const testersTable = `
    CREATE TABLE IF NOT EXISTS Testers (
      tester_code TEXT PRIMARY KEY,
      tester_name TEXT NOT NULL,
      phone_number TEXT,
      isSynced INTEGER DEFAULT 0,
      lastUpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0
    );
  `;

  const consultantsTable = `
    CREATE TABLE IF NOT EXISTS Consultants (
      consultant_code TEXT PRIMARY KEY,
      consultant_name TEXT NOT NULL,
      phone_number TEXT,
      password TEXT NOT NULL,
      isSynced INTEGER DEFAULT 0,
      lastUpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0
    );
  `;

  const processTPATable = `
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
      isSynced INTEGER DEFAULT 0,
      lastUpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0,
      FOREIGN KEY (consultant_code) REFERENCES Consultants (consultant_code),
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    );
  `;

  const processTestingTable = `
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
      isSynced INTEGER DEFAULT 0,
      lastUpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0,
      FOREIGN KEY (testers) REFERENCES Testers (tester_code),
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    );
  `;

  const processConsultancyTable = `
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
      payment_status INTEGER,
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
      isSynced INTEGER DEFAULT 0,
      lastUpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0,
      FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code),
      FOREIGN KEY (material_properties) REFERENCES Testers (tester_code),
      FOREIGN KEY (cube_preparation) REFERENCES Testers (tester_code),
      FOREIGN KEY (casting) REFERENCES Testers (tester_code),
      FOREIGN KEY (demoulding) REFERENCES Testers (tester_code),
      FOREIGN KEY (testing) REFERENCES Testers (tester_code)
    );
  `;

  const createTestRatesTable = `
    CREATE TABLE IF NOT EXISTS test_rates (
      test_name TEXT,
      rate INTEGER
    );
  `;

  try {
    await db.executeSql(testersTable);
    await db.executeSql(consultantsTable);
    await db.executeSql(processTPATable);
    await db.executeSql(processTestingTable);
    await db.executeSql(processConsultancyTable);
    await db.executeSql(createTestRatesTable);
    await db.executeSql('DELETE FROM test_rates;');
    for (const [name, rate] of insertTestRates) {
      await db.executeSql(
        `INSERT OR IGNORE INTO test_rates (test_name, rate) VALUES (?, ?)`,
        [name, rate]
      );
    }

    // Alert.alert("created tables successfully", "You can now use the app.");
  } catch (error) {
    console.error("Error creating tables:", error);
    Alert.alert("Error creating tables", error.message);
  }
};
