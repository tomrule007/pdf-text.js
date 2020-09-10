import React, { useState } from 'react';
import PdfData from './components/PdfData';

function App() {
  const [templateFile, setTemplateFile] = useState(undefined);
  const [pdfFile, setPdfFile] = useState(undefined);

  const handlePdfFileChange = (e) =>
    e.target.files[0].arrayBuffer().then(setPdfFile);
  const handleTemplateFileChange = (e) =>
    e.target.files[0]
      .text()
      .then(JSON.parse)
      .then(setTemplateFile);

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
            href={`${process.env.PUBLIC_URL}/pdfs/helloWorldDemo.pdf`}
            title="demo pdf file"
            download="helloWorldDemo.pdf"
          >
            helloWorldDemo.pdf
          </a>
          <a
            href={`${process.env.PUBLIC_URL}/pdfs/tableDemo.pdf`}
            title="demo pdf file"
            download="tableDemo.pdf"
          >
            tableDemo.pdf
          </a>
          <div style={fileBoxStyle}>
            <h3>PDF File</h3>
            <input type="file" onChange={handlePdfFileChange} accept=".pdf" />
          </div>
        </div>
        <div>
          <h1>
            PDF Template Parse <br /> Demo
          </h1>
        </div>
        <div>
          <a
            href={`${process.env.PUBLIC_URL}/templates/helloWorldDemo.json`}
            title="demo template file"
            download="helloWorldDemo.json"
          >
            helloWorldDemo.json
          </a>
          <a
            href={`${process.env.PUBLIC_URL}/templates/tableDemo.json`}
            title="demo template file"
            download="tableDemo.json"
          >
            tableDemo.json
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
