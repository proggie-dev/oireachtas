import * as React from 'react';
import './BillsTable.css';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';

import { getComparator } from '../tableHelpers';
import { testData } from '../testData';

//Table data interfaces, lines: 20-42
type Order = 'asc' | 'desc';

interface Data {
  id: number;
  number: string;
  type: string;
  status: string;
  sponsor: string;
  isFavourite: boolean;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  className?: string;
}
//END

const rows = [...testData];
const headCells: readonly HeadCell[] = [
  {
    id: 'number',
    numeric: false,
    label: 'NUMBER',
  },
  {
    id: 'type',
    numeric: true,
    label: 'TYPE',
  },
  {
    id: 'status',
    numeric: true,
    label: 'STATUS',
  },
  {
    id: 'sponsor',
    numeric: true,
    label: 'SPONSOR',
  },
  {
    id: 'isFavourite',
    numeric: true,
    label: 'FAVORITE',
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'isFavourite' ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className="XXX"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: '#FFFFFF', // Label text color
                '& .MuiTableSortLabel-icon': {
                  //opacity: 1,           // Always visible
                  color: '#FFFFFF', // Always white
                },
                '&:hover': {
                  color: '#FFFFFF',
                  '& .MuiTableSortLabel-icon': {
                    color: '#FFFFFF',
                  },
                },
                '&.Mui-active': {
                  color: '#FFFFFF',
                  '& .MuiTableSortLabel-icon': {
                    color: '#FFFFFF',
                  },
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const BillsTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('number');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (_: unknown, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ width: '100%', mb: 2, mt: 2 }}>
        <TableContainer sx={{ background: 'none' }}>
          <Table className="bills-table" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              className="bills-table"
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={false}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell id={labelId} scope="row" align="left">
                      {row.number}
                    </TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.sponsor}</TableCell>
                    <TableCell align="center">
                      {row.isFavourite ? (
                        <Button className="ja">
                          <FavoriteIcon />
                        </Button>
                      ) : (
                        <Button className="ja">
                          <FavoriteBorderIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default BillsTable;
