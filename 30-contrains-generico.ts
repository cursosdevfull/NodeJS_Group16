type IType = string | number | boolean;

class DataStorage<T extends string | number | boolean> {
  private data: Array<T> = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const storageText = new DataStorage<string>();
storageText.addItem("Joe");
storageText.addItem("Mike");
storageText.addItem("John");
storageText.removeItem("Mike");
console.log(storageText.getItems());

const storageNumber = new DataStorage<number>();
storageNumber.addItem(34);
storageNumber.addItem(45);
storageNumber.addItem(34);
storageNumber.removeItem(45);
console.log(storageNumber.getItems());

const storageBoolean = new DataStorage<boolean>();
storageBoolean.addItem(true);
storageBoolean.addItem(false);
storageBoolean.addItem(true);
storageBoolean.removeItem(false);
console.log(storageBoolean.getItems());

//const storageObject = new DataStorage<object>()
