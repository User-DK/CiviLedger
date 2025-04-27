// import { getDBConnection } from '../db';

// // CRUD for material_types table
// export const addMaterialType = async (materialType) => {
//   const db = await getDBConnection();
//   await db.executeSql(
//     `INSERT INTO material_types (material_name) VALUES (?)`,
//     [materialType.material_name]
//   );
// };

// export const getAllMaterialTypes = async () => {
//   const db = await getDBConnection();
//   const results = await db.executeSql(`SELECT * FROM material_types`);
//   return results[0].rows.raw();
// };

// export const getMaterialTypeByName = async (material_name) => {
//   const db = await getDBConnection();
//   const result = await db.executeSql(`SELECT * FROM material_types WHERE material_name = ?`, [material_name]);
//   return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
// };

// export const updateMaterialType = async (oldName, newName) => {
//   const db = await getDBConnection();
//   await db.executeSql(
//     `UPDATE material_types SET material_name = ? WHERE material_name = ?`,
//     [newName, oldName]
//   );
// };

// export const deleteMaterialType = async (material_name) => {
//   const db = await getDBConnection();
//   await db.executeSql(`DELETE FROM material_types WHERE material_name = ?`, [material_name]);
// };

// // CRUD for test_rates table
// export const addTestRate = async (testRate) => {
//   const db = await getDBConnection();
//   await db.executeSql(
//     `INSERT INTO test_rates (material_type, test_name, rate) VALUES (?, ?, ?)`,
//     [testRate.material_type, testRate.test_name, testRate.rate]
//   );
// };

// export const getAllTestRates = async () => {
//   const db = await getDBConnection();
//   const results = await db.executeSql(`SELECT * FROM test_rates`);
//   return results[0].rows.raw();
// };

// export const getTestRatesByMaterialType = async (material_type) => {
//   const db = await getDBConnection();
//   const results = await db.executeSql(`SELECT * FROM test_rates WHERE material_type = ?`, [material_type]);
//   return results[0].rows.raw();
// };

// export const getTestRateByMaterialAndTest = async (material_type, test_name) => {
//   const db = await getDBConnection();
//   const result = await db.executeSql(
//     `SELECT * FROM test_rates WHERE material_type = ? AND test_name = ?`,
//     [material_type, test_name]
//   );
//   return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
// };

// export const updateTestRate = async (material_type, test_name, newRate) => {
//   const db = await getDBConnection();
//   await db.executeSql(
//     `UPDATE test_rates SET rate = ? WHERE material_type = ? AND test_name = ?`,
//     [newRate, material_type, test_name]
//   );
// };

// export const deleteTestRate = async (material_type, test_name) => {
//   const db = await getDBConnection();
//   await db.executeSql(
//     `DELETE FROM test_rates WHERE material_type = ? AND test_name = ?`,
//     [material_type, test_name]
//   );
// };


// export const getMaterialTestsMap = async () => {
//   const db = await getDBConnection();
//   const results = await db.executeSql(`SELECT material_type, test_name, rate FROM test_rates`);
//   const rows = results[0].rows.raw();

//   const materialTestsMap = {};

//   rows.forEach(row => {
//     if (!materialTestsMap[row.material_type]) {
//       materialTestsMap[row.material_type] = {};
//     }
//     materialTestsMap[row.material_type][row.test_name] = row.rate;
//   });

//   return materialTestsMap;
// };

import { getDBConnection } from '../db';

// CRUD for material_types table
export const addMaterialType = async (materialType) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO material_types (material_name, isSynced, lastUpdatedAt, isDeleted) VALUES (?, ?, ?, ?)`,
    [materialType.material_name, 0, new Date().toISOString(), 0]
  );
};

export const getAllMaterialTypes = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM material_types WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getMaterialTypeByName = async (material_name) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `SELECT * FROM material_types WHERE material_name = ? AND isDeleted = 0`,
    [material_name]
  );
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const updateMaterialType = async (oldName, newName) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE material_types SET material_name = ?, isSynced = ?, lastUpdatedAt = ? WHERE material_name = ?`,
    [newName, 0, new Date().toISOString(), oldName]
  );
};

export const deleteMaterialType = async (material_name) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE material_types SET isSynced = ?, lastUpdatedAt = ?, isDeleted = ? WHERE material_name = ?`,
    [0, new Date().toISOString(), 1, material_name]
  );
};

// CRUD for test_rates table
export const addTestRate = async (testRate) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO test_rates (material_type, test_name, rate, isSynced, lastUpdatedAt, isDeleted) VALUES (?, ?, ?, ?, ?, ?)`,
    [testRate.material_type, testRate.test_name, testRate.rate, 0, new Date().toISOString(), 0]
  );
};

export const getAllTestRates = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM test_rates WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getTestRatesByMaterialType = async (material_type) => {
  const db = await getDBConnection();
  const results = await db.executeSql(
    `SELECT * FROM test_rates WHERE material_type = ? AND isDeleted = 0`,
    [material_type]
  );
  return results[0].rows.raw();
};

export const getTestRateByMaterialAndTest = async (material_type, test_name) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `SELECT * FROM test_rates WHERE material_type = ? AND test_name = ? AND isDeleted = 0`,
    [material_type, test_name]
  );
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const updateTestRate = async (material_type, test_name, newRate) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE test_rates SET rate = ?, isSynced = ?, lastUpdatedAt = ? WHERE material_type = ? AND test_name = ?`,
    [newRate, 0, new Date().toISOString(), material_type, test_name]
  );
};

export const deleteTestRate = async (material_type, test_name) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE test_rates SET isSynced = ?, lastUpdatedAt = ?, isDeleted = ? WHERE material_type = ? AND test_name = ?`,
    [0, new Date().toISOString(), 1, material_type, test_name]
  );
};

export const getMaterialTestsMap = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT material_type, test_name, rate FROM test_rates WHERE isDeleted = 0`);
  const rows = results[0].rows.raw();
  const materialTestsMap = {};
  rows.forEach(row => {
    if (!materialTestsMap[row.material_type]) {
      materialTestsMap[row.material_type] = {};
    }
    materialTestsMap[row.material_type][row.test_name] = row.rate;
  });
  return materialTestsMap;
};
