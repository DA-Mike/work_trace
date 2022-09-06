const inquirer = require('inquirer');
const cTable = require('console.table');
const {showAllEmployees, showAllDepartments} = require('./lib/helpers');

function init() {
    whatToDo();
}

function whatToDo() {

    console.log("Employee Manager");

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
            }
        ])
        .then(val => {
            switch(val.choice) {
                case 'View All Employees':
                    viewEmployees.then(whatToDo());
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployee();
                    break;

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'View All Departments':
                    viewDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;
                
                default:
                    quit();
                    break;
            }
        })
}

// function viewEmployees() {
//     showAllEmployees(); //.then(whatToDo());
// }

// const viewEmployees = () => new Promise((resolve, reject) => {
//     resolve(showAllEmployees());
// });

const viewEmployees = new Promise((resolve, reject) => {
    showAllEmployees();
    resolve();
});

function viewDepartments() {
    showAllDepartments();
}







init();

// module.exports = {whatToDo};