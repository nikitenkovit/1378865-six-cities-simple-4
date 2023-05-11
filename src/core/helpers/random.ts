export function generateRandomValue(min: number, max: number, precision = 0) {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getFixedNumberRandomItems<T>(fixedNumber: number, items: T[]): T[] { // TODO Тесты?
  if (fixedNumber >= items.length) {
    return items;
  }

  const array = items.slice();
  const resultList: T[] = [];

  if (fixedNumber === 0) {
    return resultList;
  }

  const index = generateRandomValue(0, array.length - 1);
  const item = array.splice(index, 1)[0];
  resultList.push(item);

  return getFixedNumberRandomItems(fixedNumber--, array);
}
