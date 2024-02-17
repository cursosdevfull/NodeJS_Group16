/*function merge(objA: object, objB: object) {
    return Object.assign(objA, objB)
}*/

function merge<T01 extends object, T02>(objA: T01, objB: T02) {
  return Object.assign(objA, objB);
}

console.log(merge<{ name: string }, number>({ name: "luis" }, 50));
