const inquirer = require("inquirer")
const connection = require("./connection")


function startApp() {
    inquirer.prompt([
      {
        name: "prompt",
        type: "list",
        message: "What action do you want?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit"
        ]
      }])
      .then(function (response) {
        switch (response.prompt) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
          case "Update employee roles":
            employeeUpdate();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  };
  
function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res)=>{
        if (err) throw err // if there is an error in our sql query, tell us what it is

        console.table(res)//if query is successful, show us a table of the response

        startApp() // once everything is done, restart main prompts
    })
}

function viewRoles(){
    connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err // if there is an error in our sql query, tell us what it is

        console.table(res)//if query is successful, show us a table of the response

        startApp() // once everything is done, restart main prompts
    })
}

  startApp()



