import { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { KTCardBody } from "../../../_metronic/helpers";
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface TableProps<T extends object> {
  columns: any;
  data: T[];
  isLoading: boolean;
}

function TableBody<T extends object>({
  columns,
  data,
  isLoading,
}: TableProps<T>) {
  const tableInstance = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }: any) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }: any) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <KTCardBody>
      <Box className="table-responsive">
        <Table
          {...getTableProps()}
          style={{
            borderCollapse: "unset",
            borderSpacing: "0 16px",
            borderColor: "black",
          }}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                <Flex
                  alignItems="center"
                  height="48px"
                  borderRadius="md"
                  overflow="hidden"
                  background="#FaFaFa"
                  borderColor="#F2F2F2"
                >
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      width={index !== 0 ? `${100 / columns?.length}%` : "20px"}
                      border="none"
                      textTransform="capitalize"
                      textColor="dark"
                      fontSize="14px"
                      fontWeight="medium"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Flex>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="d-flex justify-content-center my-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    <Flex
                      alignItems="center"
                      borderRadius="md"
                      overflow="hidden"
                      cursor="pointer"
                      _hover={{
                        background: "#fafafa",
                      }}
                      border="1px"
                      borderColor="#F2f2f2"
                      height="60px"
                    >
                      {row.cells.map((cell, index) => (
                        <Td
                          border="none"
                          width={
                            index !== 0 ? `${100 / columns?.length}%` : "20px"
                          }
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </Td>
                      ))}
                    </Flex>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </Box>
    </KTCardBody>
  );
}

export function ReusableTable<T extends object>({
  columns,
  data,
  isLoading,
}: TableProps<T>) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  return (
    <TableBody
      isLoading={isLoading}
      columns={memoizedColumns}
      data={memoizedData}
    />
  );
}

export default ReusableTable;
