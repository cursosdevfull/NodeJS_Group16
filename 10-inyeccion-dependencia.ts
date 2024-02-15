class UserActivity {
  tasks: Array<string> = ["task01", "task02", "task03"];
}

class UserSalary {
  amountByTask = 100;
  userActivity: UserActivity;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  getInformation() {
    //const userActivity = new UserActivity();
    return {
      quantityTasks: this.userActivity.tasks.length,
      salary: this.userActivity.tasks.length * this.amountByTask,
      tasks: this.userActivity.tasks,
    };
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);

console.log(userSalary.getInformation());
