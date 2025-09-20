import { useEffect, useState } from 'react';
import type { BillDetail } from './../types/Bill';

interface UseFilteredBillsProps {
  bills: BillDetail[];
  value: string;
  activeTab: number;
}

export const useFilteredBills = ({ bills, value, activeTab }: UseFilteredBillsProps) => {
  const [filtered, setFiltered] = useState<BillDetail[] | null>(null);

  useEffect(() => {
    if (!value) {
      setFiltered(null);
      return;
    }

    const searchTerm = value.toLowerCase();
    const filteredBySponsor = bills.filter((item) =>
      item.sponsor.toLowerCase().includes(searchTerm)
    );

    if (activeTab === 0) {
      setFiltered(filteredBySponsor);
    } else if (activeTab === 1) {
      const filteredFavs = filteredBySponsor.filter((item) => item.isFavorite);
      setFiltered(filteredFavs);
    }
  }, [bills, value, activeTab]);

  return filtered;
};
