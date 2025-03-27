const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./database.db');

// Middleware to parse JSON
app.use(express.json());

// Create tables (run this once)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Testers (
        tester_code TEXT PRIMARY KEY,
        tester_name TEXT NOT NULL,
        phone_number TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Consultants (
        consultant_code TEXT PRIMARY KEY,
        consultant_name TEXT NOT NULL,
        phone_number TEXT,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Process_TPA (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_party TEXT,
        name_of_corporation TEXT,
        details_of_work TEXT,
        amount REAL,
        total_incl_gst REAL,
        cumulative_amount REAL,
        cumulative_amount_incl_gst REAL,
        visit_status INTEGER,
        document_receipt TEXT,
        report_status INTEGER,
        payment_status INTEGER,
        payment_date TEXT,
        jv_no TEXT,
        receipt_no TEXT,
        consultant_code TEXT,
        date TEXT,
        remarks TEXT,
        entered_by TEXT,
        FOREIGN KEY (consultant_code) REFERENCES Consultants (consultant_code),
        FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Process_Testing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_party TEXT,
        details_of_work TEXT,
        amount REAL,
        total_incl_gst REAL,
        cumulative_amount REAL,
        cumulative_amount_incl_gst REAL,
        material_receipt TEXT,
        testing_status INTEGER,
        report_status INTEGER,
        payment_status INTEGER,
        payment_date TEXT,
        jv_no TEXT,
        receipt_no TEXT,
        date TEXT,
        testers TEXT,
        remarks TEXT,
        entered_by TEXT,
        FOREIGN KEY (testers) REFERENCES Testers (tester_code),
        FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Process_Consultancy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_party TEXT,
        details_of_work TEXT,
        amount REAL,
        total_incl_gst REAL,
        cumulative_amount REAL,
        cumulative_amount_incl_gst REAL,
        material_receipt TEXT,
        testing_status INTEGER,
        report_status INTEGER,
        payment_date TEXT,
        jv_no TEXT,
        receipt_no TEXT,
        date TEXT,
        material_properties TEXT,
        cube_preparation TEXT,
        casting TEXT,
        demoulding TEXT,
        testing TEXT,
        remarks TEXT,
        entered_by TEXT,
        FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code),
        FOREIGN KEY (material_properties) REFERENCES Testers (tester_code),
        FOREIGN KEY (cube_preparation) REFERENCES Testers (tester_code),
        FOREIGN KEY (casting) REFERENCES Testers (tester_code),
        FOREIGN KEY (demoulding) REFERENCES Testers (tester_code),
        FOREIGN KEY (testing) REFERENCES Testers (tester_code)
    )`);
});

// CRUD for Testers
app.post('/testers', (req, res) => {
    const { tester_code, tester_name, phone_number } = req.body;
    db.run(
        'INSERT INTO Testers (tester_code, tester_name, phone_number) VALUES (?, ?, ?)',
        [tester_code, tester_name, phone_number],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ id: this.lastID });
        }
    );
});

app.get('/testers', (req, res) => {
    db.all('SELECT * FROM Testers', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/testers/:tester_code', (req, res) => {
    const { tester_name, phone_number } = req.body;
    const { tester_code } = req.params;
    db.run(
        'UPDATE Testers SET tester_name = ?, phone_number = ? WHERE tester_code = ?',
        [tester_name, phone_number, tester_code],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ changes: this.changes });
        }
    );
});

app.delete('/testers/:tester_code', (req, res) => {
    const { tester_code } = req.params;
    db.run('DELETE FROM Testers WHERE tester_code = ?', [tester_code], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ changes: this.changes });
    });
});

// CRUD for Consultants
app.post('/consultants', (req, res) => {
    const { consultant_code, consultant_name, phone_number, password } = req.body;
    db.run(
        'INSERT INTO Consultants (consultant_code, consultant_name, phone_number, password) VALUES (?, ?, ?, ?)',
        [consultant_code, consultant_name, phone_number, password],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ id: this.lastID });
        }
    );
});

app.get('/consultants', (req, res) => {
    db.all('SELECT * FROM Consultants', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/consultants/:consultant_code', (req, res) => {
    const { consultant_name, phone_number, password } = req.body;
    const { consultant_code } = req.params;
    db.run(
        'UPDATE Consultants SET consultant_name = ?, phone_number = ?, password = ? WHERE consultant_code = ?',
        [consultant_name, phone_number, password, consultant_code],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ changes: this.changes });
        }
    );
});

app.delete('/consultants/:consultant_code', (req, res) => {
    const { consultant_code } = req.params;
    db.run('DELETE FROM Consultants WHERE consultant_code = ?', [consultant_code], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ changes: this.changes });
    });
});

// CRUD for Process_TPA
app.post('/process_tpa', (req, res) => {
    const {
        name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst,
        cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt,
        report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code,
        date, remarks, entered_by
    } = req.body;
    db.run(
        `INSERT INTO Process_TPA (
            name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst,
            cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt,
            report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code,
            date, remarks, entered_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst,
            cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt,
            report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code,
            date, remarks, entered_by
        ],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ id: this.lastID });
        }
    );
});

