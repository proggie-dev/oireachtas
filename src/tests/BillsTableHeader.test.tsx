import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BillsTableHeader from './../ui/Bills/TableHeader';
import { renderWithProviders } from './test-utils';
import type { BillDetail, BillsTableOrder } from '../types/Bill';

describe('BillsTableHeader', () => {
  const mockOnRequestSort = vi.fn();
  const order: BillsTableOrder = 'asc';
  const orderBy: keyof BillDetail = 'number';

  it('renders all table headers', () => {
    renderWithProviders(
      <table>
        <BillsTableHeader
          order={order}
          orderBy={orderBy}
          rowCount={2}
          onRequestSort={mockOnRequestSort}
        />
      </table>
    );

    expect(screen.getByText(/NUMBER/i)).toBeInTheDocument();
    expect(screen.getByText(/TYPE/i)).toBeInTheDocument();
    expect(screen.getByText(/STATUS/i)).toBeInTheDocument();
    expect(screen.getByText(/SPONSOR/i)).toBeInTheDocument();
    expect(screen.getByText(/FAVORITE/i)).toBeInTheDocument();
  });

  it('calls onRequestSort when header is clicked', () => {
    renderWithProviders(
      <table>
        <BillsTableHeader
          order={order}
          orderBy={orderBy}
          rowCount={2}
          onRequestSort={mockOnRequestSort}
        />
      </table>
    );

    const numberHeader = screen.getByText(/NUMBER/i);
    fireEvent.click(numberHeader);

    expect(mockOnRequestSort).toHaveBeenCalledTimes(1);
  });

  it('renders visually hidden sort text when active', () => {
    renderWithProviders(
      <table>
        <BillsTableHeader
          order={order}
          orderBy={orderBy}
          rowCount={2}
          onRequestSort={mockOnRequestSort}
        />
      </table>
    );

    const visuallyHiddenText = screen.getByText(/sorted ascending/i);
    expect(visuallyHiddenText).toBeInTheDocument();
  });
});
