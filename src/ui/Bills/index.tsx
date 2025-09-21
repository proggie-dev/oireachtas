import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { RootState } from './../../store/store';
import { useFilteredBills } from './../../hooks/useFilteredBills';
import { useDebounce } from './../../hooks/useDebounce';
import BillsTable from './Table';
import './../../styles/muiOverrides.scss';

const BillsContainer = () => {
  const { activeTab, bills } = useSelector((state: RootState) => state.bills);
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 300);
  const filteredBillsByInput = useFilteredBills({
    bills,
    value: debouncedValue,
    activeTab,
  });

  const handleClear = () => setValue('');

  return (
    <>
      <Grid display='flex' justifyContent='flex-end' mt={4} mb={4}>
        <TextField
          id='basic-input'
          className='text-input'
          label={t('filterBySponsor')}
          variant='outlined'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            endAdornment: value && (
              <InputAdornment position='end'>
                <IconButton onClick={handleClear} edge='end'>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <BillsTable filteredBillsByInput={filteredBillsByInput} />
    </>
  );
};

export default BillsContainer;
