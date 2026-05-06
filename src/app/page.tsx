'use client';

import { useAuthStore } from '@/store/auth.store';
import PatientForm from './components/forms/patient-form';
import PatientTable from './components/tables/patient-table';
import { LogOut, Activity, User } from "lucide-react";

export default function HomePage() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

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
            <p className="mt-3 text-gray-500">
              Kelola data pasien dan administrasi rumah sakit dengan mudah dan aman.
            </p>
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
