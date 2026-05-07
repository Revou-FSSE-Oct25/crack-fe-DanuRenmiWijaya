import { apiClient } from "../lib/api-client";

export const patientService = {
  getAll: async () => {
    const { data } = await apiClient.get('/patients');
    console.log("Data diterima dari Backend:", data);
    return data;
  },
  
  getById: async (id: string) => {
  const { data } = await apiClient.get(`/patients/${id}`);
  return data;
  },

  create: async (patientData: any) => {
    const { data } = await apiClient.post('/patients', patientData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/patients/${id}`);
    return data;
  },

  update: async (id: string, updateData: any) => {
    const { data } = await apiClient.patch(`/patients/${id}`, updateData);
    return data;
  },

};
