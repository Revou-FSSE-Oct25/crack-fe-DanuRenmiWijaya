import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientForm from './patient-form';

// Mock queryClient agar react-query tidak memicu unhandled exception saat render form
jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutate: jest.fn(), isPending: false }),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
}));

describe('PatientForm Component', () => {
  it('harus memperbarui nilai input saat admin mengetik nama', async () => {
    render(<PatientForm />);
    
    const inputNama = screen.getByPlaceholderText(/nama sesuai ktp/i);
    
    await userEvent.type(inputNama, 'Budi Santoso');
    
    expect(inputNama).toHaveValue('Budi Santoso');
  });
});
