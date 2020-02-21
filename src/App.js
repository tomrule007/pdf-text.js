import React, { useState } from 'react';

import FileInput from './components/FileInput';
import pdfText from './utilities/pdfText';
import dataExtractor from './utilities/dataExtractor';

function App() {
  const [template, setTemplate] = useState(null);
  const [pdfItems, setPdfItems] = useState(null);

  const data =
    pdfItems && template ? dataExtractor(pdfItems.pages[0], template) : [];

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    if (file) {
      file.arrayBuffer().then(buffer => {
        pdfText({ data: buffer }).then(items => {
          setPdfItems(items);
        });
      });
    } else {
      setPdfItems(null);
    }
  };

  const handleTemplateFileChange = e => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      uploadedFile.text().then(text => {
        setTemplate(JSON.parse(text));
      });
    } else {
      setTemplate(null);
    }
  };

  return (
    <div className="App">
      <FileInput
        labelText="Select a pdf file:"
        accept=".pdf"
        onChange={handleFileInputChange}
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
          href={`${process.env.PUBLIC_URL}/sampleTables.pdf`}
          download="sampleTable.pdf"
        >
          sampleTable.pdf
        </a>
        {' / '}
        <a
          href={`${process.env.PUBLIC_URL}/sampleTables.json`}
          download="sampleTable.json"
        >
          sampleTable.json
        </a>
      </span>

      {data &&
        data.tables &&
        data.tables.map(table => (
          <div key={table.name}>
            <h3>{table.name}</h3>
            <table
              style={{
                border: '1px solid black',
                'border-collapse': 'collapse'
              }}
            >
              <tbody>
                {table.rows.map(row => (
                  <tr style={{ border: '1px solid black' }}>
                    {Object.entries(row).map(
                      ([k, v]) =>
                        k !== 'y' && (
                          <td style={{ border: '1px solid black' }}>
                            {v.join('')}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}

export default App;
