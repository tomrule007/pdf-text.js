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
      function replace(ctx, key) {
        var val = ctx[key];
        if (typeof val == 'function') {
          ctx[key] = function() {
            var args = Array.prototype.slice.call(arguments);
            const CHAR_CODE_OFFSET = 57344;
            if (key === 'fillText') {
              // args[0] = 'A';
              console.log(
                `character: ${args[0]}, charCodeAt: ${args[0].charCodeAt(
                  0
                )}x: ${args[1]}, y: ${args[2]}, realChar: ${String.fromCharCode(
                  args[0].charCodeAt(0) - CHAR_CODE_OFFSET
                )}, mesaure: ${ctx.measureText(args[0]).width} mesaureOffset: ${
                  ctx.measureText(
                    String.fromCharCode(
                      args[0].charCodeAt(0) - CHAR_CODE_OFFSET
                    )
                  ).width
                } next X = ${args[1] +
                  ctx.measureText(args[0]).width} offsetCharNextX = ${args[1] +
                  ctx.measureText(
                    String.fromCharCode(
                      args[0].charCodeAt(0) - CHAR_CODE_OFFSET
                    )
                  ).width} TRANSFORM: ${ctx.getTransform()}`
              );
            } else {
              console.log(`${key}(${args})`);
            }
            return val.apply(ctx, args);
          };
        }
      }

      for (var k in context) {
        replace(context, k);
      }
      //END: : garysieling.com

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      await renderTask.promise;

      const convertToCanvasCoords = (scale, [x, y, width, height]) => {
        return [x * scale, (y - height) * scale, width * scale, height * scale];
      };

      const pageTextContent = await page.getTextContent({
        disableCombineTextItems: false
      });
      console.log(pageTextContent);
      const START_ITEM = 0;
      const END_ITEM = 100;
      for (let i = START_ITEM; i < END_ITEM; i++) {
        const item = pageTextContent.items[i];
        console.log(item);
        const { width, height } = item;
        const y = item.transform[4];
        const x = item.transform[5];
        context.strokeRect(
          ...convertToCanvasCoords(scale, [x, y, width, height])
        );
      }
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
