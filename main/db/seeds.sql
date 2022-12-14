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
        ("Engineering Manager", 200000, 1),
        ("Finance Manager", 175000, 2),
        ("Accounting Manager", 170000, 3),
        ("Marketing Manager", 150000, 4),
        ("HR Manager", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Joe", "Schmoe", 1, 6),
        ("Valerie", "Mallory", 2, 7),
        ("Bean", "Counter", 3, NULL),
        ("Bubble", "Wubbles", 4, NULL),
        ("Karen", "Smith", 5, NULL),
        ("Tony", "Soprano", 6, NULL),
        ("Tim", "Grim", 7, NULL);
