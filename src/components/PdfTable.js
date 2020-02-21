import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dataExtractor from '../utilities/dataExtractor';
import './PdfTable.css';

export default function PdfTable({ items, template }) {
  const [data, setData] = useState({});
  useEffect(() => {
    if (items && template) {
      setData(dataExtractor(items.pages[0], template));
    } else {
      setData({});
    }
  }, [items, template]);

  return (
    <div>
      {data.tables &&
        data.tables.map(table => (
          <div key={table.name}>
            <h3>{table.name}</h3>
            <table>
              <tbody>
                {table.rows.map(row => (
                  <tr>
                    {Object.entries(row).map(
                      ([k, v]) => k !== 'y' && <td>{v.join('')}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
