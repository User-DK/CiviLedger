import { getDBConnection } from '../db';

export const addTestRate = async (testRate) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO test_rates (test_name, rate, isSynced, lastUpdatedAt,) VALUES (?, ?, ?,?)`,
    [testRate.test_name, testRate.rate, 0,
    new Date().toISOString(),]
  );
};

export const getAllTestRates = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM test_rates`);
  return results[0].rows.raw();
};

export const getTestRateByName = async (testName) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `SELECT * FROM test_rates WHERE test_name = ?`,
    [testName]
  );
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const updateTestRate = async (testRate) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE test_rates SET rate = ? WHERE test_name = ?  WHERE isDeleted = 0`,
    [testRate.rate, testRate.test_name]
  );
};

export const deleteTestRate = async (testName) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM test_rates WHERE test_name = ?`, [testName]);
};

export const insertInitialTestRates = async (testRates) => {
  const db = await getDBConnection();
  await db.transaction(async (tx) => {
    for (const [test_name, rate] of testRates) {
      await tx.executeSql(
        `INSERT OR REPLACE INTO test_rates (test_name, rate) VALUES (?, ?)`,
        [test_name, rate]
      );
    }
  });
};
