export interface BillDetail {
  id: string;
  number: number;
  type: string;
  status: string;
  sponsor: string;
  isFavorite: boolean;
  title: {
    en: string;
    ga: string;
  };
}

export type BillsTableOrder = 'asc' | 'desc';
