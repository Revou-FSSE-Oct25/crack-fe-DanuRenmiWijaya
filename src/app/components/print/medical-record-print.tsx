'use client';

import { Activity } from 'lucide-react';

export default function MedicalRecordPrint({ record, patient }: { record: any, patient: any }) {
  return (
    <div id={`print-area-${record.id}`} className="hidden print:block p-10 bg-white text-black font-serif">
      {/* KOP SURAT */}
      <div className="flex items-center justify-between border-b-4 border-double border-black pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Activity size={40} className="text-black" />
          <div>
            <h1 className="text-2xl font-bold uppercase">SIMRS Plus - Medical Center</h1>
            <p className="text-sm italic">Jl. Kesehatan No. 123, Jakarta - Telp: (021) 123456</p>
          </div>
        </div>
      </div>

      <h2 className="text-center text-xl font-bold underline mb-8">RESUME MEDIS PASIEN</h2>

      {/* DATA PASIEN */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <p><strong>Nama Pasien:</strong> {patient?.name}</p>
          <p><strong>NIK:</strong> {patient?.nik}</p>
        </div>
        <div className="text-right">
          <p><strong>Tanggal Kunjungan:</strong> {new Date(record.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
          <p><strong>Jenis Kelamin:</strong> {patient?.gender}</p>
        </div>
      </div>

      {/* ISI REKAM MEDIS */}
      <div className="space-y-6 border-t border-b border-gray-200 py-6">
        <div>
          <h3 className="font-bold underline uppercase mb-1">Keluhan Utama:</h3>
          <p className="pl-4 italic">"{record.complaint}"</p>
        </div>
        <div>
          <h3 className="font-bold underline uppercase mb-1">Diagnosa (ICD-10):</h3>
          <p className="pl-4 font-bold">{record.diagnosis}</p>
        </div>
        <div>
          <h3 className="font-bold underline uppercase mb-1">Terapi / Resep Obat:</h3>
          <p className="pl-4 whitespace-pre-line">{record.prescription || 'Tidak ada resep obat.'}</p>
        </div>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-20 flex justify-end">
        <div className="text-center w-64">
          <p className="mb-20">Dokter Pemeriksa,</p>
          <p className="font-bold underline">{record.doctor?.name || 'Dokter Umum'}</p>
          <p className="text-xs">SIP: 123/DISKES/2024</p>
        </div>
      </div>
      
      <p className="mt-10 text-[10px] text-gray-400 italic text-center">Dokumen ini dicetak secara otomatis melalui Sistem Informasi Manajemen Rumah Sakit (SIMRS Plus).</p>
    </div>
  );
}
