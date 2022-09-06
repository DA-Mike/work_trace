const inquirer = require('inquirer');
const cTable = require('console.table');
const {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees} = require('./lib/helpers');
const util = require('util');

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
                    viewEmployees(val.choice);
                    break;

                case 'Add Employee':
                    addEmployee(val.choice);
                    break;

                case 'Update Employee Role':
                    updateEmployee(val.choice);
                    break;

                case 'View All Roles':
                    viewRoles(val.choice);
                    break;

                case 'Add Role':
                    addRole(val.choice);
                    break;

                case 'View All Departments':
                    viewDepartments(val.choice);
                    break;

                case 'Add Department':
                    addDepartment(val.choice);
                    break;
                
                default:
                    quit();
                    break;
            }
        })
}

function viewEmployees(val) {
    showAllEmployees();
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

function addEmployee(val) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Please enter employee's first name: "
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Please enter employee's last name: "
            },
            {
                type: 'input',
                name: 'roleId',
                message: "Please enter employee's Role ID: "
            }
        ])
        .then(val => {
            const details = Object.values(val);
            console.log(details);
            newEmployee(details);
        })

        if(val !== 'Quit'){
            setTimeout(() => {
                whatToDo();
            }, 1000);
        }
}

function updateEmployee(val) {
    let empName = '';
    const empArr = populateEmployees();

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Which employee would you like to update?',
                choices: empArr
            }
        ])
        .then(val => {
            empName = empName.concat(val.name);
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Please enter employee's first name."
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Please enter employee's last name."
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: "Please enter employee's Role ID."
                    }
                ])
        })
    .then(val => {
        const details = Object.values(val);
        console.log(details);
        // newEmployee(details);
    })
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

function viewDepartments(val) {
    showAllDepartments();
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

function viewRoles(val) {
    showAllRoles();
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}






init();

// module.exports = {whatToDo};