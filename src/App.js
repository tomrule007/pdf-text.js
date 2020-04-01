import React, { useState, useEffect } from 'react';
import pdfText from 'pdf-template-parse';
import Papa from 'papaparse';

import FileInput from './components/FileInput';
import SalesOrderDiffTable from './components/SalesOrderDiffTable/SalesOrderDiffTable';

import defaultTemplateFile from './sampleFiles/salesOrder.json';
import defaultPdfFile from './data/SalesOrder_2020324.pdf';
import eveningPdfFile from './data/SalesOrder_2020324 (1).pdf';

const parseSalesOrderCsv = file =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results, fileRef) => resolve(results, fileRef),
      error: (error, fileRef) => reject(error, fileRef)
    });
  });

const column = string => ({ Header: string, accessor: string });
const SalesOrderCsvToData = csv => {
  // Sales Oder column Headers
  const description = csv[0][0];
  const pastDelivery = csv[0][1];
  const day7 = csv[1][1];
  const day6 = csv[1][2];
  const day5 = csv[1][3];
  const day4 = csv[1][4];
  const day3 = csv[1][5];
  const day2 = csv[1][6];
  const day1 = csv[1][7];

  const ogcComments = csv[0][8];
  const groupComments = csv[0][9];
  const storeComments = csv[0][10];
  const totalOrder = csv[0][11];

  const columns = [
    column('Locked'),
    column(description),
    {
      ...column(pastDelivery),
      column: [
        column(day7),
        column(day6),
        column(day5),
        column(day4),
        column(day3),
        column(day2),
        column(day1)
      ]
    },
    column(ogcComments),
    column(groupComments),
    column(storeComments),
    column(totalOrder)
  ];

  const data = csv.slice(2).map(row => ({
    Locked: !row[11].includes('(i)'),
    [description]: row[0],
    [day7]: row[1],
    [day6]: row[2],
    [day5]: row[3],
    [day4]: row[4],
    [day3]: row[5],
    [day2]: row[6],
    [day1]: row[7],
    [ogcComments]: row[8],
    [groupComments]: row[9],
    [storeComments]: row[10],
    [totalOrder]: row[11]
  }));
  return { data, columns };
};

function App() {
  const [morningCsvData, setMorningCsvData] = useState(null);
  const [eveningCsvData, setEveningCsvData] = useState(null);

  const handleMorningCsv = e => {
    const file = e.target.files[0];
    parseSalesOrderCsv(file).then(results => {
      const data = SalesOrderCsvToData(results.data);
      console.log(data);
      setMorningCsvData(data);
    });
  };

  const handleEveningCsv = e => {
    const file = e.target.files[0];
  };

  return (
    <div className="App">
      <FileInput
        labelText="Morning Sales Order:"
        accept=".csv"
        onChange={handleMorningCsv}
        htmlFor="fileInput1"
      />
      <FileInput
        labelText="evening Sales Order:"
        accept=".csv"
        onChange={handleEveningCsv}
        htmlFor="fileInput2"
      />
      {/* <SalesOrderDiffTable
        morningSalesOrder={morningCsvData}
        eveningSalesOrder={eveningCsvData}
      /> */}
    </div>
  );
}

export default App;