app.get('/process_tpa', (req, res) => {
    db.all('SELECT * FROM Process_TPA', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/process_tpa/:id', (req, res) => {
    const { id } = req.params;
    const {
        name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst,
        cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt,
        report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code,
        date, remarks, entered_by
    } = req.body;
    db.run(
        `UPDATE Process_TPA SET
            name_of_party = ?, name_of_corporation = ?, details_of_work = ?, amount = ?,
            total_incl_gst = ?, cumulative_amount = ?, cumulative_amount_incl_gst = ?,
            visit_status = ?, document_receipt = ?, report_status = ?, payment_status = ?,
            payment_date = ?, jv_no = ?, receipt_no = ?, consultant_code = ?, date = ?,
            remarks = ?, entered_by = ?
        WHERE id = ?`,
        [
            name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst,
            cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt,
            report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code,
            date, remarks, entered_by, id
        ],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.send({ changes: this.changes });
        }
    );
});

app.delete('/process_tpa/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Process_TPA WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ changes: this.changes });
    });
});

// CRUD for Process_Testing and Process_Consultancy can be implemented similarly...

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});






// //old using mysql
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');

// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// })

// // app.post('/login', async (req, res) => {
// //   const { consultant_id, password } = req.body;

// //   function parseCredentials(credentialsStr) {
// //     return Object.fromEntries(credentialsStr.split(',').map(item => item.split(':')));
// //   }

// //   const userCredentials = parseCredentials(process.env.USER_CREDENTIALS);

// //   if (userCredentials[consultant_id] && userCredentials[consultant_id] === password) {
// //     res.status(200).json({ message: 'Login successful' });
// //   } else {
// //     res.status(401).json({ message: 'Invalid credentials' });
// //   }
// // })

