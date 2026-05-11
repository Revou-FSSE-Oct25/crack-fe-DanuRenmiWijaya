'use client';

import { useState, useEffect } from 'react'; // 1. Tambahkan useEffect & useState
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/lib/api-client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PatientChart() {
  const [isMounted, setIsMounted] = useState(false); // 2. State untuk handle hydration

  useEffect(() => {
    setIsMounted(true); // 3. Set true setelah komponen masuk ke DOM browser
  }, []);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['monthly-stats'],
    queryFn: async () => {
      const { data } = await apiClient.get('/patients/stats/monthly');
      return data;
    },
  });

  // Tampilkan loading/placeholder dengan tinggi tetap agar layout tidak melompat
  if (isLoading || !isMounted) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-10 h-[400px] flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">Memuat grafik kunjungan...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Tren Kunjungan Pasien</h2>
        <p className="text-sm text-gray-500">Statistik pendaftaran pasien baru per bulan di tahun {new Date().getFullYear()}</p>
      </div>

      {/* 4. Berikan h-[300px] eksplisit pada kontainer pembungkus */}
      <div className="h-[300px] w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="pasien" radius={[6, 6, 0, 0]} barSize={40}>
              {chartData?.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.pasien > 0 ? '#3b82f6' : '#e2e8f0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
