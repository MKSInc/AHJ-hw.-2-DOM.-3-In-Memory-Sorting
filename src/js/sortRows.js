export default function sortRows(rows, orderedCols) {
  const col = orderedCols.getName();
  return Array.from(rows)
    .sort((rowA, rowB) => {
      const parsedA = parseFloat(rowA[col]);
      if (Number.isNaN(parsedA)) return rowA[col] > rowB[col] ? 1 : -1;
      const parsedB = parseFloat(rowB[col]);
      return parsedA - parsedB;
    });
}
