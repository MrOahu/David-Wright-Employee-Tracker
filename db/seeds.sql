USE employee_db;

INSERT INTO department(name)
VALUES ("IT"), ("Management"), ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES ("IT Specialist", 60000, 1), ("Manager", 70000, 2), ("Software Engineer", 100000, 3), ("Accountant", 80000, 4), ("Lawyer", 125000, 5), ("Sales Representative", 50000, 6);

INSERT INTO employee(firidst_name, last_name, role_id, manager_id)
VALUES ("Duncan", "Pincushion", 1, null), ("Lawrence", "Gibbons", 3, 1), ("Joanna", "Peters", 4, 2), ("Samir", "Bolton", 5, 3), ("Robert", "Lumbergh", 6, 4)