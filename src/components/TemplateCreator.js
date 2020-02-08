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
  const [tableCords, setTableCords] = useState(null);
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
      const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current, {
        width: viewport.width,
        height: viewport.height
      });
      fabricCanvas.setBackgroundImage(
        bg,
        fabricCanvas.renderAll.bind(fabricCanvas)
      );
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        strokeWidth: 3,
        stroke: 'red',
        fill: 'rgba(0,0,0,0)',
        strokeUniform: true,
        width: 200,
        height: 200
      });
      fabricCanvas.add(rect);
      fabricCanvas.on('object:modified', e => {
        var o = e.target;
        //   console.log(o.aCoords);
        setTableCords(o.aCoords);
      });
      // console.log(charArray);
    };

    if (file !== undefined) fetchPdf();
  }, [file]);

  const tableChars = charInfo.filter(char => {
    const isInbounds =
      tableCords &&
      char.y >= tableCords.tl.y &&
      char.y <= tableCords.bl.y &&
      char.x <= tableCords.tr.x &&
      char.x >= tableCords.tl.x;
    // console.log(char.y, isInbounds);
    return isInbounds;
  });
  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'none' }}
      />
      <canvas ref={fabricCanvasRef} width={500} height={500} />
      <p>
        Total Chars: {charInfo.length} Table Chars: {tableChars.length}
      </p>
      <p>table boundaries: {JSON.stringify(tableCords)}</p>
      <ul>
        {tableChars.map(char => (
          <li>{`${char.realChar} (x: ${char.x.toFixed(2)} y: ${char.y.toFixed(
            2
          )})`}</li>
        ))}
      </ul>
    </>
  );
};

PdfComponent.propTypes = {
  file: PropTypes.object
};

export default PdfComponent;
