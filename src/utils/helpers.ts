export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

export const getComparator = <T>(
  order: 'asc' | 'desc',
  orderBy: keyof T
): ((a: T, b: T) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const sanitizeInput = (val: string) => val.replace(/[^a-zA-Z)]+$/, '');
export const formatYear = (val: string) => val.slice(-4);
