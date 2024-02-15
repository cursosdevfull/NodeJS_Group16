class UserActivity {
  tasks: Array<string> = ["task01", "task02", "task03"];
}

class UserSalary {
  amountByTask = 100;

  getInformation() {
    const userActivity = new UserActivity();
    return {
      quantityTasks: userActivity.tasks.length,
      salary: userActivity.tasks.length * this.amountByTask,
      tasks: userActivity.tasks,
    };
  }
}

const userSalary = new UserSalary();

console.log(userSalary.getInformation());
