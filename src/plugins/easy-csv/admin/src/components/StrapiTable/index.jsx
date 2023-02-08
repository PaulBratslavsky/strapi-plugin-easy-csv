import React from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  TFooter,
  BaseCheckbox,
  IconButton,
  Typography,
  VisuallyHidden,
  Avatar,
  Tr,
  Td,
  Th,
} from "@strapi/design-system";

import { CarretDown, Plus, Pencil, Trash } from "@strapi/icons";

export default function StrapiTable({ data }) {
  const { header, rows, rowCount, colCount } = data;

  const ROW_COUNT = rowCount;
  const COL_COUNT = colCount;

  return (
    <Box padding={8} background="neutral100">
      <Table
        colCount={COL_COUNT}
        rowCount={ROW_COUNT}
        footer={
          <TFooter icon={<CarretDown />}>
           This is the footer. Maybe you can add a button here?
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label="Select all entries" />
            </Th>
            <Th
              action={
                <IconButton label="Sort on ID" icon={<CarretDown />} noBorder />
              }
            >
              <Typography variant="sigma">ID</Typography>
            </Th>

            {header.map((heading, index) => (
              <Th key={index}>
                <Typography variant="sigma">{heading}</Typography>
              </Th>
            ))}

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={index}>
              <Td>
                <BaseCheckbox aria-label={`Select ${index}`} />
              </Td>
              <Td>
                <Typography textColor="neutral800">{index + 1}</Typography>
              </Td>
              {Object.keys(row).map((item, index) => {
                console.log(row[item]);
                return (
                  <Td>
                    <Typography textColor="neutral800">{row[item]}</Typography>
                  </Td>
                );
              })}
              <Td>
                <Flex>
                  <IconButton
                    onClick={() => console.log("edit")}
                    label="Edit"
                    noBorder
                    icon={<Pencil />}
                  />
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => console.log("delete")}
                      label="Delete"
                      noBorder
                      icon={<Trash />}
                    />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}