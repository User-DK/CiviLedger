import { getDBConnection } from '../db';

export const addTester = async (tester) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO Testers (
      tester_code, tester_name, phone_number, isSynced, lastUpdatedAt, isDeleted
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      tester.code,
      tester.name,
      tester.phone,
      0,
      new Date().toISOString(),
      0
    ]
  );
};

export const getAllTesters = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Testers WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getAllTesterCodes = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT tester_code FROM Testers WHERE isDeleted = 0`);
  return results[0].rows.raw().map(row => row.tester_code);
};

export const getAllTestersByDate = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Testers WHERE isDeleted = 0 ORDER BY lastUpdatedAt DESC`);
  return results[0].rows.raw();
};

export const getTesterByCode = async (code) => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Testers WHERE tester_code = ? AND isDeleted = 0`, [code]);
  return results[0].rows.length > 0 ? results[0].rows.item(0) : null;
};

export const getPaginatedTesterRecords = async (page = 1, pageSize = 10) => {
  const db = await getDBConnection();
  const offset = (page - 1) * pageSize;

  const recordsResult= await db.executeSql(
    `SELECT * FROM Testers
     WHERE isDeleted = 0
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const records = recordsResult[0].rows.raw();

  const totalCountResult = await db.executeSql(`SELECT COUNT(*) as total FROM Testers WHERE isDeleted = 0`);
  const totalCount = totalCountResult[0].rows.item(0).total;

  const results = { records: records, totalPages: Math.ceil(totalCount / pageSize) };

  return results;
};

export const updateTester = async (tester) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Testers SET
      tester_name = ?, phone_number = ?, isSynced = ?, lastUpdatedAt = ?
      WHERE tester_code = ?`,
    [
      tester.name,
      tester.phone,
      0,
      new Date().toISOString(),
      tester.code
    ]
  );
};

export const softDeleteTester = async (code) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE Testers SET
      isSynced = ?, lastUpdatedAt = ?, isDeleted = ?
      WHERE tester_code = ?`,
    [0, new Date().toISOString(), 1, code]
  );
  return result[0].rowsAffected > 0;
};

export const deleteTester = async (code) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM Testers WHERE tester_code = ?`, [code]);
};
