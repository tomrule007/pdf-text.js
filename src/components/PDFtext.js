import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfComponent = ({ src }) => {
  const [text, setText] = useState([]);

  useEffect(() => {
    const fetchPdfText = async () => {
      const textContent = [];
      const loadingTask = pdfjs.getDocument(src);

      const pdf = await loadingTask.promise;
      console.log(pdf.numPages);

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const pageTextContent = await page.getTextContent();
        const pageJustTextArray = pageTextContent.items.map(item => item.str);
        //console.log(pageJustTextArray);
        textContent.push(...pageJustTextArray);
      }
      //console.log('test', textContent);
      setText(textContent);
    };

    fetchPdfText();
  }, [src]);

  return (
    <div>
      <ul>
        {text.map(str => (
          <li>{str}</li>
        ))}
      </ul>
    </div>
  );
};

PdfComponent.propTypes = {
  src: PropTypes.string
};

PdfComponent.defaultProps = {
  src: `${process.env.PUBLIC_URL}/helloworld.pdf`
};

export default PdfComponent;
