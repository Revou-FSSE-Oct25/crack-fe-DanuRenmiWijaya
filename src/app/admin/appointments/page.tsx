'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/app/services/appointment.service';
import { User, Bell, CheckCircle, Clock, Search } from 'lucide-react';
import { useState } from 'react';

export default function AdminAppointmentManagement() {
  const queryClient = useQueryClient();
  const [filterPoli, setFilterPoli] = useState('Semua');

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: appointmentService.getAll,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      appointmentService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
    },
  });

  const filtered = filterPoli === 'Semua' 
    ? appointments 
    : appointments?.filter((a: any) => a.department === filterPoli);

  if (isLoading) return <div className="p-10 text-center">Memuat antrean...</div>;

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Antrean Hari Ini</h1>
            <p className="text-gray-500 text-sm">Kelola kedatangan pasien dan status pemeriksaan.</p>
          </div>
          
          <select 
            className="p-2 border rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPoli}
            onChange={(e) => setFilterPoli(e.target.value)}
          >
            <option value="Semua">Semua Poli</option>
            <option value="Poli Umum">Poli Umum</option>
            <option value="Poli Gigi">Poli Gigi</option>
            <option value="Poli Anak">Poli Anak</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered?.map((item: any) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold uppercase">No</span>
                  <span className="text-2xl font-black">#{item.queueNumber}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.patient?.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">{item.department}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {new Date(item.visitDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                {item.status === 'PENDING' && (
                  <button 
                    onClick={() => mutation.mutate({ id: item.id, status: 'CALLING' })}
                    className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-bold transition"
                  >
                    <Bell size={18} /> Panggil
                  </button>
                )}
                {item.status === 'CALLING' && (
                  <button 
                    onClick={() => mutation.mutate({ id: item.id, status: 'DONE' })}
                    className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-bold transition"
                  >
                    <CheckCircle size={18} /> Selesai
                  </button>
                )}
                <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  item.status === 'DONE' ? 'bg-gray-100 text-gray-400' : 'hidden'
                }`}>
                  Terselesaikan
                </span>
              </div>
            </div>
          ))}
          
          {filtered?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed text-gray-400">
              Tidak ada antrean di poli ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
