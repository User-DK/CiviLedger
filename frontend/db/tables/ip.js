import { getDBConnection } from '../db';

export const addip = async (ip) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO ip (ip) VALUES (?)`,
    [ip.ip]
  );
};

export const updateip = async (ip) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE ip SET ip = ? WHERE id = 1`,
    [ip.ip]
  );
};


export const getip = async () => {
  const db = await getDBConnection();
  const result = await db.executeSql(`SELECT * FROM ip WHERE id = 1`);
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
}