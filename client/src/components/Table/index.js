import React from 'react';
import { useTable } from 'react-table';
import Classes from './Table.module.css';

// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
const Table = ({
  columns: userColumns,
  data,
  renderRowSubComponent,
  expand = false,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    expand, // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <>
      <table {...getTableProps()} className={Classes.mainTable}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              // Use a Fragment here so the table markup is still valid
              <React.Fragment key={rowProps.key}>
                <tr {...rowProps}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {/* We could pass anything into this */}
                {row.isExpanded &&
                  renderRowSubComponent({ row, rowProps, visibleColumns })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
