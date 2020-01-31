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
    const pageJustTextArray = pageTextContent.items.map(item => item.str);
    textContent.push(...pageJustTextArray);
  }

  return textContent;
};

export default pdfText;
