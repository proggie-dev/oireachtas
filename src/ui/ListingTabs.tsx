import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { setActiveTab } from '../store/billsSlice';
import type { RootState } from '../store/store';

const tabProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

interface ListingTabsProps {
  totalFavs: number;
}

const ListingTabs = ({ totalFavs }: ListingTabsProps) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.bills.activeTab);

  const handleChange = (_: unknown, newValue: number) => {
    dispatch(setActiveTab(newValue));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
          <Tab
            label="All Bills"
            {...tabProps(0)}
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
            label={`Favorites (${totalFavs})`}
            {...tabProps(1)}
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
    </Box>
  );
};

export default ListingTabs;
