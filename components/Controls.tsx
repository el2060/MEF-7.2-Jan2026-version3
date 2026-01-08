
import React from 'react';
import { SimulationState, TutorialStep } from '../types';

interface Props {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onReset: () => void;
  step: TutorialStep;
}

const Controls: React.FC<Props> = ({ state, setState, onReset, step }) => {
  const handleChange = (key: 'm1' | 'm2', val: number) => {
    setState(prev => {
      const newState = { ...prev, [key]: val, position: 0, velocity: 0, isPlaying: false };
      const { m1, m2, g } = newState;
      const a = (g * (m2 - m1)) / (m1 + m2);
      const T = m1 * (g + a);
      return { ...newState, a, T };
    });
  };



  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100 space-y-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Car Mass (m₁)</span>
            <span className="text-xl font-mono font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full border border-blue-100 shadow-sm">{state.m1} <span className="text-sm text-blue-400">kg</span></span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: `${((state.m1 - 400) / 1100) * 100}%` }}></div>
            <input
              type="range" min="400" max="1500" step="50"
              value={state.m1}
              onChange={(e) => handleChange('m1', parseInt(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md pointer-events-none" style={{ left: `calc(${((state.m1 - 400) / 1100) * 100}% - 12px)` }}></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Counter (m₂)</span>
            <span className="text-xl font-mono font-bold text-slate-800 bg-slate-50 px-4 py-1 rounded-full border border-slate-200 shadow-sm">{state.m2} <span className="text-sm text-slate-400">kg</span></span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-slate-600 rounded-full" style={{ width: `${((state.m2 - 400) / 1100) * 100}%` }}></div>
            <input
              type="range" min="400" max="1500" step="50"
              value={state.m2}
              onChange={(e) => handleChange('m2', parseInt(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-slate-600 rounded-full shadow-md pointer-events-none" style={{ left: `calc(${((state.m2 - 400) / 1100) * 100}% - 12px)` }}></div>
          </div>
        </div>
      </div>


      {step === TutorialStep.SIMULATE && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => setState(s => ({ ...s, isPlaying: !s.isPlaying }))}
            className={`w-full py-5 text-lg font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95 ${state.isPlaying ? 'bg-amber-500 text-white shadow-amber-200/50' : 'bg-blue-600 text-white shadow-blue-200/50 hover:bg-blue-700'}`}
          >
            {state.isPlaying ? 'Pause Lift' : 'Start Lift'}
          </button>
          <button
            onClick={onReset}
            className="w-full py-4 bg-slate-100 text-slate-500 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-colors"
          >
            Reset Simulation
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
