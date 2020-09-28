/* eslint-disable max-len */
import data from '../db/data.json';
import OrderedCols from './OrderedCols';
import sortRows from './sortRows';

const containerEl = document.getElementsByClassName('container')[0];

const tableEl = document.createElement('table');
tableEl.classList.add('table');

const rowTitleEl = document.createElement('tr');

// Создает элемент таблицы и заполняет его данными
function createTableElem(cellValue, cellType = 'td') {
  const cellEl = document.createElement(cellType);
  cellEl.textContent = cellValue;
  return cellEl;
}

const orderedCols = new OrderedCols(data); // Порядок расположения столбцов в таблице

// Заполнение строки с названиями столбцов
orderedCols.names.forEach((col) => rowTitleEl.append(createTableElem(col, 'th')));
tableEl.append(rowTitleEl);

// Заполнение таблицы данными
function completeTable(tableData) {
  while (tableEl.children.length > 1) tableEl.lastChild.remove();
  for (const movie of tableData) {
    const rowEl = document.createElement('tr');

    // Заполнение элемента tr ячейками с данными из data.json
    for (const col of orderedCols.names) {
      let cellValue;
      if (col === 'year') cellValue = `(${movie[col]})`;
      else if (col === 'imdb') cellValue = `imdb: ${movie[col].toFixed(2)}`;
      else cellValue = movie[col];
      rowEl.append(createTableElem(cellValue));
    }
    tableEl.append(rowEl);
  }
  containerEl.append(tableEl);
}

completeTable(data);

setInterval(() => {
  rowTitleEl.children[orderedCols.prevSortBy].classList.remove('sortBy');
  rowTitleEl.children[orderedCols.sortBy].classList.add('sortBy');
  const sortedRows = sortRows(data, orderedCols);
  completeTable(sortedRows);
}, 2000);
