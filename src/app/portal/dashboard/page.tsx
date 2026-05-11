'use client';

import { useRouter } from 'next/navigation';
import { ClipboardList, CalendarPlus, LogOut, User, ChevronRight,Activity,Users,Clock,Loader2} from 'lucide-react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/lib/api-client';

export default function PatientDashboard() {
  const router = useRouter();

  // 1. Query untuk Tracking Status (Real-time)
  const { data: track } = useQuery({
    queryKey: ['tracking'],
    queryFn: async () => {
      const { data } = await apiClient.get('/appointments/track');
      return data;
    },
    refetchInterval: 10000, // Cek status tiap 10 detik
  });

  const handleLogout = () => {
    Cookies.remove('patient_token');
    router.push('/portal/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Portal */}
      <nav className="bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-lg">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={24} />
            <h1 className="font-bold text-lg tracking-tight">PasienPortal</h1>
          </div>
          <button onClick={handleLogout} className="p-2 hover:bg-blue-500 rounded-full transition">
            <LogOut size={20} />
          </button>
        </div>
        
        <div className="max-w-md mx-auto mt-8 mb-4">
          <p className="text-blue-100 text-sm">Selamat Datang,</p>
          <h2 className="text-2xl font-bold">Pasien Terhormat</h2>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="max-w-md mx-auto px-6 -mt-8 space-y-4">
        
        {/* WIDGET TRACKING & STATUS (Muncul jika ada antrean) */}
        {track && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border-l-8 border-orange-500 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Antrean Aktif</p>
                <h4 className="text-lg font-bold text-slate-800">{track.department}</h4>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                track.status === 'CALLING' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-orange-100 text-orange-600'
              }`}>
                {track.status === 'CALLING' ? '● Dipanggil' : 'Menunggu'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-50 p-2 rounded-xl text-slate-500"><Users size={18}/></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Sisa Antrean</p>
                  <p className="text-sm font-bold text-slate-700">{track.peopleAhead} Orang</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-50 p-2 rounded-xl text-slate-500"><Clock size={18}/></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Estimasi</p>
                  <p className="text-sm font-bold text-slate-700">±{track.estimatedWait} Menit</p>
                </div>
              </div>
            </div>
            
            {track.status === 'CALLING' && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-[11px] rounded-xl font-bold flex items-center gap-2">
                <Loader2 className="animate-spin" size={14} />
                NOMOR ANDA SEDANG DIPANGGIL! Segera ke ruang periksa.
              </div>
            )}
          </div>
        )}

        {/* Menu Utama */}
        <button 
          onClick={() => router.push('/portal/booking')}
          className="w-full bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-5 transition active:scale-95 group"
        >
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <CalendarPlus size={32} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-slate-800 text-lg">Daftar Kunjungan</h3>
            <p className="text-slate-500 text-sm">Booking antrean poli online</p>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>

        <button 
          onClick={() => router.push('/portal/history')}
          className="w-full bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-5 transition active:scale-95 group"
        >
          <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <ClipboardList size={32} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-slate-800 text-lg">Hasil Pemeriksaan</h3>
            <p className="text-slate-500 text-sm">Lihat riwayat medis & resep</p>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>

        {/* Info Cepat */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mt-8">
          <div className="flex gap-3 text-left">
            <User className="text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter">Informasi Penting</p>
              <p className="text-[11px] text-amber-800 leading-relaxed">Gunakan NIK Anda sebagai identitas utama saat tiba di rumah sakit.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
