
//asli estimation by yash
import { getDBConnection } from '../db';

export const addEstimationDetail = async (detail) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO EstimationDetails (party_id, material_type, test_name, no_of_tests, total_amount, isSynced, lastUpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      detail.party_id,
      detail.material_type,
      detail.test_name,
      detail.no_of_tests,
      detail.total_amount,
      0,
      new Date().toISOString(),
    ]
  );
};

export const getAllEstimationDetails = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM EstimationDetails WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getEstimationDetailsByPartyID = async (party_id) => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM EstimationDetails WHERE party_id = ? AND isDeleted = 0`, [party_id]);
  return results[0].rows.raw();
};

export const updateEstimationDetail = async (detail) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE EstimationDetails SET material_type = ?, test_name = ?, no_of_tests = ?, total_amount = ?, isSynced = ?, lastUpdatedAt = ? WHERE id = ?`,
    [
      detail.material_type,
      detail.test_name,
      detail.no_of_tests,
      detail.total_amount,
      0,
      new Date().toISOString(),
      detail.id,
    ]
  );
};

export const softDeleteEstimationDetail = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE EstimationDetails SET isSynced = ?, lastUpdatedAt = ?, isDeleted = ? WHERE id = ?`,
    [0, new Date().toISOString(), 1, id]
  );
  return result[0].rowsAffected > 0;
};

export const deleteEstimationDetail = async (id) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM EstimationDetails WHERE id = ?`, [id]);
};