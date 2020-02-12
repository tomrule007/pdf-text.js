export default function dataExtractor(items, template) {
  console.log(items);
  const data = {};

  const isBetween = (start, stop) => value => {
    const [min, max] = start < stop ? [start, stop] : [stop, start];
    return value >= min && value <= max;
  };

  for (let key in template) {
    console.log(key);
    switch (key) {
      case 'tables':
        const getInbounds = (items, { top, bottom, left, right }) => {
          const isBetweenTopBottom = isBetween(top, bottom);
          const isBetweenLeftRight = isBetween(left, right);

          return items.filter(
            ({ x, y }) => isBetweenTopBottom(y) && isBetweenLeftRight(x)
          );
        };

        const getRows = items => {
          const rowsObj = items.reduce((acc, cur) => {
            acc[cur.y] =
              acc[cur.y] === undefined ? [cur] : [...acc[cur.y], cur];
            return acc;
          }, {});

          return Object.values(rowsObj).sort((a, b) => a[0].y - b[0].y);
        };
        const rowToColumns = columns => row =>
          row.reduce((acc, char) => {
            const { x, text } = char;
            const { accessor } = columns.find(columnX => x < columnX.x);

            acc[accessor] =
              acc[accessor] === undefined ? [text] : [...acc[accessor], text];

            return acc;
          }, {});

        data.tables = template.tables.map(tableTemplate => ({
          rows: getRows(getInbounds(items, tableTemplate)).map(
            rowToColumns(tableTemplate.columns)
          ),
          name: tableTemplate.name
        }));
        break;

      default:
        throw new Error(`unknown template data type: ${key}`);
    }
  }

  return data;
}