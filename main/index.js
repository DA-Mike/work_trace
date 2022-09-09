const inquirer = require('inquirer');
// import SQL helper functions
const {showAllEmployees, showAllDepartments, showAllRoles, newEmployee, populateEmployees, addNewRole, addNewDepartment, populateRoles, changeEmployeeRole, populateManagers, populateDepartments, viewEmpsByMngr, viewEmpsByDept, viewUtilBudget, changeEmployeeManager} = require('./lib/helpers');

// initializes app
const init = () => whatToDo();

// initial prompt
const whatToDo = async () => {

    console.log("Employee Manager");

    const input = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View Employees By Manager', 'View Employees By Department', 'View Total Utilized Budget', "Change Employee's Manager", 'Quit']
            }
        ])
    switch(input.choice) {
        case 'View All Employees':
            await viewEmployees(input.choice);
            break;

        case 'Add Employee':
            addEmployee(input.choice);
            break;

        case 'Update Employee Role': 
            chooseEmployees();
            break;

        case 'View All Roles':
            viewRoles(input.choice);
            break;

        case 'Add Role':
            addRole(input.choice);
            break;

        case 'View All Departments':
            viewDepartments(input.choice);
            break;

        case 'Add Department':
            addDepartment(input.choice);
            break;
        
        case 'View Employees By Manager':
            viewEmployeesByManager(input.choice);
            break;

        case 'View Employees By Department':
            viewEmployeesByDept(input.choice);
            break;
        
        case 'View Total Utilized Budget':
            viewUtilizedBudget(input.choice);
            break;

        case "Change Employee's Manager":
            updateEmployeeManager(input.choice);
            break;

        default:
            quit();
            break;
    }
}

// calls on helper function to display all employees (all following functions call on various helpers)
const viewEmployees = async (val) => {
    const showAll = await showAllEmployees();
    whatToDo();
}

// adds employee
const addEmployee = async (val) => {

    // populates roleArr with current roles
    const roleArr = await populateRoles();

    // populates managerArr with current managers
    const managerArr = await populateManagers();
        
    const input = await inquirer.prompt([
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
        const details = Object.values(input);
        const addNew = await newEmployee(details);
        whatToDo();
}

// a little helper function which assists with updateEmployee()
const chooseEmployees = async () => {
   let empArr = await populateEmployees();
   updateEmployee(empArr);
}

// updates employee role
const updateEmployee = async (emps) => {

        // populates roleArr with current roles
        let roleArr = await populateRoles();

        const input = await inquirer.prompt([
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
        const details = Object.values(input);
        const change = await changeEmployeeRole(details);
        whatToDo();
}

// *BONUS* updates employee's manager
const updateEmployeeManager = async (val) => {

    const empArr = await populateEmployees();
    const managerArr = await populateManagers();

    const input = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which employee would you like to update?',
            choices: empArr
        },
        {
            type: 'list',
            name: 'newMngr',
            message: 'Please select new role: ',
            choices: managerArr
        }
    ])
    const details = Object.values(input);
    const change = await changeEmployeeManager(details);
    whatToDo();
}

// *BONUS* displays employees by selected manager
const viewEmployeesByManager = async (val) => {

    const managerArr = await populateManagers();

    const input = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which manager would you like to view?',
            choices: managerArr
        },
    ])
    const details = Object.values(input);
    const viewByMngr = await viewEmpsByMngr(details);
    whatToDo();
}

// *BONUS* displays employees by selected department
const viewEmployeesByDept = async (val) => {
    
    // populates departments into array
    const deptArr = await populateDepartments();

    const input = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which department would you like to view?',
            choices: deptArr
        },
    ])
    const details = Object.values(input);
    const viewEmps = await viewEmpsByDept(details);
    whatToDo();
}

// displays all departments
const viewDepartments = async (val) => {
    const showAll = await showAllDepartments();
    whatToDo();
}

// adds department
const addDepartment = async (val) => {

    const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDept',
                message: "Please enter the new Department Name: "
            }
        ])
    const details = Object.values(input);
    const addNew = await addNewDepartment(details);
    whatToDo();
}

// displays all roles
const viewRoles = async (val) => {
    const showAll = await showAllRoles();
    whatToDo();
}

// adds new role
const addRole = async (val) => {

    const deptArr = await populateDepartments();

    const input = await inquirer.prompt([
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
    const details = Object.values(input);
    const newRole = await addNewRole(details);
    whatToDo();
}

// *BONUS* displays sum of employee salaries
const viewUtilizedBudget = async (val) => {
    const viewBudget = await viewUtilBudget();
    whatToDo();
}

// quits app
const quit = () => {
    console.log("Goodbye!");
    process.exit();
}

// initializes app
init();