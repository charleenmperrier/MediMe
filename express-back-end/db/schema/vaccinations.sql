DROP TABLE IF EXISTS vaccinations CASCADE;
CREATE TABLE vaccinations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  total_num_doses INT NOT NULL DEFAULT 1
 );
