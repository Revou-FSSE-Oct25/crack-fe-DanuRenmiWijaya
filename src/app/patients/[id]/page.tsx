'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/app/services/patient.service';
import { medicalRecordService } from '@/app/services/medical-record.service';
import { User, Calendar, MapPin, ClipboardList, Plus, Printer } from 'lucide-react';
import { useState } from 'react';
import MedicalRecordForm from '@/app/components/forms/medical-record-form';
import MedicalRecordPrint from '@/app/components/print/medical-record-print'; 

export default function PatientDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');
  const [showModal, setShowModal] = useState(false);

  const { data: patient, isLoading: loadPatient } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientService.getById(id as string),
  });

  const { data: records, isLoading: loadRecords } = useQuery({
    queryKey: ['medical-records', id],
    queryFn: () => medicalRecordService.getByPatientId(id as string),
    enabled: activeTab === 'history',
  });

  if (loadPatient) return <div className="p-10 text-center">Memuat profil pasien...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Profil */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User size={48} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-slate-800">{patient?.name}</h1>
          <p className="text-slate-500 font-medium">NIK: {patient?.nik}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm text-slate-600">
            <span className="flex items-center gap-1"><Calendar size={16}/> {patient?.birthDate ? new Date(patient.birthDate).toLocaleDateString('id-ID') : '-'}</span>
            <span className="flex items-center gap-1"><MapPin size={16}/> {patient?.address}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg transition active:scale-95"
        >
          <Plus size={18} /> Rekam Medis Baru
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-4 text-sm font-bold transition-all ${activeTab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}
          >
            Informasi Pasien
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-4 text-sm font-bold transition-all ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}
          >
            Riwayat Medis ({records?.length || 0})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'info' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="Jenis Kelamin" value={patient?.gender} icon={<ClipboardList className="text-blue-500"/>} />
            <InfoCard label="Terdaftar Sejak" value={patient?.createdAt ? new Date(patient.createdAt).toLocaleDateString('id-ID') : '-'} icon={<Calendar className="text-blue-500"/>} />
          </div>
        ) : (
          <div className="space-y-4">
            {loadRecords ? <p>Memuat riwayat...</p> : records?.map((record: any) => (
              <div key={record.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(record.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  
                  {/* 2. Tombol Cetak PDF */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-blue-600">Dokter: {record.doctor?.name || 'Anonim'}</span>
                    <button 
                      onClick={() => window.print()}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Cetak Resume Medis"
                    >
                      <Printer size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-800">Keluhan: <span className="font-normal text-slate-600">{record.complaint}</span></p>
                  <p className="text-sm font-bold text-slate-800">Diagnosa: <span className="font-normal text-slate-600">{record.diagnosis}</span></p>
                  {record.prescription && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-tighter">Resep Obat:</p>
                      <p className="text-sm text-slate-700 italic">{record.prescription}</p>
                    </div>
                  )}
                </div>

                {/* 3. Render Template Cetak (Hanya muncul saat print) */}
                <MedicalRecordPrint record={record} patient={patient} />
              </div>
            ))}
            {records?.length === 0 && !loadRecords && (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">Belum ada riwayat pemeriksaan untuk pasien ini.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <MedicalRecordForm 
          patientId={id as string} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm">
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">{label}</p>
        <p className="text-lg font-bold text-slate-700">{value || '-'}</p>
      </div>
    </div>
  );
}
