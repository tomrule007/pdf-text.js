import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdfText = async src => {
  console.log(src);
  const textContent = [];
  const loadingTask = pdfjs.getDocument(src);

  const pdf = await loadingTask.promise;
  console.log(pdf);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const pageTextContent = await page.getTextContent();
    // const pageJustTextArray = pageTextContent.items.map(item => item.str);
    let pageTextArray = [];
    let currentRow = [];
    let lastYcord = null;
    for (let j = 0; j < pageTextContent.items.length; j++) {
      const item = pageTextContent.items[j];
      const allowedVariance = 1;
      const y = item.transform[4];
      if (
        y === null ||
        y === lastYcord ||
        (y < lastYcord && y > lastYcord - allowedVariance) ||
        (y > lastYcord && y < lastYcord + allowedVariance)
      ) {
        currentRow.push(item.str);
      } else {
        pageTextArray.push([...currentRow]);
        currentRow = [item.str];
      }
      lastYcord = y;
    }
    textContent.push(...pageTextArray);
  }

  return textContent;
};

export default pdfText;
