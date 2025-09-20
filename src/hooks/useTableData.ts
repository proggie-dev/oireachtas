import { useMemo, useState } from 'react';
import { getComparator } from '../utils/helpers';
import type { BillDetail, BillsTableOrder } from '../types/Bill';

export const useTableData = (rows: BillDetail[]) => {
  const [order, setOrder] = useState<BillsTableOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof BillDetail>('number');

  const handleRequestSort = (_: unknown, property: keyof BillDetail) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  return {
    order,
    orderBy,
    handleRequestSort,
    sortedRows,
  };
};
