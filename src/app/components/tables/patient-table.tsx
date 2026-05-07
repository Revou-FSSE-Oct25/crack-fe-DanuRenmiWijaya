'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '@/app/services/patient.service';
import { IdCard, Calendar, MapPin, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link'; 

export default function PatientTable() {
  const queryClient = useQueryClient();

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: patientService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      alert('Data pasien berhasil dihapus');
    },
    onError: () => {
      alert('Gagal menghapus data');
    }
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center py-10">Memuat data pasien...</div>;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-bold text-gray-800">Daftar Pasien Terdaftar</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {patients?.length || 0} Pasien
        </span>
      </div>

      {/* TAMPILAN DESKTOP */}
      <div className="hidden md:block overflow-hidden bg-white rounded-xl shadow-md border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">NIK</th>
              <th className="p-4 font-semibold text-gray-600">Nama Lengkap</th>
              <th className="p-4 font-semibold text-gray-600">Jenis Kelamin</th>
              <th className="p-4 font-semibold text-gray-600">Tanggal Lahir</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients?.map((p: any) => (
              <tr key={p.id} className="hover:bg-blue-50/50 transition group">
                <td className="p-4 text-gray-700 font-medium">{p.nik}</td>
                <td className="p-4">
                  {/* Link ke Detail Pasien */}
                  <Link 
                    href={`/patients/${p.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    {p.name}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </td>
                <td className="p-4 text-gray-700">{p.gender}</td>
                <td className="p-4 text-gray-700">{p.birthDate ? new Date(p.birthDate).toLocaleDateString('id-ID') : '-'}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button 
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Hapus Pasien"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TAMPILAN MOBILE */}
      <div className="md:hidden space-y-4">
        {patients?.map((p: any) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3 relative">
            <button 
              onClick={() => handleDelete(p.id, p.name)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex justify-between items-start pr-8">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{p.nik}</p>
                <Link href={`/patients/${p.id}`}>
                  <h3 className="font-bold text-gray-900 text-lg hover:text-blue-600 transition">{p.name}</h3>
                </Link>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${p.gender === 'Laki-laki' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                {p.gender}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(p.birthDate).toLocaleDateString('id-ID')}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{p.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
