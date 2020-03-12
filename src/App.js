import React, { useState } from 'react';

import FileInput from './components/FileInput';
import PdfTable from './components/PdfTable';

import samplePdfTemplateRefactor from './sampleFiles/invoice.json';
import samplePdf from './data/08745695.pdf';

import TemplateCreator from './components/TemplateCreator';

function App() {
  const [templateFile, setTemplateFile] = useState(samplePdfTemplateRefactor);
  const [pdfFile, setPdfFile] = useState(samplePdf);

  const handlePdfFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      file.arrayBuffer().then(buffer => {
        setPdfFile(buffer);
      });
    } else {
      setPdfFile(null);
    }
  };
  const handleTemplateFileChange = e => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      uploadedFile.text().then(text => {
        setTemplateFile(JSON.parse(text));
      });
    } else {
      setTemplateFile(null);
    }
  };

  return (
    <div className="App">
      <FileInput
        labelText="Select a pdf file:"
        accept=".pdf"
        onChange={handlePdfFileChange}
        htmlFor="pdfInput"
      />
      <FileInput
        labelText="Select a template file:"
        accept=".json"
        onChange={handleTemplateFileChange}
        htmlFor="templateInput"
      />
      <span>
        {'Download: '}
        <a
          href={`${process.env.PUBLIC_URL}/sampleTables.pdf`}
          download="sampleTable.pdf"
        >
          sampleTable.pdf
        </a>
        {' / '}
        <a
          href={`${process.env.PUBLIC_URL}/sampleTables.json`}
          download="sampleTable.json"
        >
          sampleTable.json
        </a>
      </span>
      <PdfTable pdf={pdfFile} template={templateFile} />
      <TemplateCreator file={pdfFile} />
    </div>
  );
}

export default App;