// // app.post('updatePassword', async (req, res) => {
// //   const { consultant_id, password } = req.body;

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   db.query('UPDATE consultants SET password = ? WHERE consultant_id = ?', [hashedPassword, consultant_id], (err, result) => {
// //     if (err) {
// //       res.status(500).json({ message: 'An error occurred' });
// //     } else {
// //       res.status(200).json({ message: 'Password updated' });
// //     }
// //   });
// // })


// // Create (Insert)
// app.post('/process_tpa', (req, res) => {
//   const data = req.body;
//   const sql = `INSERT INTO Process_TPA 
//         (name_of_party, name_of_corporation, details_of_work, amount, total_incl_gst, 
//         cumulative_amount, cumulative_amount_incl_gst, visit_status, document_receipt, 
//         report_status, payment_status, payment_date, jv_no, receipt_no, consultant_code, date, 
//         remarks, entered_by) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     data.name_of_party, data.name_of_corporation, data.details_of_work, data.amount,
//     data.total_incl_gst, data.cumulative_amount, data.cumulative_amount_incl_gst,
//     data.visit_status, data.document_receipt, data.report_status, data.payment_status,
//     data.payment_date, data.jv_no, data.receipt_no, data.consultant_code, data.date,
//     data.remarks, data.entered_by
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting record:', err);
//       res.status(500).send(err);
//     } else {
//       res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
//     }
//   });
// });

// // Read (Get All)
// app.get('/process_tpa', (req, res) => {
//   const sql = 'SELECT * FROM Process_TPA';
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching records:', err);
//       res.status(500).send(err);
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Read (Get One by ID)
// app.get('/process_tpa/:id', (req, res) => {
//   const sql = 'SELECT * FROM Process_TPA WHERE id = ?';
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       console.error('Error fetching record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json(result[0]);
//     }
//   });
// });

// // Update
// app.put('/process_tpa/:id', (req, res) => {
//   const data = req.body;
//   const sql = `UPDATE Process_TPA SET 
//         name_of_party = ?, name_of_corporation = ?, details_of_work = ?, amount = ?, total_incl_gst = ?, 
//         cumulative_amount = ?, cumulative_amount_incl_gst = ?, visit_status = ?, document_receipt = ?, 
//         report_status = ?, payment_status = ?, payment_date = ?, jv_no = ?, receipt_no = ?, consultant_code = ?, 
//         date = ?, remarks = ?, entered_by = ? 
//         WHERE id = ?`;

//   const values = [
//     data.name_of_party, data.name_of_corporation, data.details_of_work, data.amount,
//     data.total_incl_gst, data.cumulative_amount, data.cumulative_amount_incl_gst,
//     data.visit_status, data.document_receipt, data.report_status, data.payment_status,
//     data.payment_date, data.jv_no, data.receipt_no, data.consultant_code, data.date,
//     data.remarks, data.entered_by, req.params.id
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error updating record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json({ message: 'Record updated successfully' });
//     }
//   });
// });

// // Delete
// app.delete('/process_tpa/:id', (req, res) => {
//   const sql = 'DELETE FROM Process_TPA WHERE id = ?';
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       console.error('Error deleting record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json({ message: 'Record deleted successfully' });
//     }
//   });
// });


// app.post('/process_testing', (req, res) => {
//   const data = req.body;
//   const sql = `INSERT INTO Process_Testing 
//         (name_of_party, details_of_work, amount, total_incl_gst, 
//         cumulative_amount, cumulative_amount_incl_gst, material_receipt, 
//         testing_status, report_status, payment_status, payment_date, jv_no, 
//         receipt_no, date, testers, remarks, entered_by) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     data.name_of_party, data.details_of_work, data.amount, data.total_incl_gst,
//     data.cumulative_amount, data.cumulative_amount_incl_gst, data.material_receipt,
//     data.testing_status, data.report_status, data.payment_status, data.payment_date,
//     data.jv_no, data.receipt_no, data.date, data.testers, data.remarks, data.entered_by
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting record:', err);
//       res.status(500).send(err);
//     } else {
//       res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
//     }
//   });
// });

// // Read (Get All)
// app.get('/process_testing', (req, res) => {
//   const sql = `SELECT * FROM Process_Testing`;
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching records:', err);
//       res.status(500).send(err);
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Read (Get One by ID)
// app.get('/process_testing/:id', (req, res) => {
//   const sql = `SELECT * FROM Process_Testing WHERE id = ?`;
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       console.error('Error fetching record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json(result[0]);
//     }
//   });
// });

// // Update
// app.put('/process_testing/:id', (req, res) => {
//   const data = req.body;
//   const sql = `UPDATE Process_Testing SET 
//         name_of_party = ?, details_of_work = ?, amount = ?, total_incl_gst = ?, 
//         cumulative_amount = ?, cumulative_amount_incl_gst = ?, material_receipt = ?, 
//         testing_status = ?, report_status = ?, payment_status = ?, payment_date = ?, 
//         jv_no = ?, receipt_no = ?, date = ?, testers = ?, remarks = ?, entered_by = ? 
//         WHERE id = ?`;

//   const values = [
//     data.name_of_party, data.details_of_work, data.amount, data.total_incl_gst,
//     data.cumulative_amount, data.cumulative_amount_incl_gst, data.material_receipt,
//     data.testing_status, data.report_status, data.payment_status, data.payment_date,
//     data.jv_no, data.receipt_no, data.date, data.testers, data.remarks, data.entered_by,
//     req.params.id
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error updating record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json({ message: 'Record updated successfully' });
//     }
//   });
// });

// // Delete
// app.delete('/process_testing/:id', (req, res) => {
//   const sql = `DELETE FROM Process_Testing WHERE id = ?`;
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       console.error('Error deleting record:', err);
//       res.status(500).send(err);
//     } else {
//       res.json({ message: 'Record deleted successfully' });
//     }
//   });
// });

//   app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });