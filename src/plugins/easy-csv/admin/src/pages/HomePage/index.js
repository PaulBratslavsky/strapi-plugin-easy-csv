/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Box } from '@strapi/design-system/Box';
import { FromComputerForm } from '../../components/FromComputerForm';
import CSVPreviewTable from '../../components/CsvPreviewTable';
// import pluginId from '../../pluginId';

const dataSet = [
  { "Username": 'booker12', "Identifier": '9012', "One-time password": '12se74', "Recovery code": 'rb9012', "First name": 'Rachel' },
  { "Username": 'grey07', "Identifier": '2070', "One-time password": '04ap67', "Recovery code": 'lg2070', "First name": 'Laura' },
  { "Username": 'johnson81', "Identifier": '4081', "One-time password": '30no86', "Recovery code": 'cj4081', "First name": 'Craig' },
  { "Username": 'jenkins46', "Identifier": '9346', "One-time password": '14ju73', "Recovery code": 'mj9346', "First name": 'Mary' },
  { "Username": 'smith79', "Identifier": '5079', "One-time password": '09ja61', "Recovery code": 'js5079', "First name": 'Jamie' },
];

const modifyString = (str) => {
  return str.split(' ')
    .map((word, index) => {
      return word.split(/[^a-zA-Z]/)
        .map((w, i) => {
          if (i === 0 && index === 0) {
            return w.toLowerCase();
          } else if (i === 0) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
          } else {
            return w.toLowerCase();
          }
        })
        .join('');
    })
    .join('');
};

const convertDataSet = (dataSet) => {
  const header = Object.keys(dataSet[0]).map((key) => {
    return modifyString(key);
  });

  const rows = dataSet.reduce((acc, currentValue) => {
    const row = {};
    Object.keys(currentValue).forEach((key, index) => {
      const headerKey = header[index];
      row[headerKey] = currentValue[key];
    });
    acc.push(row);
    return acc;
  }, []);

  return {
    header,
    rows,
    rowCount: rows.length,
    colCount: header.length,
  };
};

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (file) handlePreview(file.rawFile);
  }, [file]);

  const handlePreview = (file) => {
    console.log('handlePreview', file);
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        console.log(results.data);
        console.log(convertDataSet(results.data));

        setData(convertDataSet(results.data));
      }
    });
  };

  return (
    <><Box padding={8} shadow="filterShadow" background="neutral100">
      <FromComputerForm
        onAddAssets={setFile}
        handlePreview={handlePreview} />
    </Box>
      <Box padding={8} shadow="filterShadow" background="neutral100">
        {data && <CSVPreviewTable data={data} />}
      </Box>
    </>
  );
};

export default HomePage;



