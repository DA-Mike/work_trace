--TEST QUERY SANDBOX


-- SELECT favorite_books.book_name AS name, book_prices.price AS price
-- FROM favorite_books
-- JOIN book_prices ON favorite_books.book_price = book_prices.id;

-- SELECT a.id , a.first_name, a.last_name, emp_role.title, emp_role.salary, department.department_name AS department, CONCAT(b.first_name, ' ', b.last_name) AS manager
-- FROM employee a
-- JOIN emp_role ON a.role_id = emp_role.id
-- JOIN department ON emp_role.department_id = department.id
-- LEFT JOIN employee b ON a.manager_id = b.id;

-- UPDATE employee SET manager = "NULL" WHERE employee.manager LIKE CONCAT('%', employee.first_name, '%'); -- AND a.manager LIKE a.last_name;


-- UPDATE employee SET manager_id = (employee.first_name employee.last_name) WHERE 
-- JOIN employee b ON a.manager_id = b.id;

-- SELECT manager_id FROM employee WHERE employee.first_name = "Joe" AND employee.last_name = "Schmoe";




-- SELECT CONCAT(first_name, ' ', last_name) FROM employee
-- FROM employee
-- JOIN employee ON employee.manager_id = employee.id;

-- JOIN employee ON emp_role.title = employee.id;

-- -- need to figure out how to do the manager relational mapping/inserting/updating
-- UPDATE employee SET manager_id = employee.id
--     -- WHERE employee.role_id = emp_role.id AND emp_role.department_id = department.id AND emp_role.title = "Manager";
--     WHERE employee.role_id = emp_role.id

-- UPDATE employee SET  manager_id
-- -- FROM employee A, employee B
-- WHERE  emp_role.title = "Manager";

-- SELECT emp_role.id, emp_role.title, department.department_name AS department, emp_role.salary AS salary
-- FROM emp_role
-- INNER JOIN department ON emp_role.department_id = department.id;

-- SELECT first_name, last_name FROM employee, emp_role WHERE employee.role_id = emp_role.id AND emp_role.title LIKE "%Manager"

-- SELECT first_name, last_name FROM employee WHERE employee.manager_id = 7;

-- SELECT first_name, last_name FROM employee, emp_role WHERE employee.role_id = emp_role.id AND emp_role.department_id = 1;
-- SELECT SUM(emp_role.salary) AS total_utilized_budget FROM employee JOIN emp_role ON employee.role_id = emp_role.id
-- JOIN department ON emp_role.department_id = department.id

-- WHERE employee.manager_id = 1

-- SELECT a.first_name, a.last_name, b.title 
-- FROM (SELECT first_name, last_name, role_id FROM employee WHERE manager_id = 6) AS a
-- JOIN emp_role AS b WHERE b.id = a.role_id;

SELECT a.first_name, a.last_name, b.title
FROM (SELECT first_name, last_name, role_id FROM employee, emp_role WHERE employee.role_id = emp_role.id AND emp_role.department_id = (1)) AS a
JOIN emp_role AS b WHERE b.id = a.role_id;