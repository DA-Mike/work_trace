const inquirer = require('inquirer');
const cTable = require('console.table');
const {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole} = require('./lib/helpers');
const mysql = require('mysql2');

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
                    chooseEmployees();
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
    asyncHelper(val);
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
            newEmployee(details);
            asyncHelper(val);
        })
}

async function chooseEmployees() {
   let empArr = await populateEmployees();
   updateEmployee(empArr);
}

function updateEmployee(emps) {
    
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Which employee would you like to update?',
                choices: emps
            }
        ])
        .then(val => {
            console.log('val.choice:', val.choice);
            let empChoice = val.choice;
            ( async function () { 
                let roleArr = await populateRoles();
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'choice',
                        message: 'Please select new role: ',
                        choices: roleArr
                    }
                ])
                .then(val => {
                    changeEmployeeRole(empChoice, val.choice);
                })
            })();
        });
            // resolve();
    //         inquirer
    //             .prompt([
    //                 {
    //                     type: 'input',
    //                     name: 'firstName',
    //                     message: "Please enter employee's first name."
    //                 },
    //                 {
    //                     type: 'input',
    //                     name: 'lastName',
    //                     message: "Please enter employee's last name."
    //                 },
    //                 {
    //                     type: 'input',
    //                     name: 'roleId',
    //                     message: "Please enter employee's Role ID."
    //                 }
    //             ])
    //     })
    // // })
    //     .then(val => {
    //         const details = Object.values(val);
    //         console.log(details);
    //         // newEmployee(details);
        // })
        // asyncHelper(val);
        
}

function viewDepartments(val) {
    showAllDepartments();
    asyncHelper(val);
}

function addDepartment(val) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDept',
                message: "Please enter the new Department Name: "
            }
        ])
        .then((val => {
            const details = Object.values(val);
            addNewDepartment(details);
            asyncHelper(val);
        }))
}

function viewRoles(val) {
    showAllRoles();
    asyncHelper(val);
}

function addRole(val) {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: "Please enter the new role title: "
            },
            {
                type: 'input',
                name: 'salary',
                message: "Please enter the new role salary: "
            },
            {
                type: 'input',
                name: 'deptId',
                message: "Please enter the new role Department ID: "
            }
        ])
        .then((val => {
            const details = Object.values(val);
            addNewRole(details);
            asyncHelper(val);
        }))
        
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}

function asyncHelper(val) {
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

init();