import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pdfText from 'pdf-template-parse';
import ReactTable from './ReactTable/ReactTable';
import './PdfData.css';

export default function PdfTable({ pdf, template }) {
  const [pdfData, setPdfData] = useState({});
  useEffect(() => {
    if (pdf && template) pdfText(pdf, template).then(setPdfData);
  }, [pdf, template]);

  return (
    <div>
      <h2>Parsed Values:</h2>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(pdfData).map(([key, value]) => (
            <tr key={key}>
              <td>{value && value.columns ? 'table' : 'value'}</td>
              <td>{key}</td>

              {value && value.columns ? (
                <td>
                  <ReactTable data={value.data} columns={value.columns} />
                </td>
              ) : (
                <td>{`[ ${value.map(item => `"${item}"`).join(' , ')} ]`}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PdfTable.propTypes = {
  pdf: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  template: PropTypes.shape({
    options: PropTypes.object,
    captureList: PropTypes.array
  })
};

PdfTable.defaultProps = {
  template: null
};
