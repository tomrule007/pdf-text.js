import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTable from './ReactTable';
import pdfTextExtractor from '../pdfTextExtractor/pdfTextExtractor';
import './PdfTable.css';

export default function PdfTable({ pdf, template }) {
  const [pdfData, setPdfData] = useState({});
  useEffect(() => {
    if (pdf && template) pdfTextExtractor(pdf, template).then(setPdfData);
  }, [pdf, template]);

  const { invoice } = pdfData;

  if (!invoice) return null;

  return (
    <>
      <h3>Invoice</h3>
      <ReactTable data={invoice.data} columns={invoice.columns} />
    </>
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
