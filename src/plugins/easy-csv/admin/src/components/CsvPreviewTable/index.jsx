import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  text-align: left;
`;

const THead = styled.thead`
  background-color: lightgray;
`;

const TH = styled.th`
  padding: 8px;
  border: 1px solid black;
`;

const TBody = styled.tbody`
  background-color: white;
`;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: lightgray;
  }
`;

const TD = styled.td`
  padding: 8px;
  border: 1px solid black;
`;

export default function CSVPreviewTable({ data }) {
  const { header, rows } = data;
  return (
    <TableWrapper>
      <Table>
        <THead>
          <TR>
            {header.map((h, i) => (
              <TH key={i}>{h}</TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {rows.map((row, i) => (
            <TR key={i}>
              {Object.values(row).map((value, j) => (
                <TD key={j}>{value}</TD>
              ))}
            </TR>
          ))}
        </TBody>
      </Table>
    </TableWrapper>
  );
}
