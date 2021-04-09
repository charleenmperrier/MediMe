DROP TABLE IF EXISTS lab_records CASCADE;
CREATE TABLE lab_records (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  referral_doctor_id INT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  lab_id INT NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
  is_blood BOOLEAN DEFAULT FALSE,
  is_urine BOOLEAN DEFAULT FALSE,
  is_mammogram BOOLEAN DEFAULT FALSE,
  is_xray BOOLEAN DEFAULT FALSE,
  is_ultrasound BOOLEAN DEFAULT FALSE,
  is_mri BOOLEAN DEFAULT FALSE
 );