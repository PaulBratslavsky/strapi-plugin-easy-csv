import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import FromComputerForm from '../../components/FromComputerForm';
import StrapiTable from '../../components/StrapiTable';

const Wrapper = styled.div`
  width: calc(100vw - 202px);
  overflow-y: scroll;
`;

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
        setData(convertDataSet(results.data));
      }
    });
  };

  return (
    <Wrapper>
      <FromComputerForm
        onAddAssets={setFile}
        handlePreview={handlePreview}
      />
      {data && <StrapiTable data={data} />}
    </Wrapper>
  );
};

export default HomePage;



