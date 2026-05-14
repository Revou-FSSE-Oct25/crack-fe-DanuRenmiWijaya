import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MedicalRecordForm from './medical-record-form';

jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutate: jest.fn(), isPending: false }),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
}));

describe('MedicalRecordForm Component', () => {
  it('harus merender formulir rekam medis dengan benar', () => {
    render(<MedicalRecordForm patientId="patient-123" onClose={jest.fn()} />);
    
    expect(screen.getByText('Input Rekam Medis')).toBeInTheDocument();
    
    expect(screen.getByText('Simpan Rekam Medis')).toBeInTheDocument();
  });

  it('harus memperbarui nilai input saat dokter mengisi keluhan pasien', async () => {
    render(<MedicalRecordForm patientId="patient-123" onClose={jest.fn()} />);
    
    const inputKeluhan = screen.getByPlaceholderText(/pusing dan mual/i);
    
    await userEvent.type(inputKeluhan, 'Pasien mengalami sakit kepala');
    
    expect(inputKeluhan).toHaveValue('Pasien mengalami sakit kepala');
  });
});



