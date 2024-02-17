interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  return [element, `Total: ${element.length}`];
}

console.log(countAndDescribe(["luis", "pedro", 20, true]));
