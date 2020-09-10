import React, { useState } from 'react';

import PdfData from './components/PdfData';

import defaultTemplateFile from './sampleFiles/sampleTables.json';
import defaultPdfFile from './sampleFiles/sampleTables.pdf';

function App() {
  const [templateFile, setTemplateFile] = useState(undefined);
  const [pdfFile, setPdfFile] = useState(undefined);

  const handlePdfFileChange = (e) => {
    console.log('pdf file', e.target.files[0].arrayBuffer().then(setPdfFile));
  };
  const handleTemplateFileChange = (e) => {
    console.log(
      'template file',
      e.target.files[0].text().then(setTemplateFile)
    );
  };

  const fileBoxStyle = {
    border: '2px solid black',
    borderRadius: '5px',
    boxSizing: 'border-box',
    margin: '10px',
  };
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'center',
          marginTop: '10px',
        }}
      >
        <div>
          <a
            style={{ padding: '20px' }}
            href={`${process.env.PUBLIC_URL}/pdfs/sampleTables.pdf`}
            title="demo pdf file"
            download="sampleTable.pdf"
          >
            sampleTable.pdf
          </a>
          <div style={fileBoxStyle}>
            <h3>PDF File</h3>
            <input type="file" onChange={handlePdfFileChange} accept=".pdf" />
          </div>
        </div>
        <div>
          <h2>
            PDF Template Parse <br /> Demo
          </h2>
        </div>
        <div>
          <a
            href={`${process.env.PUBLIC_URL}/templates/sampleTables.json`}
            title="demo template file"
            download="sampleTable.json"
          >
            sampleTable.json
          </a>
          <div style={fileBoxStyle}>
            <h3>Template File</h3>
            <input
              type="file"
              onChange={handleTemplateFileChange}
              accept=".json"
            />
          </div>
        </div>
      </div>
      <PdfData pdf={pdfFile} template={templateFile} />
    </div>
  );
}

export default App;
