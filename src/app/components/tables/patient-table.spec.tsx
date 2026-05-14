import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientTable from './patient-table';

const mockPatients = [
  { id: '1', name: 'Siti Aminah', nik: '123' },
  { id: '2', name: 'Slamet Sulasdi', nik: '456' }
];

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: mockPatients, isLoading: false }),
  useMutation: () => ({ mutate: jest.fn() }),
  useQueryClient: () => ({}),
}));

describe('PatientTable Search Flow', () => {
  it('harus menyaring daftar nama saat admin mengetik kata kunci', async () => {
    render(<PatientTable />);
    
    // PERBAIKAN 1: Gunakan getAllByText karena teks muncul di versi Desktop & Mobile
    expect(screen.getAllByText('Siti Aminah')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Slamet Sulasdi')[0]).toBeInTheDocument();

    const inputCari = screen.getByPlaceholderText(/cari nama atau nik/i);
    
    // Simulasi mengetik kata kunci pencarian
    await userEvent.type(inputCari, 'Siti');

    // PERBAIKAN 2: Setelah disaring, Siti tetap ada di layar
    expect(screen.getAllByText('Siti Aminah')[0]).toBeInTheDocument();
    
    // PERBAIKAN 3: Gunakan queryByText untuk memastikan Slamet benar-benar HILANG dari DOM
    expect(screen.queryByText('Slamet Sulasdi')).not.toBeInTheDocument();
  });
});
