'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/app/services/appointment.service';
import { ChevronLeft, Calendar, MapPin, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/app/lib/api-client';

export default function PatientHistory() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: appointmentService.getMyBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/appointments/${id}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      alert('Pendaftaran berhasil dibatalkan');
    }
  });

  const handleCancel = (id: string) => {
    if (confirm('Yakin ingin membatalkan pendaftaran ini?')) {
      cancelMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 mb-6">
          <ChevronLeft size={20} /> Kembali
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Riwayat Kunjungan</h2>

        {isLoading ? (
          <p className="text-center py-10">Memuat riwayat...</p>
        ) : (
          <div className="space-y-4">
            {bookings?.map((booking: any) => (
              <div key={booking.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-bl-xl uppercase">
                  {booking.status}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 p-3 rounded-2xl text-white">
                    <Ticket size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Nomor Antrean</p>
                    <p className="text-2xl font-black text-slate-800">#{booking.queueNumber}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-blue-500" />
                    <span className="font-bold">{booking.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{new Date(booking.visitDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                  </div>
                </div>

                {/* TOMBOL AKSI HARUS DI SINI (DI DALAM MAP) */}
                <div className="flex gap-2 mt-6">
                  {booking.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancelMutation.isPending}
                        className="flex-1 py-3 text-xs font-bold text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition active:scale-95 disabled:opacity-50"
                      >
                        {cancelMutation.isPending ? 'Memproses...' : 'Batalkan'}
                      </button>
                      <button 
                        onClick={() => router.push(`/portal/booking?edit=${booking.id}`)}
                        className="flex-1 py-3 text-xs font-bold text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-100 transition active:scale-95"
                      >
                        Ubah Jadwal
                      </button>
                    </>
                  )}
                  {booking.status === 'CANCELLED' && (
                    <div className="w-full py-3 text-center text-xs font-bold text-gray-400 bg-gray-50 rounded-2xl italic">
                      Pendaftaran telah dibatalkan
                    </div>
                  )}
                </div>
              </div>
            ))}

            {bookings?.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                <p className="text-slate-400">Belum ada riwayat pendaftaran.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
