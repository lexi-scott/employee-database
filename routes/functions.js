const mysql = require('mysql2');
const inquirer = require('inquirer');
const dbConnector = require('../db/dbConnector');
require('console.table');

const openPrompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'first',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add an Employee', 'Update Employee Role', 'View All Roles', 'Add a Role', 'View All Departments', 'Add a Department', 'Quit']
            }
        ])
        .then((data) => {
            if (data.first === "View All Employees") {
                viewEmployee();
            }

            else if (data.first === "Add an Employee") {
                addEmployee();
            }

            else if (data.first === "Update Employee Role") {
                updateRole();
            }

            else if (data.first === "View All Roles") {
                viewRoles();
            }

            else if (data.first === "Add a Role") {
                addRole();
            }
            else if (data.first === "View All Departments") {
                viewDepartments();
            }

            else if (data.first === "Add a Department") {
                addDepartment();
            }

            else if (data.first === "Quit") {
                console.log("Goodbye")
                process.exit();
            };
        });
};

function viewDepartments() {
    dbConnector.query("SELECT * FROM departments", function(err, data) {
        if(err) throw(err);
        console.table(data);
        openPrompt();
    });

};

function viewEmployee() {
    dbConnector.query("SELECT * FROM employees", function(err, data) {
        if(err) throw(err);
        console.table(data);
        openPrompt();
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "lastName",
                message: "Employee's last name:"
            },
            {
                type: "input",
                name: "firstName",
                message: "Employee's first name:"
            },
            {
                type: "input",
                name: "role",
                message: "Employee's role ID:",
            },
            {
                type: "input",
                name: "manager",
                message: "Employee's manager ID:"
            },
        ])
        .then((data) => {
            params = [data.lastName, data.firstName, data.role, data.manager];
                const sql = "INSERT INTO employees (last_name, first_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                dbConnector.query(sql, params, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                })
                openPrompt();   
              });
        }

function updateRole() {
    const sql = `SELECT last_name, first_name, id FROM employees`
    dbConnector.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      const employees = rows.map(({last_name, first_name, id}) => ({name: `${last_name} ${first_name}`, value: id}));
      inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role would you like to update?",
          choices: employees
        }
      ])
      .then(data => {
        const employee = data.employee;
        const params = employee;
        const sql = `SELECT title, id FROM roles`;
        dbConnector.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const roles = rows.map(({title, id}) => ({name: title, value: id}));
          inquirer.prompt([
            {
              type: "list",
              name: "role",
              message: "What is the new role of this employee?",
              choices: roles
            }
          ])
          .then(data => {
            const roleParams = data.role;
            const sql = `UPDATE employees SET title = ${roleParams} WHERE id = ${employee}`
            dbConnector.query(sql, params, (err) => {
              if (err) {
                throw err;
              }
              openPrompt();
            });
          });
        });
      });
    });
  };


function viewRoles() {
    dbConnector.query("SELECT * FROM roles", function(err, data) {
        if(err) throw(err);
        console.table(data);
        openPrompt();
    });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "Name of new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Salary of the role:"
            },
            {
                type: "input",
                name: "department",
                message: "Department ID the role belongs to:"
            }
        ])
        .then((data) => {
            const params = [data.role, data.salary, data.department];
            const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
            dbConnector.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err);
                }
            })
            openPrompt();   
          });
        };


function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "Name of new department:"
            }
        ])
        .then((data) => {
            const params = data.department;
            const sql = "INSERT INTO departments (department_name) VALUES (?)";
            dbConnector.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err);
                }
            })
            openPrompt();   
          });
        };


module.exports = openPrompt;