'use client';

import { useRouter } from 'next/navigation';
import { ClipboardList, CalendarPlus, LogOut, User, ChevronRight,Activity } from 'lucide-react';
import Cookies from 'js-cookie';

export default function PatientDashboard() {
  const router = useRouter();

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

      {/* Menu Utama (Tombol Besar) */}
      <main className="max-w-md mx-auto px-6 -mt-8 space-y-4">
        {/* Tombol Daftar Kunjungan */}
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

        {/* Tombol Lihat Hasil Pemeriksaan */}
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
          <div className="flex gap-3">
            <User className="text-amber-600" />
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase">Informasi Penting</p>
              <p className="text-sm text-amber-800">Gunakan NIK Anda sebagai identitas utama saat tiba di rumah sakit.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
