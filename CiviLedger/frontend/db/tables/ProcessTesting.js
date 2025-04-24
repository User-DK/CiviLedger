import { getDBConnection } from '../db';

export const addTestingRecord = async (record) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO Process_Testing (
      name_of_party, details_of_work, amount, total_incl_gst, cumulative_amount,
      cumulative_amount_incl_gst, material_receipt, testing_status, report_status,
      payment_status, payment_date, jv_no, receipt_no, date, testers, remarks, entered_by, isSynced, lastUpdatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
    [
      record.name_of_party, record.details_of_work, record.amount, record.total_incl_gst,
      record.cumulative_amount, record.cumulative_amount_incl_gst, record.material_receipt,
      record.testing_status, record.report_status, record.payment_status,
      record.payment_date, record.jv_no, record.receipt_no, record.date,
      record.testers, record.remarks, record.entered_by,0,new Date().toISOString()
    ]
  );
};

export const getAllTestingRecords = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Process_Testing WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getAllTestingRecordsbyDate = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Process_Testing WHERE isDeleted = 0 ORDER BY lastUpdatedAt DESC`);
  return results[0].rows.raw();
};

export const getTestingRecordByID = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(`SELECT * FROM Process_Testing where id= ?`, [id]);
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const getPaginatedTestingRecords = async (page = 1, pageSize = 15) => {
  const db = await getDBConnection();
  const offset = (page - 1) * pageSize;

  const recordsResult = await db.executeSql(
    `SELECT * FROM Process_Testing
     WHERE isDeleted = 0
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const records = recordsResult[0].rows.raw();

  const totalCountResult = await db.executeSql(`SELECT COUNT(*) as total FROM Process_Testing WHERE isDeleted = 0`);
  const totalCount = totalCountResult[0].rows.item(0).total;

  const results = { records: records, totalPages: Math.ceil(totalCount / pageSize) };

  return results;
};


export const updateTestingRecord = async (record, isDelete) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Process_Testing SET
      name_of_party = ?,
      details_of_work = ?,
      amount = ?,
      total_incl_gst = ?,
      cumulative_amount = ?,
      cumulative_amount_incl_gst = ?,
      material_receipt = ?,
      testing_status = ?,
      report_status = ?,
      payment_status = ?,
      payment_date = ?,
      jv_no = ?,
      receipt_no = ?,
      date = ?,
      testers = ?,
      remarks = ?,
      entered_by = ?, 
      isSynced = ?,
      lastUpdatedAt = ?
    WHERE id = ?`,
    [
      record.name_of_party,
      record.details_of_work,
      record.amount,
      record.total_incl_gst,
      record.cumulative_amount,
      record.cumulative_amount_incl_gst,
      record.material_receipt,
      record.testing_status,
      record.report_status,
      record.payment_status,
      record.payment_date,
      record.jv_no,
      record.receipt_no,
      record.date,
      record.testers,
      record.remarks,
      record.entered_by,
      0,
      new Date().toISOString(),
      record.id
    ]
  );
};

export const softDeleteTestingRecord = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE Process_Testing SET
      isSynced = ?, lastUpdatedAt = ?, isDeleted = ?
      WHERE id = ?`,
    [0, new Date().toISOString(), 1, id]
  );
  return result[0].rowsAffected > 0;
};


export const deleteTestingRecord = async (id) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM Process_Testing WHERE id = ?`, [id]);
};