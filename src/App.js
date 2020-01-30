import React, { useState } from 'react';
import FileInput from './FileInput';
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
      <ul>
        {invoiceFolder.map(invoice => (
          <li>{invoice.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
