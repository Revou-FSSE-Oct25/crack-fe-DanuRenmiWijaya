import { apiClient } from "../lib/api-client";

export const medicalRecordService = {
  getByPatientId: async (patientId: string) => {
    const { data } = await apiClient.get(`/medical-records/patient/${patientId}`);
    return data;
  },
  create: async (data: any) => {
    const { data: response } = await apiClient.post('/medical-records', data);
    return response;
  },
};
