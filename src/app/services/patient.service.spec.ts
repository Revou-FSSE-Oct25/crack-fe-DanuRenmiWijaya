import { patientService } from './patient.service';
import { apiClient } from '../lib/api-client';

jest.mock('../lib/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Patient Service Frontend', () => {
  const mockPatient = { id: '1', name: 'Andi', nik: '123' };

  it('should call getAll endpoint successfully', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [mockPatient] });
    const result = await patientService.getAll();
    expect(result).toEqual([mockPatient]);
    expect(apiClient.get).toHaveBeenCalledWith('/patients');
  });

  it('should call create endpoint successfully', async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({ data: mockPatient });
    const result = await patientService.create(mockPatient);
    expect(result).toEqual(mockPatient);
  });

  it('should call update endpoint successfully', async () => {
    (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockPatient });
    const result = await patientService.update('1', { name: 'Andi Baru' });
    expect(result).toBeDefined();
  });

  it('should call delete endpoint successfully', async () => {
    (apiClient.delete as jest.Mock).mockResolvedValue({ data: { success: true } });
    const result = await patientService.delete('1');
    expect(result).toBeDefined();
  });
});
