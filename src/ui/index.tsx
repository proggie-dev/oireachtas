import { Box, Grid, useMediaQuery } from '@mui/material';
import ListingTabs from './ListingTabs';

const AppContainer = () => {
  const matches = useMediaQuery('(max-width:667px)');

  return (
    <Box>
      <Grid display="flex" alignItems="center" alignContent="center" justifyContent="center">
        <Box>
          <h1 style={matches ? { fontSize: '28px', margin: 0 } : { fontSize: '38px', margin: 0 }}>
            BILLS LISTING
          </h1>

          <p style={{ margin: 0, float: 'right' }}>
            <i>by Proggie Dev 2025.</i>
          </p>
        </Box>

        <img src="shamrock.png" width={matches ? '110' : '150'} />
      </Grid>

      <ListingTabs />
    </Box>
  );
};

export default AppContainer;
