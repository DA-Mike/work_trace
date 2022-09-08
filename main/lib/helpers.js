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

function populateManagers() {
    const sql = `SELECT first_name, last_name FROM employee, emp_role WHERE employee.role_id = emp_role.id AND emp_role.title = "Manager"`;
    const managerArr = [];

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
            console.log(err);
            return;
            } else {
                for (i = 0; i < result.length; i++) {
                    let managerStr = '';
                    managerStr = managerStr.concat(result[i].first_name);
                    managerStr = managerStr.concat(' ');
                    managerStr = managerStr.concat(result[i].last_name);
                    managerArr.push(managerStr);
                }
                resolve(managerArr);
            }
        });
    })
}

function showAllEmployees() {
    const sql = `SELECT a.id , a.first_name, a.last_name, emp_role.title, emp_role.salary, department.department_name AS department, CONCAT(b.first_name, ' ', b.last_name) AS manager
    FROM employee a
    JOIN emp_role ON a.role_id = emp_role.id
    JOIN department ON emp_role.department_id = department.id
    LEFT JOIN employee b ON a.manager_id = b.id;`;
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

async function newEmployee(detailsArr) {
    // console.log('detailsArr', detailsArr);
    const nameArr = detailsArr[3].split(' ');
    detailsArr.pop();

    const query1 = await pickRole(detailsArr);
    const query2 = await pickManager(detailsArr, nameArr);
    
    
    const sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    // console.log('detailsArr2:', detailsArr);
    db.query(sql2, detailsArr, (err, result) => {
        if (err) {
        console.log('sql2 error:', err);
        return;
        } else {
            console.log("Success!");
        }
  });
}

const pickManager = async (detailsArr, nameArr) => {
    const sql = `SELECT id FROM employee WHERE employee.first_name = "${nameArr[0]}" AND employee.last_name = "${nameArr[1]}";`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if (err) {
            console.log('sql1 error:', err);
            return;
        } else {
            resolve(detailsArr.push(`${result[0].id}`));
        }
        });
    });
};

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
                    let roleStr = `${result[i].title}`
                    roleArr.push(roleStr);
                }
                // console.log('roleArr:', roleArr);
                resolve(roleArr);
            }
        })
    })
}

const pickRole = async (detailsArr) => {
    const sql = `SELECT id FROM emp_role WHERE emp_role.title = "${detailsArr[2]}";`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if (err) {
            console.log('sql1 error:', err);
            return;
        } else {
            detailsArr[2] = result[0].id;
            console.log('detailsArr:', detailsArr);
            resolve(detailsArr);
        }
        });
    });
}

function changeEmployeeRole(emp, newRole) {
    let nameArr = emp.split(' ');
    const firstName = nameArr[0].toString();
    const lastName = nameArr[1].toString();
    let roleArr = newRole.split(' ');
    let roleVar = parseInt(roleArr[0]);
    // roleVar = parseInt(roleVar);

    const sql = `UPDATE employee SET role_id = (?) WHERE first_name = "${firstName}"AND last_name = "${lastName}"`;

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

const populateDepartments = () => {
    const sql = `SELECT * FROM department`;
    const deptArr = [];

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                for (i = 0; i < result.length; i++) {
                    let deptStr = `${result[i].department_name}`
                    deptArr.push(deptStr);
                }
                // console.log('roleArr:', roleArr);
                resolve(deptArr);
            }
        })
    })
}

const pickDepartment = async (detailsArr) => {
    const sql = `SELECT id FROM department WHERE department.department_name = "${detailsArr[2]}";`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if (err) {
            console.log('sql1 error:', err);
            return;
        } else {
            detailsArr[2] = result[0].id;
            console.log('detailsArr:', detailsArr);
            resolve(detailsArr);
        }
        });
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

async function addNewRole(detailsArr) {

    const query = await pickDepartment(detailsArr);

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

module.exports = {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole, populateManagers, populateDepartments};