USE employee_db;

INSERT INTO department(name)
VALUES ("IT"), ("Management"), ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES ("IT Specialist", 60000, 1), ("Manager", 70000, 2), ("Software Engineer", 100000, 3), ("Accountant", 80000, 4), ("Lawyer", 125000, 5), ("Sales Representative", 50000, 6);