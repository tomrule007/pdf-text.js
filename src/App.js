import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FileInput from './components/FileInput';
import PdfData from './components/PdfData';

import defaultTemplateFile from './sampleFiles/sampleTables.json';
import defaultPdfFile from './sampleFiles/sampleTables.pdf';

import TemplateCreator from './components/TemplateCreator';

import { loadFiles, str2ab } from './feature/file/fileSlice';

function App() {
  const dispatch = useDispatch();
  const files = useSelector(state => state.file.files);
  const [templateFile, setTemplateFile] = useState(defaultTemplateFile);
  const [pdfFile, setPdfFile] = useState(defaultPdfFile);

  useEffect(() => {
    const buffer = files[0] ? str2ab(files[0].rawData) : null;
    setPdfFile(buffer);
  }, [files]);
  const handlePdfFileChange = e => {
    dispatch(loadFiles(e.target.files));
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

      <PdfData pdf={pdfFile} template={templateFile} />
      <TemplateCreator file={pdfFile} />
    </div>
  );
}

export default App;
