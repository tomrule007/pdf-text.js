import React, { useState } from 'react';
// import pdfjs from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import FileInput from './FileInput';
import PDF from './components/PDF';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
function App() {
  const [invoiceFolder, setInvoiceFolder] = useState([]);
  console.log('something');
  const handleFileInputChange = e => {
    console.log('handleFileInputChange');
    setInvoiceFolder([...e.target.files]);
  };
  return (
    <div className="App">
      <FileInput onChange={handleFileInputChange}></FileInput>
      <PDF />
      <ul>
        {invoiceFolder.map(invoice => (
          <li>{invoice.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
