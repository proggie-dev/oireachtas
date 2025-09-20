import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, Grid, useMediaQuery } from '@mui/material';
import i18n from 'i18next';
import type { RootState, AppDispatch } from '../store/store';
import { fetchBills, setLanguage } from '../store/billsSlice';
import ListingTabs from './ListingTabs';
import BillsContainer from './Bills/index';
import './../styles/App.css';

const AppContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const matches = useMediaQuery('(max-width:667px)');
  const { t } = useTranslation();

  const [totalFavsCount, setTotalFavsCount] = useState<number>(0);
  const { bills, loading, error, page, rowsPerPage, language } = useSelector(
    (state: RootState) => state.bills
  );

  const changeLanguage = (value: string) => dispatch(setLanguage(value));

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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
      <ButtonGroup className='languageButtons'>
        <Button
          className={`languageBtn ${language === 'en' ? 'active' : ''}`}
          variant='text'
          onClick={() => changeLanguage('en')}
        >
          English
        </Button>

        <Button
          className={`languageBtn ${language === 'ga' ? 'active' : ''}`}
          variant='text'
          onClick={() => changeLanguage('ga')}
        >
          Gaeilge
        </Button>
      </ButtonGroup>

      <Grid display='flex' alignItems='center' alignContent='center' justifyContent='center'>
        <Box>
          <h1 className='no-margin' style={matches ? { fontSize: '28px' } : { fontSize: '38px' }}>
            {t('appTitle')}
          </h1>

          <p className='copyright-info-text'>
            <i>{t('by')} Proggie Dev 2025.</i>
          </p>
        </Box>

        <img src='shamrock.png' width={matches ? '110' : '150'} />
      </Grid>

      {loading && <p>{t('loadingBills')}...</p>}

      {error && (
        <p>
          {t('loadingBills')}: {error}
        </p>
      )}

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
