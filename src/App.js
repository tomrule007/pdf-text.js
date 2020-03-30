import React, { useState, useEffect } from 'react';
import pdfText from 'pdf-template-parse';

import FileInput from './components/FileInput';
import SalesOrderDiffTable from './components/SalesOrderDiffTable/SalesOrderDiffTable';

import defaultTemplateFile from './sampleFiles/salesOrder.json';
import defaultPdfFile from './data/SalesOrder_2020324.pdf';
import eveningPdfFile from './data/SalesOrder_2020324 (1).pdf';

function App() {
  const [morningPdfData, setMorningPdfData] = useState(null);
  const [eveningPdfData, setEveningPdfData] = useState(null);
  console.log(morningPdfData);
  useEffect(() => {
    pdfText(defaultPdfFile, defaultTemplateFile).then(setMorningPdfData);
    pdfText(eveningPdfFile, defaultTemplateFile).then(setEveningPdfData);
  }, []);
  const handleMorningPdf = e => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      file.arrayBuffer().then(buffer => {
        pdfText(buffer, defaultTemplateFile).then(morningPdfData);
      });
    }
  };
  const handleEveningPdf = e => {
    const file = e.target.files[0];
    if (file) {
      file.arrayBuffer().then(buffer => {
        pdfText(buffer, defaultTemplateFile).then(eveningPdfData);
      });
    }
  };

  return (
    <div className="App">
      <FileInput
        labelText="Morning Sales Order:"
        accept=".pdf"
        onChange={handleMorningPdf}
        htmlFor="pdfInput1"
      />
      <FileInput
        labelText="Confirmation Sales Order:"
        accept=".pdf"
        onChange={handleEveningPdf}
        htmlFor="pdfInput2"
      />
      <SalesOrderDiffTable
        morningSalesOrder={morningPdfData}
        eveningSalesOrder={eveningPdfData}
      />
    </div>
  );
}

export default App;
