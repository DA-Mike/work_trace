const mysql = require('mysql2');
const cTable = require('console.table');

// connects to db
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// query which returns all employees
const showAllEmployees = () => {
    const sql = `SELECT a.id , a.first_name, a.last_name, emp_role.title, department.department_name AS department, emp_role.salary, CONCAT(b.first_name, ' ', b.last_name) AS manager
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

// adds new employee
const newEmployee = async (detailsArr) => {

    let sql = '';
    if (detailsArr[3] === "None") {
        detailsArr.pop();

        const query1 = await pickRole(detailsArr[2]);
        detailsArr[2] = query1;
        
        sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?, ?, ?)`;

    } else {
        const nameArr = detailsArr[3].split(' ');
        detailsArr.pop();

        const query1 = await pickRole(detailsArr[2]);
        detailsArr[2] = query1;
        const query2 = await pickManager(detailsArr, nameArr);
        
        sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        
    }
    db.query(sql, detailsArr, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Success!");
        }
    });
}

// query returns array of current employees
const populateEmployees = () => {
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

// populates and returns an array with current managers
const populateManagers = () => {
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
                    managerArr.push("None");
                }
                resolve(managerArr);
            }
        });
    })
}

// query finds manager ID
const pickManager = async (detailsArr, nameArr) => {

    return new Promise((resolve, reject) => {

        const sql = `SELECT id FROM employee WHERE employee.first_name = "${nameArr[0]}" AND employee.last_name = "${nameArr[1]}";`
        db.query(sql, (err, result) => {
            if (err) {
                return;
            } else {
                resolve(detailsArr.push(`${result[0].id}`));
            }
        });
    });
};

// query returns all roles
const showAllRoles = () => {
    const sql = `SELECT emp_role.id, emp_role.title, department.department_name AS department, emp_role.salary AS salary
    FROM emp_role
    INNER JOIN department ON emp_role.department_id = department.id`;
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

// query inserts new role
const addNewRole= async (detailsArr) => {

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

// query populates and returns array of current roles
const populateRoles = () => {
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
                resolve(roleArr);
            }
        })
    })
}

// query returns role ID
const pickRole = async (arr) => {
    const sql = `SELECT id FROM emp_role WHERE emp_role.title = "${arr}";`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if (err) {
            console.log('sql1 error:', err);
            return;
        } else {
            console.log('result:', result);
            arr = result[0].id;
            console.log('detailsArr:', arr);
            resolve(arr);
        }
        });
    });
}

// query updates employee role
const changeEmployeeRole = async (detailsArr) => {
    let nameArr = detailsArr[0].split(' ');
    const firstName = nameArr[0].toString();
    const lastName = nameArr[1].toString();

    const query = await pickRole(detailsArr[1]);

    const sql = `UPDATE employee SET role_id = (?) WHERE first_name = "${firstName}"AND last_name = "${lastName}"`;

    db.query(sql, query, (err, rows) => {
        if (err) {
            console.log(err);;
            return;
        } else {
            console.log('Success!');
        }
    })
}

// query displays all departments
const showAllDepartments = () => {
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

// query populates array with current departments
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
                resolve(deptArr);
            }
        })
    })
}

// query returns department ID
const pickDepartment = async (detailsArr) => {
    const sql = `SELECT id FROM department WHERE department.department_name = "${detailsArr[2]}";`

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            detailsArr[2] = result[0].id;
            resolve(detailsArr);
        }
        });
    });
}

// inserts new department
const addNewDepartment = (detailsArr) => {
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

// exports functions
module.exports = {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole, populateManagers, populateDepartments};