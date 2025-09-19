import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

import { setBills, setPage, setRowsPerPage } from './../../store/billsSlice';
import TableHeader from './TableHeader';
import { getComparator } from '../../utils/helpers';
import type { AppDispatch, RootState } from './../../store/store';
import type { BillDetail, BillsTableOrder } from './../../types/Bill';
import './../../styles/Table.css';

const BillsTable = () => {
  const { bills, total, page, rowsPerPage } = useSelector((state: RootState) => state.bills);
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<BillsTableOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof BillDetail>('number');
  const [selected, setSelected] = useState<readonly number[]>([]);

  const toggleFavoriteMark = (val: number) => {
    let newArr = [...bills];
    let index = newArr.findIndex((x) => Number(x.number) === val);
    newArr[index].isFavorite = !newArr[index].isFavorite;

    dispatch(setBills(newArr));
  };

  const handleRequestSort = (_: unknown, property: keyof BillDetail) => {
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
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  dispatch(setPage(0)); // Reset page on limit change
  };

  const visibleRows = useMemo(
    () => [...bills].sort(getComparator(order, orderBy)),
    [order, orderBy, bills]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ width: '100%', mb: 2, mt: 2 }}>
        <TableContainer sx={{ background: 'none' }}>
          <Table className="bills-table" aria-labelledby="tableTitle" sx={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '12.5%' }} />
              <col style={{ width: '12.5%' }} />
              <col style={{ width: '12.5%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '12.5%' }} />
            </colgroup>
            <TableHeader
              order={order}
              orderBy={orderBy}
              rowCount={bills.length}
              className="bills-table"
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(Number(row.number));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, Number(row.number))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${row.number}-${index}`}
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
                      {row.isFavorite ? (
                        <Button
                          className="ja"
                          onClick={() => toggleFavoriteMark(Number(row.number))}
                        >
                          <FavoriteIcon />
                        </Button>
                      ) : (
                        <Button
                          className="ja"
                          onClick={() => toggleFavoriteMark(Number(row.number))}
                        >
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
          count={total}
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
