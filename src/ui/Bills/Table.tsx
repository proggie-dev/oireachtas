import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleModal from '../TitleModal';

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
import type { AppDispatch, RootState } from './../../store/store';
import { useTableData } from './../../hooks/useTableData';
import type { BillTitle, BillDetail } from './../../types/Bill';
import './../../styles/Table.css';

interface BillsTableProps {
  filteredBillsByInput: BillDetail[] | null;
}

const BillsTable = ({ filteredBillsByInput }: BillsTableProps) => {
  const { activeTab, bills, total, page, rowsPerPage } = useSelector(
    (state: RootState) => state.bills
  );
  const dispatch = useDispatch<AppDispatch>();
  const [favsTotal, setFavsTotal] = useState<number>(0);
  const [title, setTitle] = useState<BillTitle | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModalVisibility = (value: boolean) => setIsOpen(value);

  const toggleFavoriteMark = (val: string) => {
    let newArr = bills.map((bill) => ({ ...bill }));
    let index = newArr.findIndex((item) => item.id === val);

    if (index !== -1) newArr[index].isFavorite = !newArr[index].isFavorite;
    dispatch(setBills(newArr));
    /* There should be a API call for updating the information on the server, but since
    it is asked to have a mocked functionality (POST is nonexistant?), we now only update
    the local state */
  };

  const filteredBills = useMemo(() => {
    if (filteredBillsByInput) return filteredBillsByInput;

    if (activeTab === 1) {
      return bills.filter((item) => item.isFavorite);
    }

    return bills;
  }, [activeTab, bills, filteredBillsByInput]);

  const {
    order,
    orderBy,
    handleRequestSort,
    sortedRows: visibleRows,
  } = useTableData(filteredBills);

  const handleClick = (_: React.MouseEvent<unknown>, title: BillTitle) => {
    setTitle({
      enTitle: title.enTitle,
      gaTitle: title.gaTitle,
    });
  };

  useEffect(() => {
    if (!title) setIsOpen(false);
    else setIsOpen(true);
  }, [title]);

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const returnTotalCount = () => {
    if (filteredBillsByInput) return filteredBillsByInput?.length;
    else if (activeTab === 0) return total;

    return favsTotal;
  };

  const returnTotalRowsPerPage = () => {
    if (filteredBillsByInput) return filteredBillsByInput?.length;
    else if (activeTab === 0) return rowsPerPage;

    return favsTotal;
  };

  useEffect(() => {
    if (activeTab === 1) {
      const favs = bills.filter((item) => item.isFavorite);
      setFavsTotal(favs.length);
    }
  }, [activeTab, bills]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ width: '100%', mb: 2, mt: 2 }}>
        <TableContainer sx={{ background: 'none' }}>
          <Table className='bills-table' aria-labelledby='tableTitle' sx={{ tableLayout: 'fixed' }}>
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
              className='bills-table'
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.title)}
                    role='checkbox'
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell id={labelId} scope='row' align='center'>
                      {row.number}
                    </TableCell>
                    <TableCell align='left'>{row.type}</TableCell>
                    <TableCell align='left'>{row.status}</TableCell>
                    <TableCell align='left'>{row.sponsor}</TableCell>
                    <TableCell align='center' onClick={(event) => event.stopPropagation()}>
                      <Button onClick={() => toggleFavoriteMark(row.id)}>
                        {row.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={returnTotalCount()}
          rowsPerPage={returnTotalRowsPerPage()}
          page={activeTab === 0 ? page : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {title && (
          <TitleModal title={title} isOpen={isOpen} toggleModalVisibility={toggleModalVisibility} />
        )}
      </Paper>
    </Box>
  );
};

export default BillsTable;
