import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  // Ambil token admin atau token pasien
  const adminToken = Cookies.get('token');
  const patientToken = Cookies.get('patient_token');
  
  // Gunakan token yang tersedia
  const activeToken = adminToken || patientToken;

  if (activeToken) {
    config.headers.Authorization = `Bearer ${activeToken}`;
  }
  return config;
});
