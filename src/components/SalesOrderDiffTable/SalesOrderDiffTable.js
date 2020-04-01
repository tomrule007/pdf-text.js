import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTable from '../ReactTable/ReactTable';
import './SalesOrderDiffTable.css';

export default function DiffTable({ morningSalesOrder, eveningSalesOrder }) {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    if (eveningSalesOrder === null || morningSalesOrder === null) return;

    setColumns([
      { Header: 'Diff', accessor: 'diff' },
      ...eveningSalesOrder.columns
    ]);

    const eveningData = eveningSalesOrder.data;
    const morningData = morningSalesOrder.data;

    const mergedData = eveningData.map(eveningRow => {
      let morningMatches = morningData.filter(
        ({ Description }) => Description === eveningRow.Description
      );

      // If more than one unique 'description' match filter further using 'ogcComments'
      if (morningMatches.length > 1) {
        // console.log('duplicate matches');
        for (let i = 0; i < eveningRow['OGC Comments'].length; i += 1) {
          morningMatches = morningMatches.filter(
            row =>
              row['OGC Comments'].charAt(i) ===
              eveningRow['OGC Comments'].charAt(i)
          );
          if (morningMatches.length < 2) break;
        }
      }

      const diff =
        eveningRow['Total Order '] -
        (morningMatches[0] ? morningMatches[0]['Total Order '] : 0);
      const mergedRow = {
        ...eveningRow,
        ...(morningMatches[0] && {
          morningTotal: morningMatches[0]['Total Order ']
        }),
        ...(!(Number.isNaN(diff) || diff === 0) && {
          diff: `(${diff > 0 ? '+' : ''}${diff})`
        })
      };
      // console.log(mergedRow);
      return mergedRow;
    });
    setData(mergedData);
  }, [eveningSalesOrder, morningSalesOrder]);

  const itemCount = data && data.filter(row => row['Total Order '] > 0).length;
  const eveningCaseCount =
    data && data.reduce((acc, cur) => acc + Number(cur['Total Order ']), 0);
  const morningCaseCount =
    morningSalesOrder &&
    morningSalesOrder.data.reduce(
      (acc, cur) => acc + Number(cur['Total Order ']),
      0
    );

  const caseCountDiff = eveningCaseCount - morningCaseCount;

  return (
    <div>
      {data && columns ? (
        <>
          <p>{`Item Count: ${itemCount} Case Count: ${eveningCaseCount} (${caseCountDiff})`}</p>
          <ReactTable data={data} columns={columns} />
        </>
      ) : (
        <p>Loading salesOrder...</p>
      )}
    </div>
  );
}

DiffTable.propTypes = {
  morningSalesOrder: PropTypes.shape({
    data: PropTypes.array,
    columns: PropTypes.array
  }),
  eveningSalesOrder: PropTypes.shape({
    data: PropTypes.array,
    columns: PropTypes.array
  })
};

DiffTable.defaultProps = {
  morningSalesOrder: null,
  eveningSalesOrder: null
};
