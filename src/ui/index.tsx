import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, useMediaQuery } from '@mui/material';
import type { RootState, AppDispatch } from '../store/store';
import { fetchBills } from '../store/billsSlice';
import ListingTabs from './ListingTabs';
import BillsContainer from './Bills/index';

const AppContainer = () => {
  const [totalFavsCount, setTotalFavsCount] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const matches = useMediaQuery('(max-width:667px)');
  const { bills, loading, error, page, rowsPerPage, language } = useSelector(
    (state: RootState) => state.bills
  );

  useEffect(() => {
    const favoriteCount = bills.filter((bill) => bill.isFavorite).length;
    setTotalFavsCount(favoriteCount);
  }, [bills]);

  useEffect(() => {
    const offset = page * rowsPerPage;
    const query = `?skip=${offset}&limit=${rowsPerPage}&lang=${language}`;
    dispatch(fetchBills(query));
  }, [dispatch, page, rowsPerPage, language]);

  return (
    <Box>
      <Grid display='flex' alignItems='center' alignContent='center' justifyContent='center'>
        <Box>
          <h1 style={matches ? { fontSize: '28px', margin: 0 } : { fontSize: '38px', margin: 0 }}>
            BILLS LISTING
          </h1>

          <p style={{ margin: 0, float: 'right' }}>
            <i>by Proggie Dev 2025.</i>
          </p>
        </Box>

        <img src='shamrock.png' width={matches ? '110' : '150'} />
      </Grid>

      {loading && <p>Loading bills...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          <ListingTabs totalFavs={totalFavsCount as number} />
          <BillsContainer />
        </>
      )}
    </Box>
  );
};

export default AppContainer;
