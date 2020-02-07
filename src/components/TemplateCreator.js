import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fillTextIntercept from '../utilities/fillTextIntercept';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfComponent = ({ file }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
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
      // convert canvas to background image to import into fabric canvas
      const bg = canvas.toDataURL('image/png');
      const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current);
      fabricCanvas.setBackgroundImage(
        bg,
        fabricCanvas.renderAll.bind(fabricCanvas)
      );
      var circle = new fabric.Circle({
        radius: 20,
        fill: 'green',
        left: 100,
        top: 100
      });
      var itext = new fabric.IText('This is a IText object', {
        left: 100,
        top: 150,
        fill: '#D81B60',
        strokeWidth: 2,
        stroke: '#880E4F'
      });
      var itextTwo = new fabric.IText('This is a IText object', {
        left: 100,
        top: 150,
        fill: '#D81B60',
        strokeWidth: 2,
        stroke: '#880E4F'
      });
      var line = new fabric.Line([20, 0, 20, viewport.height], {
        left: 100,
        top: 150,
        stroke: 'red'
      });
      var columnMarker = new fabric.Group([line, itext], {
        left: 100,
        top: 100
      });
      fabricCanvas.add(columnMarker, itextTwo);

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
      <canvas
        ref={fabricCanvasRef}
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
