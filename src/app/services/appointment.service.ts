import { apiClient } from '@/app/lib/api-client';

export const appointmentService = {
  create: async (data: any) => {
    const { data: response } = await apiClient.post('/appointments', data);
    return response;
  },
  getMyBookings: async () => {
    const { data } = await apiClient.get('/appointments/my-appointments');
    return data;
  },

   getAll: async () => {
    const { data } = await apiClient.get('/appointments');
    return data;
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch(`/appointments/${id}`, { status });
    return data;
  },
};
