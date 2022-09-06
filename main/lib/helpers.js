const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

function insertManagers() {
    const sql = `UPDATE employee manager_id = employee.id WHERE 
    VALUES (employee.id) WHERE employee.role_id = emp_role.id AND emp_role.department_id = department.id`;
    db.query(sql, (err, result) => {
        if (err) {
        console.log(err);
        return;
        } else {
            console.log("Success!");
        }
  });
}

function showAllEmployees() {
    const sql = `SELECT employee.id AS emp_ID, employee.first_name, employee.last_name, employee.role_id, emp_role.title, emp_role.salary, emp_role.department_id, department.department_name
    FROM employee
    JOIN emp_role ON employee.role_id = emp_role.id
    JOIN department ON emp_role.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);;
            return;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
    });
};

function newEmployee(detailsArr) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
    VALUES (?, ?, ?)`;
    db.query(sql, detailsArr, (err, result) => {
        if (err) {
        console.log(err);
        return;
        } else {
            console.log("Success!");
        }
  });
}

function populateEmployees() {
    const sql = `SELECT first_name, last_name FROM employee`;
    const empArr = [];
    
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
            console.log(err);
            return;
            } else {
                for (i = 0; i < result.length; i++) {
                    let empStr = '';
                    empStr = empStr.concat(result[i].first_name);
                    empStr = empStr.concat(' ');
                    empStr = empStr.concat(result[i].last_name);
                    empArr.push(empStr);
                }
                resolve(empArr);
            }
        });
    })
}

function populateRoles() {
    const sql = `SELECT * FROM emp_role`;
    const roleArr = [];

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                for (i = 0; i < result.length; i++) {
                    let roleStr = `${result[i].id}: ${result[i].title} in ${result[i].department_id}.`
                    roleArr.push(roleStr);
                }
                resolve(roleArr);
            }
        })
    })
}

function changeEmployeeRole(emp, newRole) {
    let nameArr = emp.split(' ');
    const firstName = nameArr[0].toString();
    const lastName = nameArr[1].toString();
    let roleArr = newRole.split(' ');
    let roleVar = parseInt(roleArr[0]);
    // roleVar = parseInt(roleVar);

    const sql = `UPDATE employee SET role_id = (?) WHERE first_name = "${firstName}"`; // AND last_name = ${String(lastName)}`;

    db.query(sql, roleVar, (err, rows) => {
        if (err) {
            console.log(err);;
            return;
        } else {
            console.log('Success!');
        }
    })
}

function showAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n");;
        console.table(rows);
        console.log("\n");
    });
}

function addNewDepartment(detailsArr) {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    db.query(sql, detailsArr, (err, result) => {
        if (err) {
        console.log(err);
        return;
        } else {
            console.log("Success!");
        }
  });
}

function showAllRoles() {
    const sql = `SELECT * FROM emp_role`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);;
            return;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
    });
}

function addNewRole(detailsArr) {
    const sql = `INSERT INTO emp_role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    db.query(sql, detailsArr, (err, result) => {
        if (err) {
        console.log(err);
        return;
        } else {
            console.log("Success!");
        }
  });
}

module.exports = {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole};