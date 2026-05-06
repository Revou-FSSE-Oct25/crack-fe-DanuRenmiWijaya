'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '@/app/services/patient.service';
import { User, IdCard, MapPin, Calendar, Users } from 'lucide-react';

export default function PatientForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    gender: 'Laki-laki',
    birthDate: '',
    address: '',
  });

  const mutation = useMutation({
  mutationFn: patientService.create,
  onSuccess: () => {
    // Memberitahu React Query bahwa data 'patients' sudah basi dan harus ambil ulang
    queryClient.invalidateQueries({ queryKey: ['patients'] });
    
    alert('Pasien berhasil didaftarkan!');
    
    // Reset form agar kosong kembali
    setFormData({ 
      nik: '', 
      name: '', 
      gender: 'Laki-laki', 
      birthDate: '', 
      address: '' 
    });
  },
  onError: (error: any) => {
    // Jika NIK duplikat atau ada error backend, tampilkan pesannya
    alert(error.response?.data?.message || 'Gagal menyimpan data');
  }
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="bg-blue-600 p-6">
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          <User className="w-6 h-6" /> Registrasi Pasien Baru
        </h2>
        <p className="text-blue-100 text-sm">Lengkapi data rekam medis pasien di bawah ini.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Grid System: 1 Kolom di Mobile, 2 Kolom di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* NIK */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <IdCard className="w-4 h-4 text-blue-500" /> No. NIK
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Contoh: 32010..."
              value={formData.nik}
              onChange={(e) => setFormData({...formData, nik: e.target.value})}
            />
          </div>

          {/* Nama Lengkap */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" /> Nama Lengkap
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Nama sesuai KTP"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Jenis Kelamin
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Tanggal Lahir */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" /> Tanggal Lahir
            </label>
            <input
              type="date"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
        </div>

        {/* Alamat (Full Width) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" /> Alamat Lengkap
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
            placeholder="Jl. Raya No. 123..."
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
            mutation.isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {mutation.isPending ? 'Menyimpan...' : 'Simpan Data Pasien'}
        </button>
      </form>
    </div>
  );
}
