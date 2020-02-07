import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fillTextIntercept from '../utilities/fillTextIntercept';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfComponent = ({ file }) => {
  const canvasRef = useRef(null);
  const [charInfo, setCharInfo] = useState([]);
  useEffect(() => {
    const fetchPdf = async () => {
      const pdfData = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({
        data: pdfData
        //  disableFontFace: true
      });

      const pdf = await loadingTask.promise;

      const firstPageNumber = 1;

      const page = await pdf.getPage(firstPageNumber);

      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const charArray = fillTextIntercept(context, true);

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      await renderTask.promise;

      setCharInfo(charArray);

      console.log(charArray);
    };

    if (file !== undefined) fetchPdf();
  }, [file]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <ul>
        {charInfo.map(char => (
          <li>{`${char.realChar} ${char.x} ${char.y}`}</li>
        ))}
      </ul>
    </>
  );
};

PdfComponent.propTypes = {
  file: PropTypes.object
};

export default PdfComponent;
