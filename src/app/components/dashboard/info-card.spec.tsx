import { render, screen } from '@testing-library/react';
import { ClipboardList } from 'lucide-react';

function InfoCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div>{icon}</div>
      <div>
        <p>{label}</p>
        <p>{value || '-'}</p>
      </div>
    </div>
  );
}

describe('InfoCard Component', () => {
  it('harus menampilkan label dan value secara akurat', () => {
    render(
      <InfoCard 
        label="Jenis Kelamin" 
        value="Laki-laki" 
        icon={<ClipboardList />} 
      />
    );

    expect(screen.getByText('Jenis Kelamin')).toBeInTheDocument();
    expect(screen.getByText('Laki-laki')).toBeInTheDocument();
  });
});
