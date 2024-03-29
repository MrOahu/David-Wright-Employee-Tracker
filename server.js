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

function viewEmployees(){
    connection.query("SELECT * FROM employee", (err, res)=>{
        if (err) throw err // if there is an error in our sql query, tell us what it is

        console.table(res)//if query is successful, show us a table of the response

        startApp() // once everything is done, restart main prompts
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message:"What department would you like to add?"
        }
    ]).then(answer => {
        connection.query("INSERT INTO department SET ?", {
            name: answer.newDepartment
        })
        console.log("New department added!")
        startApp()
    })

}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message:"What role would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message:"What is the salary for this new role?"
        },
        {
            type: "list",
            name: "department_id",
            message:"What is the department ID for this role?",
            choices: [1, 2, 3, 4, 5]
        },
    ]).then(answer => {
        connection.query("INSERT INTO role SET ?", {
            title: answer.newRole,
            salary: answer.salary,
            department_id: answer.department_id
        })
        console.log("New role added!")
        startApp()
    })

        }

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firidst_name",
            message:"What is the first name of the employee you would you like to add?"
        },
        {
            type: "input",
            name: "last_name",
            message:"What is the last name of the employee you would like to add?"
        },
        {
            type: "list",
            name: "role_id",
            message:"What is the role ID for the employee you would like to add?",
            choices: [1, 2, 3, 4, 5]
        },
        {
            type: "list",
            name: "manager_id",
            message: "What is the manager ID for the employee you would like to add?",
            choices: [1, 2, 3, 4, 5]
        },
    ]).then(answer => {
        connection.query("INSERT INTO employee SET ?", {
            firidst_name: answer.firidst_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        })
        console.log("New employee added!")
        startApp()
    })

}

function employeeUpdate(){
    connection.query("SELECT * FROM employee", (err, res) => {
        inquirer.prompt([
            {
                type: "list",
                name: "chosenEmployee",
                message: "Please choose the employee whose role you would like to update.",
                choices: res.map(employee => employee.firidst_name + " " + employee.last_name)
            }
        ]).then(answer => {
            // convert id
            const employee = res.find(employee => employee.firidst_name + " " + employee.last_name === answer.chosenEmployee )
            
            connection.query("SELECT * FROM role", (err, res) => {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "chosenRole",
                        message: "Please select new role for the employee.",
                        choices: res.map(role => role.title)
                    }
                ]).then(answer => {
                    const role =  res.find(role => role.title === answer.chosenRole)

                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role.id, employee.id])
                    console.log("Employee role updated!")
                    startApp()
                })
            })

        })
    })
}






  startApp()



