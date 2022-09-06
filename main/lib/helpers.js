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

function showAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
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
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
        // console.log(result);
        for (i = 0; i < result.length; i++) {
            let empStr = '';
            empStr = empStr.concat(result[i].first_name);
            empStr = empStr.concat(' ');
            empStr = empStr.concat(result[i].last_name);
            empArr.push(empStr);
        }
        return empArr;
    }
  });
}

function showAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("\n");;
        console.table(rows);
        console.log("\n");
    });
}

function showAllRoles() {
    const sql = `SELECT * FROM emp_role`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
    });
}

module.exports = {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees};