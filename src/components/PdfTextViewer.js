import React, { useEffect, useState } from 'react';
import pdfText from '../utilities/pdfText';
export default function PdfTextViewer({ file }) {
  const [fileText, setFileText] = useState([['loading...']]);
  useEffect(() => {
    const fetchPdfText = async () => {
      const data = await file.arrayBuffer();
      const textArray = await pdfText(data);
      setFileText(textArray);
    };

    if (file !== undefined) {
      fetchPdfText();
    }
  }, [file]);
  return (
    <div>
      <h2>{file.name}</h2>
      <table
        style={{ border: '1px solid black', 'border-collapse': 'collapse' }}
      >
        {fileText.map(row => (
          <tr style={{ border: '1px solid black' }}>
            {row.map(cell => (
              <td style={{ border: '1px solid black' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
