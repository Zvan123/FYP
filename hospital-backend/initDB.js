const pool = require('./config/db');

function generateStaffId(prefix) {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomSixDigits}`;
}

async function initDB() {
  try {
    await pool.query('DROP TABLE IF EXISTS patient_treatment, treatment, appointment, staff, role, department, staff_schedule, patient CASCADE');

    await pool.query(`
      CREATE TABLE department (
        department_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE role (
        role_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        department_id INTEGER REFERENCES department(department_id)
      );
    `);

    await pool.query(`
      CREATE TABLE staff (
        staff_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        gender VARCHAR(10),
        email VARCHAR(100),
        phone VARCHAR(15),
        role_id INTEGER REFERENCES role(role_id),
        shift VARCHAR(20),
        join_date DATE DEFAULT CURRENT_DATE
      );
    `);

    await pool.query(`
  CREATE TABLE patient (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    date_of_birth DATE,
    phone VARCHAR(15),
    blood_type VARCHAR(5),
    address TEXT,
    medical_history TEXT);
`);

    await pool.query(`
      CREATE TABLE appointment (
        appointment_id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patient(patient_id),
        staff_id VARCHAR(10) REFERENCES staff(staff_id),
        appointment_date DATE,
        appointment_time TIME,
        status VARCHAR(20),
        notes TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE staff_schedule (
        schedule_id SERIAL PRIMARY KEY,
        staff_id VARCHAR(10) REFERENCES staff(staff_id),
        day VARCHAR(10),
        time_slot VARCHAR(20)
      );
    `);

    await pool.query(`
      CREATE TABLE treatment (
        treatment_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        cost NUMERIC(10, 2)
      );
    `);

    await pool.query(`
      CREATE TABLE patient_treatment (
        id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patient(patient_id),
        treatment_id INTEGER REFERENCES treatment(treatment_id),
        treatment_date DATE
      );
    `);

    await pool.query(`
      INSERT INTO department (name) VALUES
      ('Core Medical'),
      ('Administrative & Support'),
      ('Paramedical');
    `);

    await pool.query(`
      INSERT INTO role (name, department_id) VALUES
      ('Doctor', 1),
      ('Nurse', 1),
      ('Pharmacist', 3),
      ('Admin', 2),
      ('Receptionist', 2),
      ('Lab Technician', 3),
      ('Physiotherapist', 3);
    `);

    await pool.query(`
      INSERT INTO patient (name, gender, date_of_birth, phone, blood_type, address, medical_history) VALUES
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

    const demoStaff = [
      { name: 'Lim Zhi Wei', email: 'limzhiwei@hospital.com', phone: '90012345', role_id: 1, shift: 'Day', gender: 'Male', deptPrefix: 'CM' },
      { name: 'Wong Kai Jun', email: 'wongkaijun@hospital.com', phone: '90012346', role_id: 1, shift: 'Night', gender: 'Male', deptPrefix: 'CM' },
      { name: 'Amanda Tan', email: 'amandatan@hospital.com', phone: '90012347', role_id: 1, shift: 'Day', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Alvin Goh', email: 'alvingoh@hospital.com', phone: '90012348', role_id: 1, shift: 'Day', gender: 'Male', deptPrefix: 'CM' },
      { name: 'Nora Leong', email: 'nora@hospital.com', phone: '90012349', role_id: 1, shift: 'Night', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Eugene Toh', email: 'eugene@hospital.com', phone: '90012350', role_id: 1, shift: 'Day', gender: 'Male', deptPrefix: 'CM' },
      { name: 'May Lee', email: 'maylee@hospital.com', phone: '90012354', role_id: 2, shift: 'Day', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Alan Tan', email: 'alantan@hospital.com', phone: '90012355', role_id: 2, shift: 'Night', gender: 'Male', deptPrefix: 'CM' },
      { name: 'Anne Hom', email: 'annehom@hospital.com', phone: '90212454', role_id: 2, shift: 'Day', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Dennis Chua', email: 'dennischua@hospital.com', phone: '90412315', role_id: 2, shift: 'Day', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Lynn Sim', email: 'lynnsim@hospital.com', phone: '90001315', role_id: 2, shift: 'Night', gender: 'Female', deptPrefix: 'CM' },
      { name: 'Davis Tay', email: 'davistay@hospital.com', phone: '90301155', role_id: 2, shift: 'Day', gender: 'Male', deptPrefix: 'CM' },
      { name: 'Samuel Goh', email: 'samuelgoh@hospital.com', phone: '90012356', role_id: 3, shift: 'Day', gender: 'Male', deptPrefix: 'P' },
      { name: 'Jane Foo', email: 'janefoo@hospital.com', phone: '90012357', role_id: 4, shift: 'Day', gender: 'Female', deptPrefix: 'AS' },
      { name: 'Alex Ho', email: 'alexho@hospital.com', phone: '90012358', role_id: 5, shift: 'Day', gender: 'Male', deptPrefix: 'AS' },
      { name: 'Kim Lee', email: 'kimlee@hospital.com', phone: '90012359', role_id: 6, shift: 'Day', gender: 'Female', deptPrefix: 'P' },
      { name: 'Grace Chan', email: 'gracechan@hospital.com', phone: '90012360', role_id: 7, shift: 'Day', gender: 'Female', deptPrefix: 'P' },
      { name: 'John Lim', email: 'johnlim@hospital.com', phone: '90012361', role_id: 7, shift: 'Night', gender: 'Male', deptPrefix: 'P' },
      { name: 'Anna Lee', email: 'annalee@hospital.com', phone: '90012362', role_id: 5, shift: 'Day', gender: 'Female', deptPrefix: 'AS' },
      { name: 'Peter Teo', email: 'peterteo@hospital.com', phone: '90012363', role_id: 4, shift: 'Day', gender: 'Male', deptPrefix: 'AS' },
      { name: 'Lily Goh', email: 'lilygoh@hospital.com', phone: '90012364', role_id: 3, shift: 'Night', gender: 'Female', deptPrefix: 'P' }
    ];

    for (const staff of demoStaff) {
      const staffId = generateStaffId(staff.deptPrefix);
      await pool.query(
        `INSERT INTO staff (staff_id, name, gender, email, phone, role_id, shift) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [staffId, staff.name, staff.gender, staff.email, staff.phone, staff.role_id, staff.shift]
      );
    }

    const limzhiweiId = await pool.query("SELECT staff_id FROM staff WHERE email = 'limzhiwei@hospital.com'");
    const limzhiweiStaffId = limzhiweiId.rows[0]?.staff_id;
    if (limzhiweiStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Tuesday', '4pm-11pm'),
      ($1, 'Friday', '4pm-11pm'),
      ($1, 'Thursday', '4pm-11pm'),
      ($1, 'Monday', '4pm-11pm'),
      ($1, 'Wednesday', '4pm-11pm'),
      ($1, 'Sunday', '4pm-11pm')
  `, [limzhiweiStaffId]);
    }

    const wongkaijunId = await pool.query("SELECT staff_id FROM staff WHERE email = 'wongkaijun@hospital.com'");
    const wongkaijunStaffId = wongkaijunId.rows[0]?.staff_id;
    if (wongkaijunStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Saturday', '11pm-7am'),
      ($1, 'Friday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Tuesday', '11pm-7am'),
      ($1, 'Monday', '11pm-7am')
  `, [wongkaijunStaffId]);
    }

    const amandatanId = await pool.query("SELECT staff_id FROM staff WHERE email = 'amandatan@hospital.com'");
    const amandatanStaffId = amandatanId.rows[0]?.staff_id;
    if (amandatanStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Saturday', '7am-4pm'),
      ($1, 'Sunday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [amandatanStaffId]);
    }

    const alvingohId = await pool.query("SELECT staff_id FROM staff WHERE email = 'alvingoh@hospital.com'");
    const alvingohStaffId = alvingohId.rows[0]?.staff_id;
    if (alvingohStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [alvingohStaffId]);
    }

    const noraId = await pool.query("SELECT staff_id FROM staff WHERE email = 'nora@hospital.com'");
    const noraStaffId = noraId.rows[0]?.staff_id;
    if (noraStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '11pm-7am'),
      ($1, 'Tuesday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Thursday', '11pm-7am'),
      ($1, 'Friday', '11pm-7am')
  `, [noraStaffId]);
    }

    const eugeneId = await pool.query("SELECT staff_id FROM staff WHERE email = 'eugene@hospital.com'");
    const eugeneStaffId = eugeneId.rows[0]?.staff_id;
    if (eugeneStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [eugeneStaffId]);
    }

    const mayleeId = await pool.query("SELECT staff_id FROM staff WHERE email = 'maylee@hospital.com'");
    const mayleeStaffId = mayleeId.rows[0]?.staff_id;
    if (mayleeStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Saturday', '7am-4pm')
  `, [mayleeStaffId]);
    }

    const alantanId = await pool.query("SELECT staff_id FROM staff WHERE email = 'alantan@hospital.com'");
    const alantanStaffId = alantanId.rows[0]?.staff_id;
    if (alantanStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Sunday', '11pm-7am'),
      ($1, 'Monday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Thursday', '11pm-7am'),
      ($1, 'Friday', '11pm-7am')
  `, [alantanStaffId]);
    }

    const annehomId = await pool.query("SELECT staff_id FROM staff WHERE email = 'annehom@hospital.com'");
    const annehomStaffId = annehomId.rows[0]?.staff_id;
    if (annehomStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [annehomStaffId]);
    }

    const dennischuaId = await pool.query("SELECT staff_id FROM staff WHERE email = 'dennischua@hospital.com'");
    const dennischuaStaffId = dennischuaId.rows[0]?.staff_id;
    if (dennischuaStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Saturday', '7am-4pm')
  `, [dennischuaStaffId]);
    }

    const lynnsimId = await pool.query("SELECT staff_id FROM staff WHERE email = 'lynnsim@hospital.com'");
    const lynnsimStaffId = lynnsimId.rows[0]?.staff_id;
    if (lynnsimStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Sunday', '11pm-7am'),
      ($1, 'Monday', '11pm-7am'),
      ($1, 'Tuesday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Friday', '11pm-7am')
  `, [lynnsimStaffId]);
    }

    const davistayId = await pool.query("SELECT staff_id FROM staff WHERE email = 'davistay@hospital.com'");
    const davistayStaffId = davistayId.rows[0]?.staff_id;
    if (davistayStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [davistayStaffId]);
    }

    const samuelgohId = await pool.query("SELECT staff_id FROM staff WHERE email = 'samuelgoh@hospital.com'");
    const samuelgohStaffId = samuelgohId.rows[0]?.staff_id;
    if (samuelgohStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Saturday', '7am-4pm')
  `, [samuelgohStaffId]);
    }

    const janefooId = await pool.query("SELECT staff_id FROM staff WHERE email = 'janefoo@hospital.com'");
    const janefooStaffId = janefooId.rows[0]?.staff_id;
    if (janefooStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [janefooStaffId]);
    }

    const alexhoId = await pool.query("SELECT staff_id FROM staff WHERE email = 'alexho@hospital.com'");
    const alexhoStaffId = alexhoId.rows[0]?.staff_id;
    if (alexhoStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Sunday', '7am-4pm'),
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [alexhoStaffId]);
    }

    const kimleeId = await pool.query("SELECT staff_id FROM staff WHERE email = 'kimlee@hospital.com'");
    const kimleeStaffId = kimleeId.rows[0]?.staff_id;
    if (kimleeStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [kimleeStaffId]);
    }

    const gracechanId = await pool.query("SELECT staff_id FROM staff WHERE email = 'gracechan@hospital.com'");
    const gracechanStaffId = gracechanId.rows[0]?.staff_id;
    if (gracechanStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [gracechanStaffId]);
    }

    const johnlimId = await pool.query("SELECT staff_id FROM staff WHERE email = 'johnlim@hospital.com'");
    const johnlimStaffId = johnlimId.rows[0]?.staff_id;
    if (johnlimStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '11pm-7am'),
      ($1, 'Tuesday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Thursday', '11pm-7am'),
      ($1, 'Saturday', '11pm-7am')
  `, [johnlimStaffId]);
    }

    const annaleeId = await pool.query("SELECT staff_id FROM staff WHERE email = 'annalee@hospital.com'");
    const annaleeStaffId = annaleeId.rows[0]?.staff_id;
    if (annaleeStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Friday', '7am-4pm')
  `, [annaleeStaffId]);
    }

    const peterteoId = await pool.query("SELECT staff_id FROM staff WHERE email = 'peterteo@hospital.com'");
    const peterteoStaffId = peterteoId.rows[0]?.staff_id;
    if (peterteoStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '7am-4pm'),
      ($1, 'Tuesday', '7am-4pm'),
      ($1, 'Wednesday', '7am-4pm'),
      ($1, 'Thursday', '7am-4pm'),
      ($1, 'Saturday', '7am-4pm')
  `, [peterteoStaffId]);
    }

    const lilygohId = await pool.query("SELECT staff_id FROM staff WHERE email = 'lilygoh@hospital.com'");
    const lilygohStaffId = lilygohId.rows[0]?.staff_id;
    if (lilygohStaffId) {
      await pool.query(`
    INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES
      ($1, 'Monday', '11pm-7am'),
      ($1, 'Tuesday', '11pm-7am'),
      ($1, 'Wednesday', '11pm-7am'),
      ($1, 'Thursday', '11pm-7am'),
      ($1, 'Friday', '11pm-7am')
  `, [lilygohStaffId]);
    }


    console.log('✅ Database initialized successfully');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    pool.end();
  }
}

initDB();
