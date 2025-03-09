const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
})

// app.post('/login', async (req, res) => {
//   const { consultant_id, password } = req.body;

//   function parseCredentials(credentialsStr) {
//     return Object.fromEntries(credentialsStr.split(',').map(item => item.split(':')));
//   }

//   const userCredentials = parseCredentials(process.env.USER_CREDENTIALS);

//   if (userCredentials[consultant_id] && userCredentials[consultant_id] === password) {
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// })

// app.post('updatePassword', async (req, res) => {
//   const { consultant_id, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.query('UPDATE consultants SET password = ? WHERE consultant_id = ?', [hashedPassword, consultant_id], (err, result) => {
//     if (err) {
//       res.status(500).json({ message: 'An error occurred' });
//     } else {
//       res.status(200).json({ message: 'Password updated' });
//     }
//   });
// })


// Create (Insert)
app.post('/process_tpa', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Process_TPA 
        (name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst, 
        cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt, 
        report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code, date, 
        remarks, entered_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.name_of_party, data.name_of_corporation, data.details_of_work, data.amount,
    data.total_incl_gst, data.cumulative_amount, data.cumulative_amount_incl_gst,
    data.visit_status, data.document_receipt, data.report_status, data.payment_status,
    data.payment_date, data.jv_no, data.receipt_no, data.consultant_code, data.date,
    data.remarks, data.entered_by
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
    }
  });
});

// Read (Get All)
app.get('/process_tpa', (req, res) => {
  const sql = 'SELECT * FROM Process_TPA';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Read (Get One by ID)
app.get('/process_tpa/:id', (req, res) => {
  const sql = 'SELECT * FROM Process_TPA WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error fetching record:', err);
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });
});

// Update
app.put('/process_tpa/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE Process_TPA SET 
        name_of_party = ?, name_of_corporation = ?, details_of_work = ?, amount = ?, total_incl_gst = ?, 
        cumulative_amount = ?, cumulative_amount_incl_gst = ?, visit_status = ?, document_receipt = ?, 
        report_status = ?, payment_status = ?, payment_date = ?, jv_no = ?, receipt_no = ?, consultant_code = ?, 
        date = ?, remarks = ?, entered_by = ? 
        WHERE id = ?`;

  const values = [
    data.name_of_party, data.name_of_corporation, data.details_of_work, data.amount,
    data.total_incl_gst, data.cumulative_amount, data.cumulative_amount_incl_gst,
    data.visit_status, data.document_receipt, data.report_status, data.payment_status,
    data.payment_date, data.jv_no, data.receipt_no, data.consultant_code, data.date,
    data.remarks, data.entered_by, req.params.id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

// Delete
app.delete('/process_tpa/:id', (req, res) => {
  const sql = 'DELETE FROM Process_TPA WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});


app.post('/process_testing', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Process_Testing 
        (name_of_party, details_of_work, amount, total_incl_gst, 
        cumulative_amount, cumulative_amount_incl_gst, material_receipt, 
        testing_status, report_status, payment_status, payment_date, jv_no, 
        receipt_no, date, testers, remarks, entered_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.name_of_party, data.details_of_work, data.amount, data.total_incl_gst,
    data.cumulative_amount, data.cumulative_amount_incl_gst, data.material_receipt,
    data.testing_status, data.report_status, data.payment_status, data.payment_date,
    data.jv_no, data.receipt_no, data.date, data.testers, data.remarks, data.entered_by
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
    }
  });
});

// Read (Get All)
app.get('/process_testing', (req, res) => {
  const sql = `SELECT * FROM Process_Testing`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Read (Get One by ID)
app.get('/process_testing/:id', (req, res) => {
  const sql = `SELECT * FROM Process_Testing WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error fetching record:', err);
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });
});

// Update
app.put('/process_testing/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE Process_Testing SET 
        name_of_party = ?, details_of_work = ?, amount = ?, total_incl_gst = ?, 
        cumulative_amount = ?, cumulative_amount_incl_gst = ?, material_receipt = ?, 
        testing_status = ?, report_status = ?, payment_status = ?, payment_date = ?, 
        jv_no = ?, receipt_no = ?, date = ?, testers = ?, remarks = ?, entered_by = ? 
        WHERE id = ?`;

  const values = [
    data.name_of_party, data.details_of_work, data.amount, data.total_incl_gst,
    data.cumulative_amount, data.cumulative_amount_incl_gst, data.material_receipt,
    data.testing_status, data.report_status, data.payment_status, data.payment_date,
    data.jv_no, data.receipt_no, data.date, data.testers, data.remarks, data.entered_by,
    req.params.id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

// Delete
app.delete('/process_testing/:id', (req, res) => {
  const sql = `DELETE FROM Process_Testing WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });