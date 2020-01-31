import React, { useEffect, useState } from 'react';
import pdfText from '../utilities/pdfText';
export default function PdfTextViewer({ file }) {
  const [fileText, setFileText] = useState(['loading...']);
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
      <ul>
        {fileText.map(text => (
          <li>{text}</li>
        ))}
      </ul>
    </div>
  );
}
