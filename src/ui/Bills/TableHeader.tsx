import * as React from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import type { BillDetail, BillsTableOrder } from './../../types/Bill';

interface HeadCell {
  id: keyof BillDetail;
  label: string;
  numeric: boolean;
}

interface BillsTableHeaderProps {
  order: BillsTableOrder;
  orderBy: string;
  rowCount: number;
  className?: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof BillDetail) => void;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'number',
    numeric: false,
    label: 'NUMBER',
  },
  {
    id: 'type',
    numeric: true,
    label: 'TYPE',
  },
  {
    id: 'status',
    numeric: true,
    label: 'STATUS',
  },
  {
    id: 'sponsor',
    numeric: true,
    label: 'SPONSOR',
  },
  {
    id: 'isFavorite',
    numeric: true,
    label: 'FAVORITE',
  },
];

const BillsTableHeader = (props: BillsTableHeaderProps) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof BillDetail) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            width={headCell.id === 'sponsor' ? '60%' : '10%'}
            align={headCell.id === 'isFavorite' ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: '#FFFFFF',
                '& .MuiTableSortLabel-icon': {
                  color: '#FFFFFF',
                },
                '&:hover': {
                  color: '#FFFFFF',
                  '& .MuiTableSortLabel-icon': {
                    color: '#FFFFFF',
                  },
                },
                '&.Mui-active': {
                  color: '#FFFFFF',
                  '& .MuiTableSortLabel-icon': {
                    color: '#FFFFFF',
                  },
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default BillsTableHeader;
