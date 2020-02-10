import React, { useState, useEffect } from 'react';

import FileInput from './components/FileInput';
import PdfTextViewer from './components/PdfTextViewer';
import PdfComponent from './components/PDF';
import pdfText from './utilities/pdfText';
import TemplateCreator from './components/TemplateCreator';

function App() {
  const [invoiceFolder, setInvoiceFolder] = useState([]);
  const [PdfTextData, setPdfTextData] = useState(null);
  useEffect(() => {
    async function fetchFileData() {
      const file = invoiceFolder[0];
      if (file === undefined) return;
      const fileData = await file.arrayBuffer();
      const text = await pdfText({ data: fileData });
      setPdfTextData(text);
    }

    fetchFileData();

    return () => {};
  }, [invoiceFolder]);
  console.log('PDF DATA', PdfTextData);
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
