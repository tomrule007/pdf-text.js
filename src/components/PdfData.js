import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTable from './ReactTable';
import pdfTextExtractor from '../pdfTextExtractor/pdfTextExtractor';

export default function PdfTable({ pdf, template }) {
  const [pdfData, setPdfData] = useState({});
  useEffect(() => {
    if (pdf && template) pdfTextExtractor(pdf, template).then(setPdfData);
  }, [pdf, template]);

  return (
    <div>
      {Object.entries(pdfData).map(([key, value]) => (
        <div key={key}>
          <h3>{key}</h3>
          {value ? (
            <ReactTable data={value.data} columns={value.columns} />
          ) : null}
        </div>
      ))}
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
