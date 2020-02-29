import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactTable from './ReactTable';
import dataExtractor from '../utilities/dataExtractor';
import './PdfTable.css';

export default function PdfTable({ items, template }) {
  const data = useMemo(() => {
    if (!items || !template) return {};
    return dataExtractor(items.pages[0], template);
  }, [items, template]);

  return (
    <div>
      {data.tables &&
        data.tables.map(table => (
          <div key={table.name}>
            <h3>{table.name}</h3>
            <ReactTable data={table.rows} columns={table.columns} />
          </div>
        ))}
    </div>
  );
}

PdfTable.propTypes = {
  items: PropTypes.shape({
    pages: PropTypes.array.isRequired
  }),
  template: PropTypes.shape({
    tables: PropTypes.array
  })
};

PdfTable.defaultProps = {
  items: null,
  template: null
};
