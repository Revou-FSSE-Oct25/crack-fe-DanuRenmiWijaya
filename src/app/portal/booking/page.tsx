'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/lib/api-client';
import { Calendar, ChevronLeft, Clock, CheckCircle2 } from 'lucide-react';

const POLI_OPTIONS = [
  { id: 'umum', name: 'Poli Umum', icon: '🩺' },
  { id: 'gigi', name: 'Poli Gigi', icon: '🦷' },
  { id: 'anak', name: 'Poli Anak', icon: '👶' },
  { id: 'dalam', name: 'Poli Penyakit Dalam', icon: '🍕' },
];

export default function PatientBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit'); 

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visitDate: '',
    department: '',
  });

  const { data: bookings } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data } = await apiClient.get('/appointments/my-appointments');
      return data;
    },
    enabled: !!editId,
  });

  useEffect(() => {
    if (editId && bookings) {
      const currentBooking = bookings.find((b: any) => b.id === editId);
      if (currentBooking) {
        setFormData({
          department: currentBooking.department,
          visitDate: new Date(currentBooking.visitDate).toISOString().split('T')[0],
        });
        setStep(2);
      }
    }
  }, [editId, bookings]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
     if (editId) {
    return await apiClient.patch(`/appointments/${editId}`, data); 
    }
    return await apiClient.post('/appointments', data);
    },
    onSuccess: () => setStep(3),
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 mb-6">
          <ChevronLeft size={20} /> Kembali
        </button>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Pilih Poli Tujuan</h2>
            <div className="grid grid-cols-1 gap-4">
              {POLI_OPTIONS.map((poli) => (
                <button
                  key={poli.id}
                  onClick={() => { setFormData({ ...formData, department: poli.name }); setStep(2); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                    formData.department === poli.name ? 'border-blue-600 bg-blue-50' : 'border-white bg-white shadow-sm'
                  }`}
                >
                  <span className="text-3xl">{poli.icon}</span>
                  <span className="font-bold text-slate-700">{poli.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {editId ? 'Ubah Jadwal Kunjungan' : 'Pilih Tanggal'}
            </h2>
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Calendar size={14} /> Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600"
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                />
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl flex gap-3 text-blue-700 text-sm">
                <Clock size={20} className="shrink-0" />
                <p>Pendaftaran online berlaku maksimal H-1 sebelum jadwal kunjungan.</p>
              </div>

              <button
                onClick={() => mutation.mutate(formData)}
                disabled={!formData.visitDate || mutation.isPending}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 disabled:bg-slate-200 transition"
              >
                {mutation.isPending ? 'Memproses...' : editId ? 'Simpan Perubahan' : 'Konfirmasi Pendaftaran'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-6">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editId ? 'Perubahan Disimpan!' : 'Berhasil Didaftar!'}
              </h2>
              <p className="text-slate-500 mt-2">
                {editId ? 'Jadwal kunjungan Anda telah diperbarui.' : 'Silakan tunjukkan NIK Anda di loket saat hari kedatangan.'}
              </p>
            </div>
            <button
              onClick={() => router.push('/portal/dashboard')}
              className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold"
            >
              Kembali ke Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
