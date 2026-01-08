
import React from 'react';

interface Props {
  m1: number;
  m2: number;
}

const FBDDiagram: React.FC<Props> = ({ m1, m2 }) => {
  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-20 justify-center items-center py-12 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
      {/* Elevator FBD */}
      <div className="relative flex flex-col items-center">
        <h4 className="absolute -top-12 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Elevator (m₁)</h4>
        
        {/* Acceleration Indicator (Left) */}
        <div className="absolute left-[-60px] top-[100px] flex flex-col items-center">
           <text className="font-mono font-bold text-xl text-slate-600 mb-1">a</text>
           <svg width="20" height="60" viewBox="0 0 20 60">
              <path d="M 10 60 L 10 10" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 4 12 L 10 0 L 16 12" fill="#475569" />
           </svg>
        </div>

        <svg width="180" height="280" viewBox="0 0 180 280" className="overflow-visible">
          {/* Main Box */}
          <rect x="40" y="90" width="100" height="100" fill="white" stroke="#2563eb" strokeWidth="4" rx="16" />
          <text x="90" y="145" textAnchor="middle" className="font-black text-2xl" fill="#1e40af">{m1}kg</text>
          
          {/* Tension Force (T) */}
          <g>
            <line x1="90" y1="90" x2="90" y2="20" stroke="#2563eb" strokeWidth="4" />
            <path d="M 82 25 L 90 5 L 98 25" fill="#2563eb" />
            <text x="110" y="55" className="font-mono font-bold text-2xl" fill="#2563eb">T</text>
          </g>
          
          {/* Weight Force (m1g) */}
          <g>
            <line x1="90" y1="190" x2="90" y2="260" stroke="#ef4444" strokeWidth="4" />
            <path d="M 82 255 L 90 275 L 98 255" fill="#ef4444" />
            <text x="110" y="235" className="font-mono font-bold text-2xl" fill="#ef4444">m₁g</text>
          </g>
        </svg>
      </div>

      <div className="text-slate-300 font-black text-6xl hidden md:block select-none px-4">AND</div>

      {/* Counterweight FBD */}
      <div className="relative flex flex-col items-center">
        <h4 className="absolute -top-12 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Counterweight (m₂)</h4>
        
        {/* Acceleration Indicator (Right) */}
        <div className="absolute right-[-60px] top-[100px] flex flex-col items-center">
           <text className="font-mono font-bold text-xl text-slate-600 mb-1">a</text>
           <svg width="20" height="60" viewBox="0 0 20 60">
              <path d="M 10 0 L 10 50" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 4 48 L 10 60 L 16 48" fill="#475569" />
           </svg>
        </div>

        <svg width="180" height="280" viewBox="0 0 180 280" className="overflow-visible">
          {/* Main Box */}
          <rect x="40" y="90" width="100" height="100" fill="white" stroke="#334155" strokeWidth="4" rx="16" />
          <text x="90" y="145" textAnchor="middle" className="font-black text-2xl" fill="#334155">{m2}kg</text>
          
          {/* Tension Force (T) */}
          <g>
            <line x1="90" y1="90" x2="90" y2="20" stroke="#2563eb" strokeWidth="4" />
            <path d="M 82 25 L 90 5 L 98 25" fill="#2563eb" />
            <text x="110" y="55" className="font-mono font-bold text-2xl" fill="#2563eb">T</text>
          </g>
          
          {/* Weight Force (m2g) */}
          <g>
            <line x1="90" y1="190" x2="90" y2="260" stroke="#ef4444" strokeWidth="4" />
            <path d="M 82 255 L 90 275 L 98 255" fill="#ef4444" />
            <text x="110" y="235" className="font-mono font-bold text-2xl" fill="#ef4444">m₂g</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FBDDiagram;
