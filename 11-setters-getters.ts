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

  get amount() {
    return this.amountByTask * 100;
  }

  set amount(amount: number) {
    //if(amount<50) throw "Amount must be greater than 50"
    if (amount < 50) {
      this.amountByTask = 50;
    } else {
      this.amountByTask = amount;
    }
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);

userSalary.amount = 20;

console.log(userSalary.getInformation());
console.log(userSalary.amount);
