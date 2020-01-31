import React, { useState } from 'react';

import FileInput from './FileInput';
import PdfTextViewer from './components/PdfTextViewer';
import PdfComponent from './components/PDF';

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
          <div>
            <PdfComponent file={file} />
            <li key={file.name}>
              <PdfTextViewer file={file} />
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default App;
