
import React from 'react';
import { SimulationState } from '../types';

interface Props {
  state: SimulationState;
}

const SimulationCanvas: React.FC<Props> = ({ state }) => {
  const width = 450;
  const height = 450;
  
  const motorX = 140;
  const motorY = 80;
  const diverterX = 310;
  const diverterY = 130;
  
  const elevatorY = 220 - state.position;
  const counterweightY = 220 + state.position;

  return (
    <div className="relative bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden h-full min-h-[450px] flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-10">
        <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-slate-200 shadow-xl flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acceleration</span>
            <span className={`text-3xl font-mono font-black ${Math.abs(state.a) > 1.5 ? 'text-red-500' : 'text-blue-600'}`}>
              {state.a.toFixed(2)} <span className="text-sm font-bold">m/s²</span>
            </span>
          </div>
        </div>
      </div>
      
      <svg width={width} height={height} className="overflow-visible transform scale-110 md:scale-125">
        {/* Machine Floor */}
        <line x1="40" y1={motorY + 30} x2="410" y2={motorY + 30} stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 4" />
        
        {/* Electric Motor */}
        <g transform={`translate(${motorX}, ${motorY})`}>
          <circle cx="0" cy="0" r="32" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="6" fill="#1e293b" />
          <text x="0" y="-45" textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Electric Motor</text>
        </g>
        
        {/* Diverter Pulley */}
        <g transform={`translate(${diverterX}, ${diverterY})`}>
          <circle cx="0" cy="0" r="22" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
          <circle cx="0" cy="0" r="5" fill="#1e293b" />
          <text x="35" y="5" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Diverter</text>
        </g>

        {/* Cable Path (Steel Rope) */}
        <path 
           d={`M ${motorX - 32} ${elevatorY} L ${motorX - 32} ${motorY} A 32 32 0 0 1 ${motorX + 32} ${motorY} L ${diverterX - 22} ${diverterY} A 22 22 0 0 1 ${diverterX + 22} ${diverterY} L ${diverterX + 22} ${counterweightY}`}
           fill="none" stroke="#475569" strokeWidth="4" strokeDasharray="4 2"
        />

        {/* Elevator Car */}
        <g transform={`translate(${motorX - 64}, ${elevatorY})`}>
          <rect width="70" height="90" fill="white" stroke="#2563eb" strokeWidth="4" rx="12" />
          <rect x="10" y="12" width="50" height="18" fill="#eff6ff" rx="4" />
          <text x="35" y="55" textAnchor="middle" fill="#1e40af" className="font-black text-sm uppercase tracking-widest">Car</text>
          <text x="35" y="78" textAnchor="middle" fill="#2563eb" className="text-xs font-mono font-bold tracking-tight">{state.m1}kg</text>
          
          {/* "Goes Up" Direction Label */}
          <g transform="translate(-30, 45)">
            <text transform="rotate(-90)" textAnchor="middle" className="text-[10px] font-black fill-blue-400 uppercase tracking-widest">
              {state.a > 0 ? "Goes Up" : "Goes Down"}
            </text>
          </g>
        </g>

        {/* Counterweight */}
        <g transform={`translate(${diverterX + 6}, ${counterweightY})`}>
          <rect width="32" height="85" fill="#1e293b" rx="8" />
          <text x="16" y="45" textAnchor="middle" fill="white" className="font-black text-[10px] uppercase tracking-tighter">CW</text>
          <text x="16" y="105" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono font-bold">{state.m2}kg</text>
        </g>

        <defs>
          <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill="#2563eb" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default SimulationCanvas;
