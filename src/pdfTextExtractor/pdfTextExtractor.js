import getPdfText from './pdfText';
import isValidTemplate from './templateValidator';
import dataExtractor from './dataExtractor';

const createRows = chars => {
  const rows = chars.reduce((acc, char) => {
    acc[char.y] = acc[char.y] === undefined ? [char] : [...acc[char.y], char];
    return acc;
  }, {});

  return Object.entries(rows).sort((a, b) => a[0] - b[0]);
};
export default async function pdfTextExtractor(src, template) {
  if (!isValidTemplate(template)) throw new Error('invalid template');
  const templateObject = JSON.parse(template);
  console.log({ template });
  const pdf = await getPdfText(src, templateObject.charCodeOffset);

  const pagesOfData = pdf.pages.map((pageOfChars, i) =>
    dataExtractor(pageOfChars, templateObject)
  );
  console.log({ pagesOfData });
  // const pagesOfRows = pagesOfChars.map(createRows);
}
