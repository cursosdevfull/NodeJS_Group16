class UserActivity {
  tasks: Array<string> = ["task01", "task02", "task03"];
}

class UserSalary extends UserActivity {
  amountByTask = 100;

  getSalary(quantityTasks: number) {
    return quantityTasks * this.amountByTask;
  }

  getInformation() {
    return {
      quantityTasks: this.tasks.length,
      salary: this.tasks.length * this.amountByTask,
      tasks: this.tasks,
    };
  }
}

const userSalary = new UserSalary();
//const userActivity = new UserActivity()

/*const quantityTasks = userActivity.tasks.length
console.log(userSalary.getSalary(quantityTasks))*/

console.log(userSalary.getInformation());
