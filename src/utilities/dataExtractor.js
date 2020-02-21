import merge from 'deepmerge';

const isBetween = (start, stop) => value => {
  const [min, max] = start < stop ? [start, stop] : [stop, start];
  return value >= min && value <= max;
};
const getInbounds = (items, { top, bottom, left, right }) => {
  const isBetweenTopBottom = isBetween(top, bottom);
  const isBetweenLeftRight = isBetween(left, right);

  return items.filter(
    ({ x, y }) => isBetweenTopBottom(y) && isBetweenLeftRight(x)
  );
};

const getRows = items => {
  const rowsObj = items.reduce((acc, cur) => {
    acc[cur.y] = acc[cur.y] === undefined ? [cur] : [...acc[cur.y], cur];
    return acc;
  }, {});

  return Object.values(rowsObj).sort((a, b) => a[0].y - b[0].y);
};
const rowToColumns = columns => rowArray =>
  rowArray.reduce((rowObj, char) => {
    const { x, y, text } = char;
    const { accessor } = columns.find(columnX => x < columnX.x);
    const newProperties = {
      [accessor]: [text],
      ...(rowObj.y === undefined && { y })
    };

    return merge(rowObj, newProperties);
  }, {});
const mergeMultiLineCell = (mergeRule, rows) => {
  const mutatingRows = [...rows];
  const { requiredKey, direction } = mergeRule;
  const mergedRows = [];
  for (let i = 0; i < mutatingRows.length; i += 1) {
    const current = { ...mutatingRows[i] };
    if (current[requiredKey]) {
      mergedRows.push(current);
    } else {
      const rowAbove = mutatingRows[i - 1];
      const rowBelow = mutatingRows[i + 1];
      const upDistance = rowAbove ? current.y - rowAbove.y : Infinity;
      const downDistance = rowBelow ? rowBelow.y - current.y : Infinity;
      const { y, ...currentNoY } = current;
      // let combinedRows;
      switch (direction) {
        case 'up':
          if (i === 0) throw new Error('Can not merge up on first row');
          mergedRows[i - 1] = merge(current, rowAbove);
          break;
        case 'down':
          if (i + 1 === rows.length)
            throw new Error('Can not merge down on last row');
          mutatingRows[i + 1] = merge(current, rowBelow);
          break;
        case 'closest':
          if (upDistance < downDistance) {
            if (i === 0) throw new Error('Can not merge up on first row');
            mergedRows[mergedRows.length - 1] = merge(rowAbove, currentNoY);
          } else {
            if (i + 1 >= rows.length)
              throw new Error('Can not merge down on last row');
            mutatingRows[i + 1] = merge(rowBelow, currentNoY);
          }
          break;

        default:
          throw new Error(`unknown template merge direction: ${direction}`);
      }
    }
  }
  return mergedRows;
};

/**
 * An object containing the information to sort objects with (x,y) coordinate properties.
 * @typedef {Object} TemplateObj
 * @property {Object[]} tables table coordinate information
 */

/**
 * @param {Object[]} items of objects containing {x: number,y:number}
 * @param {string} items[].text The value that is extracted
 * @param {number} items[].x Location of item on the x-axis (horizontal axis)
 * @param {number} items[].y Location of item on the y-axis (vertical axis)
 *
 * @param {TemplateObj} template object containing coordinates of data to be extracted
 */
export default function dataExtractor(items, template) {
  const data = {};

  Object.keys(template).forEach(key => {
    switch (key) {
      case 'tables':
        data.tables = template.tables.map(tableTemplate => {
          let rows = getRows(getInbounds(items, tableTemplate)).map(
            rowToColumns(tableTemplate.columns)
          );
          if (tableTemplate.mergeRule) {
            rows = mergeMultiLineCell(tableTemplate.mergeRule, rows);
          }
          return {
            rows,
            name: tableTemplate.name
          };
        });
        break;

      default:
        throw new Error(`unknown template data type: ${key}`);
    }
  });

  return data;
}
