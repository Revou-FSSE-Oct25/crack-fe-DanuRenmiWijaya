'use client';
import { useState } from 'react';
import { apiClient } from '@/app/lib/api-client';
import { useRouter } from 'next/navigation';
import { HeartPulse, Fingerprint, Calendar } from 'lucide-react';
import Cookies from 'js-cookie';

export default function PatientLogin() {
  const [nik, setNik] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post('/auth/patient-login', { nik, birthDate });
      
      Cookies.set('patient_token', data.access_token, { expires: 1 }); // Berlaku 1 hari
      
      router.push('/portal/dashboard');
    } catch (err) {
      alert('NIK atau Tanggal Lahir salah. Pastikan Anda sudah pernah terdaftar di RS.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border-t-8 border-blue-600">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <HeartPulse size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Portal Pasien</h1>
          <p className="text-gray-500">Masukan data Anda untuk akses layanan mandiri</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-2">
              <Fingerprint size={16}/> Nomor NIK
            </label>
            <input 
              type="text" required placeholder="16 digit NIK"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={nik} onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-2">
              <Calendar size={16}/> Tanggal Lahir
            </label>
            <input 
              type="date" required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-95">
            Masuk ke Layanan
          </button>
        </form>
      </div>
    </div>
  );
}
