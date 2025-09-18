import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import BillsContainer from './Bills/index';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const ListingTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#006400',
            },
          }}
        >
          <Tab
            label="All Bills"
            {...a11yProps(0)}
            sx={{
              color: '#006400',
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#006400',
                fontWeight: 'bold',
              },
            }}
          />
          <Tab
            label="Favorites (0)"
            {...a11yProps(1)}
            sx={{
              color: '#006400',
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#006400',
                fontWeight: 'bold',
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BillsContainer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BillsContainer />
      </CustomTabPanel>
    </Box>
  );
};

export default ListingTabs;
