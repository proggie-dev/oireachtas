import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './../store/store';
import type { BillTitle } from '../types/Bill';
import { sanitizeInput, formatYear } from '../utils/helpers';
import './../styles/muiOverrides.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TitleContentProps {
  title: BillTitle;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const TitleContent = ({ title }: TitleContentProps) => {
  const { language } = useSelector((state: RootState) => state.bills);
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (_: unknown, newValue: number) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <Tabs
          sx={{}}
          value={value}
          onChange={handleChange}
          aria-label='title tabs'
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <Tab
            className='tab'
            label={language === 'en' ? 'ENGLISH' : 'GAEILGE'}
            {...a11yProps(0)}
          />
          <Tab
            className='tab'
            label={language === 'en' ? 'GAEILGE' : 'ENGLISH'}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box>
          <i>{t('billName')}:</i>

          <br />

          <blockquote style={{ margin: '10px' }}>
            <b>{language === 'en' ? sanitizeInput(title.enTitle) : sanitizeInput(title.gaTitle)}</b>
          </blockquote>
        </Box>

        <Box>
          <i>{t('billYear')}:</i>

          <br />

          <blockquote style={{ margin: '10px' }}>
            <b>{language === 'en' ? formatYear(title.enTitle) : formatYear(title.gaTitle)}</b>
          </blockquote>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box>
          <i>{t('billName')}:</i>

          <br />

          <blockquote style={{ margin: '10px' }}>
            <b>{language === 'en' ? sanitizeInput(title.gaTitle) : sanitizeInput(title.enTitle)}</b>
          </blockquote>
        </Box>

        <Box>
          <i>{t('billYear')}:</i>

          <br />

          <blockquote style={{ margin: '10px' }}>
            <b>{language === 'en' ? formatYear(title.gaTitle) : formatYear(title.enTitle)}</b>
          </blockquote>
        </Box>
      </CustomTabPanel>
    </Box>
  );
};

export default TitleContent;
