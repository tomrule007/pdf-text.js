import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fillTextIntercept from './fillTextIntercept';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdfText = async src => {
  const loadingTask = pdfjs.getDocument(src);

  const pdf = await loadingTask.promise;

  const data = { pages: [], numPages: pdf.numPages };

  for (let i = 1; i <= pdf.numPages; i++) {
    console.log('building page ', i);
    const page = await pdf.getPage(i);

    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    // Prepare canvas using PDF page dimensions
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Replace context fillText method and get reference to charArray.
    const charArray = fillTextIntercept(context, true);

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);

    await renderTask.promise;

    data.pages[i - 1] = charArray;
  }

  return data;
};

export default pdfText;
