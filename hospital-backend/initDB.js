const pool = require('./config/db');

async function initDB() {
  try {
    await pool.query(`DROP TABLE IF EXISTS patient_treatment, appointment, treatment, staff, patient, role, department CASCADE;`);

    await pool.query(`
      CREATE TABLE department (
        department_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE role (
        role_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department_id INTEGER REFERENCES department(department_id)
      );
    `);

    await pool.query(`
      CREATE TABLE staff (
        staff_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(15),
        email VARCHAR(100),
        role_id INTEGER REFERENCES role(role_id),
        shift VARCHAR(20)
      );
    `);

    await pool.query(`
  CREATE TABLE patient (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    dob DATE,
    contact VARCHAR(15),
    blood_type VARCHAR(5),
    address TEXT,
    medical_history TEXT
  );
`);

    await pool.query(`
      CREATE TABLE appointment (
        appointment_id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patient(patient_id) ON DELETE CASCADE,
        staff_id INTEGER REFERENCES staff(staff_id) ON DELETE CASCADE,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status VARCHAR(20) NOT NULL,
        remarks TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE treatment (
        treatment_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        cost DECIMAL(10, 2) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE patient_treatment (
        id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patient(patient_id),
        treatment_id INTEGER REFERENCES treatment(treatment_id),
        date_given DATE NOT NULL
      );
    `);

    // Departments
    await pool.query(`
      INSERT INTO department (name) VALUES
      ('Core Medical'),
      ('Administrative & Support'),
      ('Paramedical');
    `);

    // Roles
    await pool.query(`
      INSERT INTO role (name, department_id) VALUES
      ('Doctor', 1),
      ('Nurse', 1),
      ('Pharmacist', 1),
      ('Admin', 2),
      ('Receptionist', 2),
      ('Lab Technician', 3),
      ('Physiotherapist', 3);
    `);

    // Staff (without department column)
    await pool.query(`
      INSERT INTO staff (name, phone, email, role_id, shift) VALUES
      ('Dr. Lim Zhi Wei', '90012345', 'limzhiwei@hospital.com', 1, 'Day'),
      ('Dr. Wong Kai Jun', '90012346', 'wongkaijun@hospital.com', 1, 'Night'),
      ('Dr. Amanda Tan', '90012347', 'amandatan@hospital.com', 1, 'Day'),
      ('Dr. Alvin Goh', '90012348', 'alvingoh@hospital.com', 1, 'Day'),
      ('Dr. Nora Leong', '90012349', 'nora@hospital.com', 1, 'Night'),
      ('Dr. Eugene Toh', '90012350', 'eugene@hospital.com', 1, 'Day'),
      ('Dr. Felicia Yeo', '90012351', 'felicia@hospital.com', 1, 'Day'),
      ('Dr. Marcus Sim', '90012352', 'marcus@hospital.com', 1, 'Night'),
      ('Dr. Rachel Chong', '90012353', 'rachel@hospital.com', 1, 'Day'),

      ('Nurse May Lee', '90012354', 'maylee@hospital.com', 2, 'Day'),
      ('Nurse Alan Tan', '90012355', 'alantan@hospital.com', 2, 'Night'),
      ('Mr. Samuel Goh', '90012356', 'samuelgoh@hospital.com', 3, 'Day'),
      ('Ms. Jane Foo', '90012357', 'janefoo@hospital.com', 4, 'Day'),
      ('Mr. Alex Ho', '90012358', 'alexho@hospital.com', 5, 'Day'),
      ('Lab Tech Kim Lee', '90012359', 'kimlee@hospital.com', 6, 'Day'),
      ('Physio Grace Chan', '90012360', 'gracechan@hospital.com', 7, 'Day'),
      ('Physio John Lim', '90012361', 'johnlim@hospital.com', 7, 'Night'),
      ('Receptionist Anna Lee', '90012362', 'annalee@hospital.com', 5, 'Day'),
      ('Admin Peter Teo', '90012363', 'peterteo@hospital.com', 4, 'Day'),
      ('Pharmacist Lily Goh', '90012364', 'lilygoh@hospital.com', 3, 'Night');
    `);

    // Patients
    await pool.query(`
  INSERT INTO patient (name, gender, dob, contact, blood_type, address, medical_history) VALUES
  ('Alice Tan', 'Female', '1991-02-10', '91000001', 'A+', '123 Orchard Rd', 'Asthma'),
  ('Benjamin Ng', 'Male', '1986-08-05', '91000002', 'B+', '456 Bukit Timah', 'High cholesterol'),
  ('Clara Chua', 'Female', '1993-11-30', '91000003', 'O-', '789 Clementi Ave', 'None'),
  ('Daniel Lim', 'Male', '1990-07-22', '91000004', 'AB+', '101 Tampines St', 'Hypertension'),
  ('Eva Wong', 'Female', '1997-04-12', '91000005', 'A-', '12 Yishun Ring Rd', 'Peanut allergy'),
  ('Felix Ong', 'Male', '1985-09-18', '91000006', 'O+', '88 Bedok North Rd', 'Diabetes'),
  ('Grace Teo', 'Female', '1989-06-01', '91000007', 'B-', '33 Hougang Ave', 'Eczema'),
  ('Herman Goh', 'Male', '1994-10-25', '91000008', 'AB-', '66 Serangoon Rd', 'Migraine'),
  ('Irene Yeo', 'Female', '1992-03-14', '91000009', 'A+', '99 Jurong East', 'Gastritis'),
  ('Jason Lee', 'Male', '1987-12-07', '91000010', 'B+', '77 Bukit Batok', 'None');
`);


    // Appointments
    await pool.query(`
      INSERT INTO appointment (patient_id, staff_id, appointment_date, appointment_time, status, remarks) VALUES
      (1, 1, '2025-06-10', '08:30', 'Scheduled', 'Initial consultation.'),
      (2, 3, '2025-06-11', '09:00', 'Scheduled', 'Follow-up check.'),
      (3, 2, '2025-06-12', '10:00', 'Scheduled', 'Routine exam.'),
      (4, 5, '2025-06-13', '11:30', 'Scheduled', 'X-ray review.'),
      (5, 6, '2025-06-14', '14:00', 'Scheduled', 'Blood test results.'),
      (6, 4, '2025-06-15', '15:30', 'Scheduled', 'Medication update.'),
      (7, 7, '2025-06-16', '08:00', 'Scheduled', 'Post-surgery follow-up.'),
      (8, 8, '2025-06-17', '13:00', 'Scheduled', 'Vaccination.'),
      (9, 9, '2025-06-18', '16:00', 'Scheduled', 'Diet plan discussion.'),
      (10, 1, '2025-06-19', '10:30', 'Scheduled', 'General health check.');
    `);

    console.log('✅ Database initialized successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  }
}

initDB();
