export interface BillTitle {
  enTitle: string;
  gaTitle: string;
}

export interface BillDetail {
  id: string;
  number: number;
  type: string;
  status: string;
  sponsor: string;
  isFavorite: boolean;
  title: BillTitle;
}

export type BillsTableOrder = 'asc' | 'desc';
