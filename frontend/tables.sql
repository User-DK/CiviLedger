CREATE DATABASE ProcessDB;

USE ProcessDB;

CREATE TABLE
  Testers (
    tester_code VARCHAR(10) PRIMARY KEY,
    tester_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10),
  );

CREATE TABLE
  Consultants (
    consultant_code VARCHAR(10) PRIMARY KEY,
    consultant_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10),
    password VARCHAR(255) NOT NULL
  );

-- Table for Process TPA
CREATE TABLE
  Process_TPA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_of_party VARCHAR(255),
    name_of_corporation VARCHAR(255),
    details_of_work TEXT,
    amount DECIMAL(15, 2),
    total_incl_gst DECIMAL(15, 2),
    cumulative_amount DECIMAL(15, 2),
    cumulative_amount_incl_gst DECIMAL(15, 2),
    visit_status BOOLEAN,
    document_receipt VARCHAR(255),
    report_status BOOLEAN,
    payment_status BOOLEAN,
    payment_date DATE,
    jv_no VARCHAR(50),
    receipt_no VARCHAR(50),
    consultant_code VARCHAR(25),
    date DATE,
    remarks TEXT,
    entered_by VARCHAR(25),
    FOREIGN KEY (consultant_code) REFERENCES Consultants (consultant_code),
    FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
  );

-- Table for Process Testing
CREATE TABLE
  Process_Testing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_of_party VARCHAR(255),
    details_of_work TEXT,
    amount DECIMAL(15, 2),
    total_incl_gst DECIMAL(15, 2),
    cumulative_amount DECIMAL(15, 2),
    cumulative_amount_incl_gst DECIMAL(15, 2),
    material_receipt VARCHAR(255),
    testing_status BOOLEAN,
    report_status BOOLEAN,
    payment_status BOOLEAN,
    payment_date DATE,
    jv_no VARCHAR(50),
    receipt_no VARCHAR(50),
    date DATE,
    testers VARCHAR(25),
    remarks TEXT,
    entered_by VARCHAR(25),
    FOREIGN KEY (testers) REFERENCES Testers (tester_code),
    FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code)
  );

-- Table for Process Consultancy
CREATE TABLE
  Process_Consultancy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_of_party VARCHAR(255),
    details_of_work TEXT,
    amount DECIMAL(15, 2),
    total_incl_gst DECIMAL(15, 2),
    cumulative_amount DECIMAL(15, 2),
    cumulative_amount_incl_gst DECIMAL(15, 2),
    material_receipt VARCHAR(255),
    testing_status BOOLEAN,
    report_status BOOLEAN,
    payment_date DATE,
    jv_no VARCHAR(50),
    receipt_no VARCHAR(50),
    date DATE,
    material_properties VARCHAR(25),
    cube_preparation VARCHAR(25),
    casting VARCHAR(25),
    demoulding VARCHAR(25),
    testing VARCHAR(25),
    remarks TEXT,
    entered_by VARCHAR(25),
    FOREIGN KEY (entered_by) REFERENCES Consultants (consultant_code),
    FOREIGN KEY (material_properties) REFERENCES Testers (tester_code),
    FOREIGN KEY (cube_preparation) REFERENCES Testers (tester_code),
    FOREIGN KEY (casting) REFERENCES Testers (tester_code),
    FOREIGN KEY (demoulding) REFERENCES Testers (tester_code),
    FOREIGN KEY (testing) REFERENCES Testers (tester_code)
  );