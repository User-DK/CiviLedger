import { getDBConnection } from '../db';

export const addConsultant = async (consultant) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO Consultants (consultant_code, consultant_name, phone_number, password, isSynced, lastUpdatedAt) VALUES (?, ?, ?, ?,?,?)`,
    [consultant.consultant_code, consultant.name, consultant.phone, consultant.password, 0, new Date().toISOString()]
  );
};

export const getAllConsultants = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Consultants WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getAllConsultantsCodes = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT consultant_code FROM Consultants WHERE isDeleted = 0`);
  return results[0].rows.raw().map(row => row.consultant_code);
};

export const getAllConsultantsbyDate = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Consultants WHERE isDeleted = 0 ORDER BY lastUpdatedAt DESC`);
  return results[0].rows.raw();
};

export const getConsultantByID = async (consultant_code) => {
  const db = await getDBConnection();
  const result = await db.executeSql(`SELECT * FROM Consultants where consultant_code= ? AND isDeleted = 0`, [consultant_code]);
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const getPaginatedConsultantsRecords = async (page = 1, pageSize = 15) => {
  const db = await getDBConnection();
  const offset = (page - 1) * pageSize;

  const recordsResult = await db.executeSql(
    `SELECT * FROM Consultants
     WHERE isDeleted = 0
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const records = recordsResult[0].rows.raw();

  const totalCountResult = await db.executeSql(`SELECT COUNT(*) as total FROM Consultants WHERE isDeleted = 0`);
  const totalCount = totalCountResult[0].rows.item(0).total;

  const results = { records: records, totalPages: Math.ceil(totalCount / pageSize) };

  return results;
};


// export const getConsultantByCode = async (consultant_code) => {
//   const db = await getDBConnection();
//   const results = await db.executeSql(`SELECT * FROM Consultants WHERE consultant_code = ?`, [consultant_code]);
//   return results[0].rows.item(0);
// };

export const updateConsultant = async (consultant) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Consultants SET consultant_name = ?, phone_number = ?, password = ?, isSynced = ?, lastUpdatedAt = ? WHERE consultant_code = ?`,
    [consultant.name, consultant.phone, consultant.password, 0, new Date().toISOString(), consultant.consultant_code]
  );
};

export const softDeleteConsultantRecord = async (consultant_code) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE Consultants SET
      isSynced = ?, lastUpdatedAt = ?, isDeleted = ?
      WHERE consultant_code = ?
    `, [0, new Date().toISOString(), 1, consultant_code]);
  return result[0].rowsAffected > 0;
}

export const deleteConsultant = async (consultant_code) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM Consultants WHERE consultant_code = ?`, [consultant_code]);
};

// export const deleteConsultant = async (code) => {
//   const db = await getDBConnection();
//   await db.executeSql(`UPDATE Consultants  SET name_of_party = ?, ..., isSynced = 0, lastUpdatedAt = ? WHERE consultant_code = ?`, [code]);
// };