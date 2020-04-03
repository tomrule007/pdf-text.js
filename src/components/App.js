import React, { useState } from 'react';

import FileInput from './FileInput';
import PdfData from './PdfData';

import defaultTemplateFile from '../sampleFiles/sampleTables.json';
import defaultPdfFile from '../sampleFiles/sampleTables.pdf';

import TemplateCreator from './TemplateCreator';
import MyDropzone from './MyDropzone/MyDropzone';

function App() {
  const [templateFile, setTemplateFile] = useState(defaultTemplateFile);
  const [pdfFile, setPdfFile] = useState(defaultPdfFile);

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
          href={`${process.env.PUBLIC_URL}/pdfs/sampleTables.pdf`}
          download="sampleTable.pdf"
        >
          sampleTable.pdf
        </a>
        {' / '}
        <a
          href={`${process.env.PUBLIC_URL}/templates/sampleTables.json`}
          download="sampleTable.json"
        >
          sampleTable.json
        </a>
        {' / '}
        <a
          href={`${process.env.PUBLIC_URL}/templates/invoice.json`}
          download="invoice.json"
        >
          invoice.json
        </a>
      </span>

      <MyDropzone />
      <PdfData pdf={pdfFile} template={templateFile} />
      <TemplateCreator file={pdfFile} />
    </div>
  );
}

export default App;
