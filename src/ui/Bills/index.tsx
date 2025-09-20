import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, InputAdornment, TextField, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { RootState } from './../../store/store';
import { useFilteredBills } from './../../hooks/useFilteredBills';
import { useDebounce } from './../../hooks/useDebounce';
import BillsTable from './Table';

const BillsContainer = () => {
  const matches = useMediaQuery('(max-width:667px)');
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
          sx={{
            width: matches ? '100%' : '30%',
            '& label': {
              color: '#006400',
            },
            '& label.Mui-focused': {
              color: '#006400',
            },
            '& label.MuiInputLabel-shrink': {
              color: '#006400',
            },
            '&:hover label': {
              color: '#006400',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#006400',
              },
              '&:hover fieldset': {
                borderColor: '#006400',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#006400',
              },
            },
          }}
        />
      </Grid>

      <BillsTable filteredBillsByInput={filteredBillsByInput} />
    </>
  );
};

export default BillsContainer;
