import React, { useState } from 'react';

import FileInput from './FileInput';
import PdfTextViewer from './components/PdfTextViewer';

function App() {
  const [invoiceFolder, setInvoiceFolder] = useState([]);

  const handleFileInputChange = e => {
    setInvoiceFolder([...e.target.files]);
  };

  return (
    <div className="App">
      <FileInput onChange={handleFileInputChange}></FileInput>
      <ol>
        {invoiceFolder.map(file => (
          <li key={file.name}>
            <PdfTextViewer file={file} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
