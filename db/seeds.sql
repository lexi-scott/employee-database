USE employeeManager_db;
INSERT INTO departments (department_name)
VALUES
 ("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales General Manager", 100000, 1), 
("Sales Associate", 80000, 1), 
("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), 
("Accountant", 125000, 3), 
("Partner", 250000, 4), 
("Attorney", 190000, 4);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES 
("Scott", "Lexi", 3, null), 
("Canales", "Micah", 2, 1), 
("Harrington", "Terri", 1, null),
("Harris", "Tom", 4, 3), 
("Bartelt", "Tami", 5, 3), 
("Brennan", "Dallas", 6, null), 
("Huss", "Jennifer", 7, 6);