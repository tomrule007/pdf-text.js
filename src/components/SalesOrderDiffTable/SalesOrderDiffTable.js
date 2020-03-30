import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pdfText from 'pdf-template-parse';
import ReactTable from '../ReactTable/ReactTable';
import './SalesOrderDiffTable.css';

export default function DiffTable({ morningSalesOrder, eveningSalesOrder }) {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    if (eveningSalesOrder === null || morningSalesOrder === null) return;

    const { leftDate, middleDate, rightDate } = eveningSalesOrder;

    setColumns([
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Past Delivery',
        columns: [
          { Header: leftDate[0], accessor: 'threeDaysAgo' },
          { Header: middleDate[0], accessor: 'twoDaysAgo' },
          { Header: rightDate[0], accessor: 'oneDayAgo' }
        ]
      },
      { Header: 'OGC Comments', accessor: 'ogcComments' },
      { Header: 'Store Comments', accessor: 'storeComments' },
      {
        Header: 'Total Order',
        columns: [
          // Todo: Switch headers to dynamic file creation timestamps?
          { Header: 'Morning', accessor: 'morningTotal' },
          { Header: 'Evening', accessor: 'totalOrder' },
          { Header: 'Diff', accessor: 'diff' }
        ]
      }
    ]);
    const eveningData = eveningSalesOrder.salesOrder.data;
    const morningData = morningSalesOrder.salesOrder.data;

    const mergedData = eveningData.map(eveningRow => {
      let morningMatches = morningData.filter(
        ({ description }) => description === eveningRow.description
      );

      // If more than one unique 'description' match filter further using 'ogcComments'
      if (morningMatches.length > 1) {
        console.log('duplicate matches');
        for (let i = 0; i < eveningRow.ogcComments.length; i += 1) {
          morningMatches = morningMatches.filter(
            ({ ogcComments }) =>
              ogcComments.charAt(i) === eveningRow.ogcComments.charAt(i)
          );
          if (morningMatches.length < 2) break;
        }
      }
      const diff =
        eveningRow.totalOrder -
        (morningMatches[0] ? morningMatches[0].totalOrder : 0);
      const mergedRow = {
        ...eveningRow,
        ...(morningMatches[0] &&
          morningMatches[0].totalOrder && {
            morningTotal: morningMatches[0].totalOrder
          }),
        ...(!(Number.isNaN(diff) || diff === 0) && { diff })
      };
      console.log(mergedRow);
      return mergedRow;
    });

    setData(mergedData);
  }, [eveningSalesOrder, morningSalesOrder]);

  return (
    <div>
      {data && columns ? (
        <ReactTable data={data} columns={columns} />
      ) : (
        <p>Loading salesOrder...</p>
      )}
    </div>
  );
}

DiffTable.propTypes = {
  pdf: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  template: PropTypes.shape({
    options: PropTypes.object,
    captureList: PropTypes.array
  })
};

DiffTable.defaultProps = {
  template: null
};
