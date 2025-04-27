
//asli estimation by yash
import { getDBConnection } from '../db';
import { getAllConsultancyRecordsbyDate } from './ProcessConsultancy';

export const addProcessEstimation = async (estimation) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `INSERT INTO Process_Estimation (name_of_party, service_type, igst, cgst, sgst, total_amount, isSynced, lastUpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      estimation.name_of_party,
      estimation.service_type,
      estimation.igst,
      estimation.cgst,
      estimation.sgst,
      estimation.total_amount,
      estimation.total_amount_inc_gst,
      0,
      new Date().toISOString(),
    ]
  );

  const insertId = result[0].insertId;
  return insertId;
};




export const getAllProcessEstimations = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Process_Estimation WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getProcessEstimationByID = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(`SELECT * FROM Process_Estimation WHERE id = ? AND isDeleted = 0`, [id]);
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const getPaginatedProcessEstimations = async (page = 1, pageSize = 15) => {
  const db = await getDBConnection();
  const offset = (page - 1) * pageSize;

  const recordsResult = await db.executeSql(
    `SELECT * FROM Process_Estimation
     WHERE isDeleted = 0
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const records = recordsResult[0].rows.raw();

  const totalCountResult = await db.executeSql(`SELECT COUNT(*) as total FROM Process_Estimation WHERE isDeleted = 0`);
  const totalCount = totalCountResult[0].rows.item(0).total;

  const results = { records: records, totalPages: Math.ceil(totalCount / pageSize) };

  return results;
};

export const updateProcessEstimation = async (estimation) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Process_Estimation SET name_of_party = ?, service_type = ?, igst = ?, cgst = ?, sgst = ?, total_amount = ?, total_amount_inc_gst = ?, isSynced = ?, lastUpdatedAt = ? WHERE id = ?`,
    [
      estimation.name_of_party,
      estimation.service_type,
      estimation.igst,
      estimation.cgst,
      estimation.sgst,
      estimation.total_amount,
      estimation.total_amount_inc_gst,
      0,
      new Date().toISOString(),
      estimation.id,
    ]
  );
};

export const softDeleteProcessEstimation = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE Process_Estimation SET isSynced = ?, lastUpdatedAt = ?, isDeleted = ? WHERE id = ?`,
    [0, new Date().toISOString(), 1, id]
  );
  return result[0].rowsAffected > 0;
};

export const deleteProcessEstimation = async (id) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM Process_Estimation WHERE id = ?`, [id]);
};


export const updateTotalandGST = async (id, total_amount, total_amount_inc_gst) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Process_Estimation SET total_amount = ?, total_amount_inc_gst = ? WHERE id = ?`,
    [total_amount, total_amount_inc_gst, id]
  );
}