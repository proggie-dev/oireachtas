import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@mui/material';
import { keyframes } from '@mui/system';
import { setActiveTab } from '../store/billsSlice';
import type { RootState } from '../store/store';
import './../styles/muiOverrides.scss';

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
  const { t } = useTranslation();
  const { activeTab } = useSelector((state: RootState) => state.bills);

  const [animate, setAnimate] = useState<boolean>(false);
  const prevFavsRef = useRef<number>(totalFavs);

  const handleChange = (_: unknown, activeIndex: number) => dispatch(setActiveTab(activeIndex));

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
          <Tab label={t('allBills')} {...tabProps(0)} className='tab' />

          <Tab
            label={
              <span>
                {t('favorites')} (
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
            className='tab'
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default ListingTabs;
