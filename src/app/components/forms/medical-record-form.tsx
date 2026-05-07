'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { medicalRecordService } from '@/app/services/medical-record.service';
import { FileText, Stethoscope, Pill, X } from 'lucide-react';

export default function MedicalRecordForm({ patientId, onClose }: { patientId: string, onClose: () => void }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    patientId: patientId,
    complaint: '',
    diagnosis: '',
    prescription: '',
  });

  const mutation = useMutation({
    mutationFn: medicalRecordService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records', patientId] });
      alert('Rekam medis berhasil disimpan');
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h3 className="font-bold flex items-center gap-2"><Stethoscope size={20}/> Input Rekam Medis</h3>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Keluhan Utama</label>
            <textarea 
              required
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Pusing dan mual..."
              onChange={(e) => setFormData({...formData, complaint: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Diagnosa (ICD-10)</label>
            <input 
              required
              type="text"
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Common Cold (J00)"
              onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Resep Obat</label>
            <textarea 
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Paracetamol 500mg 3x1"
              onChange={(e) => setFormData({...formData, prescription: e.target.value})}
            />
          </div>
          
          <button 
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
          >
            {mutation.isPending ? 'Menyimpan...' : 'Simpan Rekam Medis'}
          </button>
        </form>
      </div>
    </div>
  );
}
