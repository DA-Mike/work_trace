INSERT INTO department (department_name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Accounting"),
        ("Marketing"),
        ("Human Resources");

INSERT INTO emp_role (title, salary, department_id)
VALUES  ("Engineer", 150000, 1),
        ("Financial Analyst", 100000, 2),
        ("Accountant", 80000, 3),
        ("Marketing Associate", 95000, 4),
        ("HR Analyst", 25000, 5),
        ("Manager", 200000, 1),
        ("Manager", 175000, 2),
        ("Manager", 170000, 3),
        ("Manager", 150000, 4),
        ("Manager", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Joe", "Schmoe", 1),
        ("Valerie", "Mallory", 2),
        ("Bean", "Counter", 3),
        ("Bubble", "Wubbles", 4),
        ("Karen", "Smith", 5),
        ("Tony", "Soprano", 6);
