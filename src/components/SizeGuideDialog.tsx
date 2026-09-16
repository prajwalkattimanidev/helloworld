import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideDialog: React.FC<SizeGuideDialogProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const chartData = [
    { size: 'XS', uk: '6', us: '2', bustIn: '32-33', bustCm: '81-84', waistIn: '25-26', waistCm: '63-66', hipIn: '35-36', hipCm: '89-91' },
    { size: 'S', uk: '8', us: '4', bustIn: '34-35', bustCm: '86-89', waistIn: '27-28', waistCm: '68-71', hipIn: '37-38', hipCm: '94-96' },
    { size: 'M', uk: '10', us: '6', bustIn: '36-37', bustCm: '91-94', waistIn: '29-30', waistCm: '73-76', hipIn: '39-40', hipCm: '99-101' },
    { size: 'L', uk: '12', us: '8', bustIn: '38-40', bustCm: '96-101', waistIn: '31-33', waistCm: '78-84', hipIn: '41-43', hipCm: '104-109' },
    { size: 'XL', uk: '14', us: '10', bustIn: '41-43', bustCm: '104-109', waistIn: '34-36', waistCm: '86-91', hipIn: '44-46', hipCm: '111-117' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Standard Size Guide & Measurements"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25231F]/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-xl bg-[#FFFEFC] rounded-[2px] shadow-2xl border border-[#E6E0D8] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D8]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#6D2638]" />
            <h3 className="font-serif-luxury text-2xl text-[#25231F]">
              Size Guide &amp; Measurements
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 text-[#6C665F] hover:text-[#25231F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit switch */}
        <div className="flex items-center justify-between py-4">
          <p className="text-xs text-[#6C665F]">
            All garments feature 2-inch margins for bespoke tailoring alterations.
          </p>
          <div className="flex items-center bg-[#F5F1EB] p-0.5 rounded-[2px]">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-medium rounded-[1px] transition-colors ${
                unit === 'in' ? 'bg-[#25231F] text-white' : 'text-[#6C665F]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium rounded-[1px] transition-colors ${
                unit === 'cm' ? 'bg-[#25231F] text-white' : 'text-[#6C665F]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#E6E0D8] rounded-[2px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F1EB] text-[#25231F] uppercase tracking-wider text-[11px] border-b border-[#E6E0D8]">
              <tr>
                <th className="p-2.5 font-medium">Standard</th>
                <th className="p-2.5 font-medium">Bust</th>
                <th className="p-2.5 font-medium">Waist</th>
                <th className="p-2.5 font-medium">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0D8]">
              {chartData.map((row) => (
                <tr key={row.size} className="hover:bg-[#F5F1EB]/40">
                  <td className="p-2.5 font-medium text-[#25231F]">{row.size}</td>
                  <td className="p-2.5 text-[#6C665F]">{unit === 'in' ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                  <td className="p-2.5 text-[#6C665F]">{unit === 'in' ? `${row.waistIn}"` : `${row.waistCm} cm`}</td>
                  <td className="p-2.5 text-[#6C665F]">{unit === 'in' ? `${row.hipIn}"` : `${row.hipCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Stitched Note */}
        <div className="mt-4 p-3.5 bg-[#F5F1EB]/70 border border-[#E6E0D8] rounded-[2px] text-xs text-[#6C665F] space-y-1">
          <p className="font-medium text-[#25231F]">Need Bespoke Sizing?</p>
          <p>
            Select "Custom Stitched" at checkout. Our styling concierge will contact you via WhatsApp or email to record your exact blouse, armhole, and length specifications.
          </p>
        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#25231F] text-white text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
