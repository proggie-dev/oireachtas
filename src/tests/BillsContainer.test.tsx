import { screen, fireEvent } from '@testing-library/react';
import BillsContainer from './../ui/Bills/index';
import { renderWithProviders } from './test-utils';

describe('BillsContainer', () => {
  it('renders input with translation label', () => {
    renderWithProviders(<BillsContainer />);
    expect(screen.getByLabelText(/filter by sponsor/i)).toBeInTheDocument();
  });

  it('allows typing in the input and clearing it', () => {
    renderWithProviders(<BillsContainer />);
    const input = screen.getByLabelText(/filter by sponsor/i);

    fireEvent.change(input, { target: { value: 'Test sponsor' } });
    expect(input).toHaveValue('Test sponsor');

    const clearBtn = screen.getByRole('button', { name: /clear input/i });
    fireEvent.click(clearBtn);
    expect(input).toHaveValue('');
  });
});
