import { getDBConnection } from '../db';

export const addTPARecord = async (record) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO Process_TPA (
      name_of_party, name_of_corporation, details_of_work, amount,
      total_incl_gst, cumulative_amount, cumulative_amount_incl_gst,
      visit_status, document_receipt, report_status, payment_status,
      payment_date, jv_no, receipt_no, consultant_code, date, 
      remarks, entered_by, isSynced, lastUpdatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      record.name_of_party,
      record.name_of_corporation,
      record.details_of_work,
      record.amount,
      record.total_incl_gst,
      record.cumulative_amount,
      record.cumulative_amount_incl_gst,
      record.visit_status,
      record.document_receipt,
      record.report_status,
      record.payment_status,
      record.payment_date,
      record.jv_no,
      record.receipt_no,
      record.consultant_code,
      record.date,
      record.remarks,
      record.entered_by,
      0,
      new Date().toISOString()
    ]
  );
};

export const getAllTPARecords = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Process_TPA WHERE isDeleted = 0`);
  return results[0].rows.raw();
};

export const getAllTPARecordsbyDate = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM Process_TPA WHERE isDeleted = 0 ORDER BY lastUpdatedAt DESC`);
  return results[0].rows.raw();
};

export const getTPARecordByID = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(`SELECT * FROM Process_TPA where id= ? AND isDeleted = 0`, [id]);
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const getPaginatedTPARecords = async (page = 1, pageSize = 15) => {
  const db = await getDBConnection();
  const offset = (page - 1) * pageSize;

  const recordsResult = await db.executeSql(
    `SELECT * FROM Process_TPA
     WHERE isDeleted = 0
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const records = recordsResult[0].rows.raw();

  const totalCountResult = await db.executeSql(`SELECT COUNT(*) as total FROM Process_TPA WHERE isDeleted = 0`);
  const totalCount = totalCountResult[0].rows.item(0).total;

  const results = { records: records, totalPages: Math.ceil(totalCount / pageSize) };

  return results;
};


export const updateTPARecord = async (record) => {
  const db = await getDBConnection();
  await db.executeSql(
    `UPDATE Process_TPA SET
      name_of_party = ?,
      name_of_corporation = ?,
      details_of_work = ?,
      amount = ?,
      total_incl_gst = ?,
      cumulative_amount = ?,
      cumulative_amount_incl_gst = ?,
      visit_status = ?,
      document_receipt = ?,
      report_status = ?,
      payment_status = ?,
      payment_date = ?,
      jv_no = ?,
      receipt_no = ?,
      consultant_code = ?,
      date = ?,
      remarks = ?,
      entered_by = ?, isSynced = ?, lastUpdatedAt = ?
    WHERE id = ?`,
    [
      record.name_of_party,
      record.name_of_corporation,
      record.details_of_work,
      record.amount,
      record.total_incl_gst,
      record.cumulative_amount,
      record.cumulative_amount_incl_gst,
      record.visit_status,
      record.document_receipt,
      record.report_status,
      record.payment_status,
      record.payment_date,
      record.jv_no,
      record.receipt_no,
      record.consultant_code,
      record.date,
      record.remarks,
      record.entered_by,
      0,
      new Date().toISOString(),
      record.id
    ]
  );
};

export const softDeleteTPARecord = async (id) => {
  const db = await getDBConnection();
  const result = await db.executeSql(
    `UPDATE Process_TPA SET
      isSynced = ?, lastUpdatedAt = ?, isDeleted = ?
      WHERE id = ?
    `, [0, new Date().toISOString(), 1, id]);
  return result[0].rowsAffected > 0;
}

export const deleteTPARecord = async (id) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM Process_TPA WHERE id = ?`, [id]);
};