'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { apiClient } from './lib/api-client';
import PatientForm from './components/forms/patient-form';
import PatientTable from './components/tables/patient-table';
import StatsCard from './components/dashboard/stats-card'; 
import { LogOut, Activity, User, Users, ClipboardList, CalendarCheck } from "lucide-react";

export default function HomePage() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  // Ambil Data Statistik Harian dari Backend
  const { data: stats } = useQuery({
    queryKey: ['today-stats'],
    queryFn: async () => {
      const { data } = await apiClient.get('/patients/stats/today');
      return data;
    },
    refetchInterval: 30000, // Refresh otomatis tiap 30 detik
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="text-blue-600 w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                SIMRS <span className="text-blue-600">Plus</span>
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 border-r pr-4 border-gray-200">
                <User size={18} className="text-gray-400" />
                <span className="font-medium">{user?.name || 'Admin'}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Sistem Informasi Rekam Medis
            </h1>
            <p className="mt-3 text-gray-500 mb-8">
              Kelola data pasien dan administrasi rumah sakit dengan mudah dan aman.
            </p>

            {/* SECTION STATISTIK (Baru) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <StatsCard 
                title="Pasien Baru Hari Ini" 
                value={stats?.newPatients || 0} 
                icon={Users} 
                colorClass="bg-blue-50 text-blue-600" 
              />
              <StatsCard 
                title="Kunjungan Medis" 
                value={stats?.totalVisits || 0} 
                icon={ClipboardList} 
                colorClass="bg-emerald-50 text-emerald-600" 
              />
              <StatsCard 
                title="Tanggal Hari Ini" 
                value={new Date().getDate()} 
                icon={CalendarCheck} 
                colorClass="bg-orange-50 text-orange-600" 
              />
            </div>
          </div>

          <div className="space-y-10">
            <PatientForm />
            <PatientTable />
          </div>
        </div>
      </main>
    </div>
  );
}
