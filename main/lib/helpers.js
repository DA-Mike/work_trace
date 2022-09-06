const mysql = require('mysql2');
const cTable = require('console.table');
// const {whatToDo} = require('../index');

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
    const sql = `SELECT * FROM EMPLOYEE`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`           
        
        `);
        console.table(rows);
        console.log(`           
        
        `);
    });
};

function showAllDepartments() {
    const sql = `SELECT * FROM DEPARTMENT`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`           
        
        `);
        console.table(rows);
        console.log(`           
        
        `);
    });
}

module.exports = {showAllEmployees, showAllDepartments};