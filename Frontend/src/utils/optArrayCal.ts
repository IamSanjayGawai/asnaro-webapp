export default function optimizeArray(arr) {
  const uniqueDatesMap = arr.reduce((map, curr) => {
    if (curr.selectedStatus !== "") {
      map[curr.date] = curr;
    }
    return map;
  }, {});

  const removeDuplicates = Object.values(uniqueDatesMap);

  return removeDuplicates;
}
