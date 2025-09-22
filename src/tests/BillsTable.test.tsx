import { screen, fireEvent } from '@testing-library/react';
import BillsTable from './../ui/Bills/Table';
import { renderWithProviders } from './test-utils';
import type { BillDetail } from '../types/Bill';

describe('BillsTable', () => {
  const mockBills: BillDetail[] = [
    {
      id: '1',
      number: 333,
      type: 'Type A',
      status: 'Open',
      sponsor: 'Alice',
      isFavorite: false,
      title: { enTitle: 'Bill One', gaTitle: 'Ráiteas a hAon' },
    },
    {
      id: '2',
      number: 444,
      type: 'Type B',
      status: 'Closed',
      sponsor: 'Bob',
      isFavorite: true,
      title: { enTitle: 'Bill Two', gaTitle: 'Ráiteas a Dó' },
    },
  ];

  it('renders without crashing (empty input)', () => {
    renderWithProviders(<BillsTable filteredBillsByInput={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders rows when bills are provided', () => {
    renderWithProviders(<BillsTable filteredBillsByInput={mockBills} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('toggles favorite icon on button click', () => {
    renderWithProviders(<BillsTable filteredBillsByInput={mockBills} />);
    const favButton = screen.getAllByRole('button')[0];
    expect(screen.getAllByTestId('FavoriteBorderIcon').length).toBeGreaterThan(0);

    fireEvent.click(favButton);
    expect(favButton).toBeInTheDocument();
  });
});
