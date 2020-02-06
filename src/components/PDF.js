import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfComponent = ({ file }) => {
  const canvasRef = useRef(null);

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

      //START: garysieling.com
      const convertToCanvasCoords = (scale, [x, y, width, height]) => [
        x * scale,
        (y - height) * scale,
        width * scale,
        height * scale
      ];

      const CHAR_CODE_OFFSET = 57344;
      var chars = [];
      var cur = {};

      function replace(ctx, key) {
        var val = ctx[key];
        if (typeof val == 'function') {
          ctx[key] = function() {
            var args = Array.prototype.slice.call(arguments);

            var c = args[0];
            cur.c = c;
            cur.code = c.charCodeAt(0);
            cur.realChar = String.fromCharCode(cur.code - CHAR_CODE_OFFSET);
            cur.width = ctx.measureText(c).width;
            cur.height = cur.width; // Temporary solution is to draw a square box (height = width) since I don't know how to get real height.
            cur.x = args[1];
            cur.y = args[2];
            chars[chars.length] = cur;

            // context.save();
            context.strokeRect(
              ...convertToCanvasCoords(1, [cur.x, cur.y, cur.width, cur.height])
            );
            // context.restore();
            // console.log(chars);
            cur = {};

            return val.apply(ctx, args);
          };
        }
      }

      replace(context, 'fillText');
      //END: : garysieling.com

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      await renderTask.promise;
    };

    if (file !== undefined) fetchPdf();
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

PdfComponent.propTypes = {
  file: PropTypes.object
};

export default PdfComponent;
