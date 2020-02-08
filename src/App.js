import React, { useState } from 'react';

import FileInput from './components/FileInput';
import PdfTextViewer from './components/PdfTextViewer';
import PdfComponent from './components/PDF';
import TemplateCreator from './components/TemplateCreator';

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
            <TemplateCreator file={file} />
          </div>
        ))}
      </ol>
    </div>
  );
}

export default App;
