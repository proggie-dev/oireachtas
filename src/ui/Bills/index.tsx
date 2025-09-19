import { Grid, TextField, useMediaQuery } from '@mui/material';
import BillsTable from './Table';

const BillsContainer = () => {
  const matches = useMediaQuery('(max-width:667px)');

  return (
    <>
      <Grid display="flex" justifyContent="flex-end" mt={4} mb={4}>
        <TextField
          id="basic-input"
          label="Filter by bill type..."
          variant="outlined"
          sx={{
            width: matches ? '100%' : '40%',
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

      <BillsTable />
    </>
  );
};

export default BillsContainer;
