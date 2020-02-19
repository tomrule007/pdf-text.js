import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fillTextIntercept from './fillTextIntercept';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const addCanvasAndRender = page => {
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  // Prepare canvas using PDF page dimensions
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Replace context fillText method  with function to store text info on page obj.
  fillTextIntercept(context, page);

  // Render PDF page into canvas context
  const renderContext = {
    canvasContext: context,
    viewport
  };

  return new Promise(resolve => {
    page.render(renderContext).promise.then(() => {
      resolve(page);
    });
  });
};

const pdfText = async src => {
  const loadingTask = pdfjs.getDocument(src);

  const pdf = await loadingTask.promise;

  const pagesToRender = new Array(pdf.numPages).fill(null);

  const renderingPages = pagesToRender.map((_, i) =>
    pdf.getPage(i + 1).then(addCanvasAndRender)
  );

  const renderedPages = await Promise.all(renderingPages);
  const pageCharacters = renderedPages.map(page => page.chars);

  return { pages: pageCharacters, numPages: pdf.numPages };
};

export default pdfText;
