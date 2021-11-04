const assert = (isTrue, message) => {
  if (isTrue) {
    throw new Error(message || 'Ошибка');
  }
}

const filterForMoreOrLess = (arr) => {
  assert(arr.length <= 0, 'Переданный массив пуст');

  const resultFilter = arr;
  resultFilter.sort().reverse();

  return {
    more: resultFilter.slice(0, resultFilter.length / 2),
    less: resultFilter.slice(resultFilter.length / 2)
  }
}

filterOnType = (arr) => {
  const resultFilter = {};

  for (let itemArr of arr) {
    if (!resultFilter[typeof itemArr]) {
      resultFilter[typeof itemArr] = [];
    }
    resultFilter[typeof itemArr].push(itemArr);
  }

  return resultFilter;
}

const filterArray = (arr, typeFilter) => {
  assert(!Array.isArray(arr), 'Переданные данные не являются массивом');
  assert(
    (
      arr.includes(null)
      || arr.includes(undefined)
      || arr.includes(NaN)
    ),
    'Неправильный формат данных уберить undefined, NaN или null',
  );
  assert(arr.length <= 0, 'Переданный массив пуст');
  assert(!typeFilter, 'Тип фильтра не указан');

  let resultFunction;

  if (typeFilter === 'filterOnType') {
    resultFunction = filterOnType(arr);
  } else if (typeFilter === 'filterForMoreOrLess') {
    assert(
      arr.find((item) =>  typeof item !== 'string'),
      'Этот тип фильтра принимает только строки',
    );
    resultFunction = filterForMoreOrLess(arr);
  }

  return resultFunction;
}

console.log(filterArray(['123'], 'filterOnType'));
console.log(filterArray(['123', '1', 'Hello!', '', 'Hello!', 'Hello!'], 'filterForMoreOrLess'));
