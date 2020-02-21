import React, { useState, useEffect } from 'react';

import FileInput from './components/FileInput';
import pdfText from './utilities/pdfText';
import dataExtractor from './utilities/dataExtractor';

function App() {
  const [invoiceFolder, setInvoiceFolder] = useState([]);
  const [pdfItems, setPdfItems] = useState(null);
  useEffect(() => {
    async function fetchFileData() {
      const file = invoiceFolder[0];
      if (file === undefined) return;
      const fileData = await file.arrayBuffer();
      const items = await pdfText({ data: fileData });

      setPdfItems(items);
    }

    fetchFileData();

    return () => {};
  }, [invoiceFolder]);

  const sampleTableTemplate = {
    tables: [
      {
        name: 'table1',
        top: 60,
        left: 60,
        bottom: 300,
        right: 832,
        mergeRule: { requiredKey: 'id', direction: 'closest' }, // direction - is which way the row should merge (up, down, closest)
        columns: [
          { x: 95, name: 'ID', accessor: 'id' },
          { x: 260, name: 'Name', accessor: 'name' },
          { x: 515, name: 'Email', accessor: 'email' },
          { x: 691, name: 'Country', accessor: 'country' },
          { x: Infinity, name: 'IP-address', accessor: 'ip' }
        ]
      },
      {
        name: 'From javascript arrays',
        top: 387,
        left: 60,
        bottom: 618,
        right: 832,
        mergeRule: { requiredKey: 'id', direction: 'closest' }, // direction - is which way the row should merge (up, down, closest)
        columns: [
          { x: 100, name: 'ID', accessor: 'id' },
          { x: 180, name: 'Name', accessor: 'name' },
          { x: 470, name: 'Email', accessor: 'email' },
          { x: 670, name: 'Country', accessor: 'country' },
          { x: Infinity, name: 'IP-address', accessor: 'ip' }
        ]
      },
      {
        name: 'From HTML with CSS',
        top: 697,
        left: 60,
        bottom: 948,
        right: 832,
        mergeRule: { requiredKey: 'id', direction: 'closest' }, // direction - is which way the row should merge (up, down, closest)
        columns: [
          { x: 105, name: 'ID', accessor: 'id' },
          { x: 285, name: 'Name', accessor: 'name' },
          { x: 517, name: 'Email', accessor: 'email' },
          { x: 700, name: 'Country', accessor: 'country' },
          { x: Infinity, name: 'IP-address', accessor: 'ip' }
        ]
      }
    ]
  };
  const data = pdfItems
    ? dataExtractor(pdfItems.pages[0], sampleTableTemplate)
    : [];

  const handleFileInputChange = e => {
    setInvoiceFolder([...e.target.files]);
  };

  return (
    <div className="App">
      <FileInput onChange={handleFileInputChange} htmlFor="pdfInput" />

      <span>
        {'Download: '}
        <a
          href={`${process.env.PUBLIC_URL}/sampleTables.pdf`}
          download="sampleTable.pdf"
        >
          sampleTable.pdf
        </a>
      </span>

      {data.tables &&
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
