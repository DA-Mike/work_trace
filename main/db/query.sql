-- SELECT favorite_books.book_name AS name, book_prices.price AS price
-- FROM favorite_books
-- JOIN book_prices ON favorite_books.book_price = book_prices.id;

-- SELECT employee.id AS emp_ID, employee.first_name, employee.last_name, employee.role_id, emp_role.title, emp_role.salary, emp_role.department_id, department.department_name
-- FROM employee
-- JOIN emp_role ON employee.role_id = emp_role.id
-- JOIN department ON emp_role.department_id = department.id;

-- need to figure out how to do the manager relational mapping/inserting/updating
INSERT INTO employee (manager_id)
    VALUES (employee.id) WHERE employee.role_id = emp_role.id AND emp_role.department_id = department.id;