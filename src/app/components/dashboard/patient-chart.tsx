'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/lib/api-client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PatientChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['monthly-stats'],
    queryFn: async () => {
      const { data } = await apiClient.get('/patients/stats/monthly');
      return data;
    },
  });

  if (isLoading) return <div className="h-[300px] flex items-center justify-center">Memuat grafik...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Tren Kunjungan Pasien</h2>
        <p className="text-sm text-gray-500">Statistik pendaftaran pasien baru per bulan di tahun {new Date().getFullYear()}</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
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
