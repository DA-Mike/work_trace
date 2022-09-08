const inquirer = require('inquirer');
const cTable = require('console.table');
const {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole, populateManagers, populateDepartments} = require('./lib/helpers');
const mysql = require('mysql2');

const init = () => whatToDo();

const whatToDo = () => {

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

const viewEmployees = (val) => {
    showAllEmployees();
    asyncHelper(val);
}

const addEmployee = async (val) => {

    ( async function () {
        const roleArr = await populateRoles();
        const managerArr = await populateManagers();
            
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
                type: 'list',
                name: 'role',
                message: 'Assign employee to a role.',
                choices: roleArr
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Assign employee to a manager.',
                choices: managerArr
            }   
        ])
        .then(val => {
            const details = Object.values(val);
            newEmployee(details);
            asyncHelper(val);
        })
    })()
}

const chooseEmployees = async () => {
   let empArr = await populateEmployees();
   updateEmployee(empArr);
}

const updateEmployee = async (emps) => {

        let roleArr = await populateRoles();

        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Which employee would you like to update?',
                choices: emps
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Please select new role: ',
                choices: roleArr
            }
        ])
        .then(val => {
            const details = Object.values(val);
            changeEmployeeRole(details);
            asyncHelper(val);
        })
}

const viewDepartments = (val) => {
    showAllDepartments();
    asyncHelper(val);
}

const addDepartment = (val) => {
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

const viewRoles = (val) => {
    showAllRoles();
    asyncHelper(val);
}

const addRole = async (val) => {

    const deptArr = await populateDepartments();

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
                type: 'list',
                name: 'dept',
                message: "Please choose the role's departments: ",
                choices: deptArr
            }
        ])
        .then((val => {
            const details = Object.values(val);
            addNewRole(details);
            asyncHelper(val);
        }))
        
}

const quit = () => {
    console.log("Goodbye!");
    process.exit();
}

const asyncHelper = (val) => {
    if(val !== 'Quit'){
        setTimeout(() => {
            whatToDo();
        }, 1000);
    }
}

init();