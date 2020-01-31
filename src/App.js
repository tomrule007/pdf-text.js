import React, { useState } from 'react';

import FileInput from './FileInput';
import PDF from './components/PDF';
function App() {
  const helloWorld = `${process.env.PUBLIC_URL}/helloworld.pdf`;

  const [invoiceFolder, setInvoiceFolder] = useState([helloWorld]);

  const handleFileInputChange = e => {
    e.target.files[0].arrayBuffer().then(data => {
      console.log(data);
      setInvoiceFolder([{ data }]);
    });
  };

  return (
    <div className="App">
      <FileInput onChange={handleFileInputChange}></FileInput>
      <PDF src={invoiceFolder[0]} />
      <ul>
        {invoiceFolder.map(invoice => (
          <li>{invoice.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
