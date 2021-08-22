-- USE simple_hr_app;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(511)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(511) NOT NULL,
  salary DECIMAL,
  departmentId INT,
  FOREIGN KEY (departmentId) 
    REFERENCES departments(id) 
);

INSERT INTO departments (name, description)
VALUES ('Human Resources', 'The human resources department'),
('Engineering', 'The department of software engineering');