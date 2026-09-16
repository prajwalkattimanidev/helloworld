import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { CheckCircle2 } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCommerce();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none"
    >
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#25231F] text-[#FFFEFC] rounded-[1px] shadow-xl border border-[#3A3631] text-xs font-light">
        <CheckCircle2 className="w-4 h-4 text-[#E6E0D8] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
