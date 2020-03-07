import React, { useState, useEffect } from 'react';

import FileInput from './components/FileInput';
import pdfText from './pdfTextExtractor/pdfText';
import PdfTable from './components/PdfTable';
import pdfTextExtractor from './pdfTextExtractor/pdfTextExtractor';

import samplePdfTemplate from './sampleFiles/sampleTables.json';
import samplePdfTemplateRefactor from './sampleFiles/sampleTablesRefactor.json';

import samplePdf from './sampleFiles/sampleTables.pdf';
import TemplateCreator from './components/TemplateCreator';

function App() {
  const [template, setTemplate] = useState(samplePdfTemplate);
  const [templateFile, setTemplateFile] = useState(
    JSON.stringify(samplePdfTemplateRefactor)
  );
  const [pdfFile, setPdfFile] = useState(samplePdf);
  const [pdfItems, setPdfItems] = useState(null);

  useEffect(() => {
    if (pdfFile === null) {
      setPdfItems(null);
    } else {
      pdfText(pdfFile).then(items => {
        setPdfItems(items);
      });
    }
  }, [template, pdfFile]);

  console.log('pdfTextExtractor', pdfTextExtractor(pdfFile, templateFile));
  const handleFileInputChange = e => {
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
        setTemplate(JSON.parse(text));
        setTemplateFile(text);
      });
    } else {
      setTemplate(null);
    }
  };

  return (
    <div className="App">
      <FileInput
        labelText="Select a pdf file:"
        accept=".pdf"
        onChange={handleFileInputChange}
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
      <PdfTable items={pdfItems} template={template} />
      <TemplateCreator file={pdfFile} chars={pdfItems} />
    </div>
  );
}

export default App;
