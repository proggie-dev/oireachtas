import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { keyframes } from '@mui/system';
import type { RootState } from '../store/store';
import { setActiveTab } from '../store/billsSlice';

const tabProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

interface ListingTabsProps {
  totalFavs: number;
}

const popFade = keyframes`
  0% {
    transform: scale(1.4);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const ListingTabs = ({ totalFavs }: ListingTabsProps) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.bills.activeTab);

  const [animate, setAnimate] = useState<boolean>(false);
  const prevFavsRef = useRef<number>(totalFavs);

  const handleChange = (_: unknown, newValue: number) => dispatch(setActiveTab(newValue));

  useEffect(() => {
    if (totalFavs !== prevFavsRef.current) {
      setAnimate(true);

      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500);

      prevFavsRef.current = totalFavs;
      return () => clearTimeout(timer);
    }
  }, [totalFavs]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label='tabs'>
          <Tab
            label='All Bills'
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
            label={
              <span>
                Favorites (
                <Box
                  component='span'
                  sx={{
                    display: 'inline-block',
                    animation: animate ? `${popFade} 0.5s ease-in-out` : 'none',
                  }}
                >
                  {totalFavs}
                </Box>
                )
              </span>
            }
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
