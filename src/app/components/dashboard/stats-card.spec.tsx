import { render, screen } from '@testing-library/react';
import StatsCard from './stats-card';
import { Users } from 'lucide-react';

describe('StatsCard Component', () => {
  it('harus berhasil merender komponen dengan properti yang benar', () => {
    render(
      <StatsCard 
        title="Pasien Baru Hari Ini" 
        value={25} 
        icon={Users} 
        colorClass="bg-blue-50 text-blue-600" 
      />
    );

    // Verifikasi judul teks tertera di layar
    expect(screen.getByText('Pasien Baru Hari Ini')).toBeInTheDocument();
    
    // Verifikasi angka statistik muncul dengan benar
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
