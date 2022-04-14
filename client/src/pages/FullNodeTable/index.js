import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useExpanded } from 'react-table';
import Table from '../../components/Table';

const data = [
  {
    firstName: 'New 123',
    lastName: 'data 123',
  },
  {
    firstName: 'New 456',
    lastName: 'data 456',
  },
];

// This could be inlined into SubRowAsync, this this lets you reuse it across tables

const SubRows = ({ row, rowProps, visibleColumns, data, loading }) => {
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  // error handling here

  return (
    <>
      {data.map((x, i) => {
        return (
          <tr {...rowProps} key={`${rowProps.key}-expanded-${i}`}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

// API CALL TO SUB TABLE
const SubRowAsync = ({ row, rowProps, visibleColumns }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        {
          firstName: 'Ram',
          lastName: 'Sam',
        },
        {
          firstName: 'Kan',
          lastName: 'Ban',
        },
      ]);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SubRows
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      data={data}
      loading={loading}
    />
  );
};

const FullNodeTable = () => {
  const columns = useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '↓' : ' →'}
          </span>
        ),
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null, // No expander on an expanded row
      },
      //Column Name
      {
        Header: 'First Name',
        // We re-map data using accessor functions for subRows
        accessor: (d) => d.firstName,
        // We can render something different for subRows
        SubCell: (cellProps) => <>{cellProps.value}</>,
      },
      {
        Header: 'Last Name',
        accessor: (d) => d.lastName,
      },
    ],
    [],
  );

  // const data = React.useMemo(() => makeData(2), []);

  // Create a function that will render our row sub components
  const renderRowSubComponent = useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
      />
    ),
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
      expand={useExpanded}
    />
  );
};

export default FullNodeTable;
