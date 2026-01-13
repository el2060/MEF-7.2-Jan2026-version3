
import React from 'react';

interface Props {
  m1: number;
  m2: number;
}

const FBDDiagram: React.FC<Props> = ({ m1, m2 }) => {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <div
      onClick={() => setRevealed(true)}
      className={`relative flex flex-col md:flex-row gap-12 lg:gap-20 justify-center items-center py-12 bg-slate-50/50 rounded-[3rem] border-2 border-dashed transition-all cursor-pointer group ${revealed ? 'border-slate-200' : 'border-blue-300 bg-blue-50/10 hover:bg-blue-50/30'}`}
    >

      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border border-blue-200 shadow-xl animate-bounce">
            <span className="text-blue-600 font-black uppercase tracking-widest flex items-center gap-3">
              <span className="text-2xl">👆</span> Click to Draw Forces
            </span>
          </div>
        </div>
      )}

      {/* Elevator FBD */}
      <div className="relative flex flex-col items-center">
        <h4 className="absolute -top-12 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Elevator (m₁)</h4>

        {/* Acceleration Indicator (Left) */}
        <div className={`absolute left-[-60px] top-[100px] flex flex-col items-center transition-all duration-700 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <text className="font-mono font-bold text-xl text-slate-600 mb-1">a</text>
          <svg width="20" height="60" viewBox="0 0 20 60">
            <path d="M 10 60 L 10 10" stroke="#475569" strokeWidth="4" fill="none" />
            <path d="M 1 18 L 10 0 L 19 18" fill="#475569" />
          </svg>
        </div>

        <svg width="180" height="280" viewBox="0 0 180 280" className="overflow-visible">
          {/* Main Box */}
          <rect x="40" y="90" width="100" height="100" fill="white" stroke="#2563eb" strokeWidth="4" rx="16" />
          <text x="90" y="145" textAnchor="middle" className="font-black text-2xl" fill="#1e40af">{m1}kg</text>

          {/* Tension Force (T) */}
          <g className={`transition-all duration-700 delay-100 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <line x1="90" y1="90" x2="90" y2="20" stroke="#2563eb" strokeWidth="6" />
            <path d="M 78 35 L 90 5 L 102 35" fill="#2563eb" />
            <text x="110" y="55" className="font-mono font-bold text-2xl" fill="#2563eb">T</text>
          </g>

          {/* Weight Force (m1g) */}
          <g className={`transition-all duration-700 delay-200 ${revealed ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <line x1="90" y1="190" x2="90" y2="260" stroke="#ef4444" strokeWidth="6" />
            <path d="M 78 245 L 90 275 L 102 245" fill="#ef4444" />
            <text x="110" y="235" className="font-mono font-bold text-2xl" fill="#ef4444">m₁g</text>
          </g>
        </svg>
      </div>



      {/* Counterweight FBD */}
      <div className="relative flex flex-col items-center">
        <h4 className="absolute -top-12 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Counterweight (m₂)</h4>

        {/* Acceleration Indicator (Right) */}
        <div className={`absolute right-[-60px] top-[100px] flex flex-col items-center transition-all duration-700 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <text className="font-mono font-bold text-xl text-slate-600 mb-1">a</text>
          <svg width="20" height="60" viewBox="0 0 20 60">
            <path d="M 10 0 L 10 50" stroke="#475569" strokeWidth="4" fill="none" />
            <path d="M 1 42 L 10 60 L 19 42" fill="#475569" />
          </svg>
        </div>

        <svg width="180" height="280" viewBox="0 0 180 280" className="overflow-visible">
          {/* Main Box */}
          <rect x="40" y="90" width="100" height="100" fill="white" stroke="#334155" strokeWidth="4" rx="16" />
          <text x="90" y="145" textAnchor="middle" className="font-black text-2xl" fill="#334155">{m2}kg</text>

          {/* Tension Force (T) */}
          <g className={`transition-all duration-700 delay-100 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <line x1="90" y1="90" x2="90" y2="20" stroke="#2563eb" strokeWidth="6" />
            <path d="M 78 35 L 90 5 L 102 35" fill="#2563eb" />
            <text x="110" y="55" className="font-mono font-bold text-2xl" fill="#2563eb">T</text>
          </g>

          {/* Weight Force (m2g) */}
          <g className={`transition-all duration-700 delay-200 ${revealed ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <line x1="90" y1="190" x2="90" y2="260" stroke="#ef4444" strokeWidth="6" />
            <path d="M 78 245 L 90 275 L 102 245" fill="#ef4444" />
            <text x="110" y="235" className="font-mono font-bold text-2xl" fill="#ef4444">m₂g</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FBDDiagram;
