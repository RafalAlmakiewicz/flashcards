export const toArray = <T>(object: { [id: string]: T }) => {
  let array: T[] = [];
  for (let key in object) {
    array.push(object[key]);
  }
  return array;
};

export const distinct = <T>(value: T, index: number, array: T[]) => {
  return array.indexOf(value) === index;
};
