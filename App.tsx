
import React, { useState, useEffect, useRef } from 'react';
import { SimulationState, TutorialStep } from './types';
import SimulationCanvas from './components/SimulationCanvas';
import FBDDiagram from './components/FBDDiagram';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [step, setStep] = useState<TutorialStep>(TutorialStep.SETUP);
  const [state, setState] = useState<SimulationState>({
    m1: 800,
    m2: 1000,
    g: 9.8,
    a: 1.09,
    T: 8711,
    isPlaying: false,
    position: 0,
    velocity: 0
  });

  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  const animate = (time: number) => {
    if (lastTimeRef.current !== null) {
      const deltaTime = (time - lastTimeRef.current) / 1000;
      if (state.isPlaying) {
        setState(prev => {
          if (prev.position > 80 && prev.a > 0) return { ...prev, velocity: 0, isPlaying: false };
          if (prev.position < -80 && prev.a < 0) return { ...prev, velocity: 0, isPlaying: false };

          const newVelocity = prev.velocity + prev.a * deltaTime;
          const newPosition = prev.position + newVelocity * deltaTime * 25;
          return { ...prev, velocity: newVelocity, position: newPosition };
        });
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [state.isPlaying, state.a]);

  const resetSim = () => setState(s => ({ ...s, position: 0, velocity: 0, isPlaying: false }));

  // Formatted date for "current date of publish"
  const publishDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <img
              src="https://www.moe.gov.sg/-/media/images/school-logos/post-secondary/ngee-ann-polytechnic.jpg?h=353&iar=0&w=1274&hash=6B4291318EB64CB0CD402B37031220D8"
              alt="NP Logo"
              className="h-12 w-auto"
            />
            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">Simulation for Ch7.2</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.15em] mt-1">Newton's Second Law (Connected Bodies)</p>
            </div>
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-2 w-10 rounded-full transition-all ${step >= i ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-full min-h-[650px]">
            {/* Step Status */}
            <div className="px-10 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
              <span className="text-xs font-black text-blue-600 uppercase tracking-[0.25em]">PHASE {step + 1}</span>
              <h2 className="text-lg font-extrabold text-slate-700">
                {['The Setup', 'Force Analysis', 'The Solution', 'Live Physics'][step]}
              </h2>
            </div>

            <div className="p-10 flex-1 flex flex-col justify-center">
              {step === TutorialStep.SETUP && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">The Great Elevator Escape</h3>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      How do we predict the motion of an elevator and its counterweight?
                      We model them as <strong>Connected Bodies</strong> using an ideal cable and pulley system.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                      <span className="text-xs font-black text-blue-400 uppercase tracking-widest block mb-2">Elevator Mass (m₁)</span>
                      <p className="text-4xl font-mono font-bold text-blue-700">{state.m1} <span className="text-xl">kg</span></p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Counterweight (m₂)</span>
                      <p className="text-4xl font-mono font-bold text-slate-800">{state.m2} <span className="text-xl">kg</span></p>
                    </div>
                  </div>

                  {/* Insight: Balancing */}
                  <div className="bg-white border text-slate-600 p-6 rounded-2xl shadow-lg shadow-slate-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-400"></div>
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase tracking-widest mb-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">⚖️</span>
                      Engineering Insight: Balancing
                    </h4>
                    <p className="text-sm font-medium leading-relaxed pl-8 text-slate-500">
                      The counterweight is designed to have nearly the same weight as the elevator plus half its maximum load.
                      This balance ensures that only a small net force (and therefore a small acceleration) acts on the system, keeping the ride smooth.
                    </p>
                  </div>
                  <button onClick={() => setStep(TutorialStep.ANALYSIS)} className="group w-full py-5 bg-blue-600 text-white font-bold rounded-2xl text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200/50">
                    Next: Draw Forces <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                  </button>
                </div>
              )}

              {step === TutorialStep.ANALYSIS && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 italic">Phase 1: Force Analysis</h3>
                    <p className="text-xl text-slate-600">
                      Isolate the bodies. <strong>Tension (T)</strong> pulls upward, while <strong>Weight (mg)</strong> pulls downward.
                    </p>
                  </div>
                  <div className="scale-110 py-6">
                    <FBDDiagram m1={state.m1} m2={state.m2} />
                  </div>
                  <button onClick={() => setStep(TutorialStep.SOLVE)} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl text-xl hover:bg-slate-800 transition-all">
                    Next: Solve Math &rarr;
                  </button>
                </div>
              )}

              {step === TutorialStep.SOLVE && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-4 text-center">
                    <h3 className="text-3xl font-black text-slate-900">Phase 2: Applying F = ma</h3>
                    <p className="text-lg text-slate-600">Solving the system of equations for <strong>a</strong> and <strong>T</strong>.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <p className="text-xs font-black text-blue-500 uppercase mb-2">Lift Car:</p>
                        <p className="font-mono text-2xl font-bold tracking-tighter">T - m₁g = m₁a</p>
                      </div>
                      <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
                        <p className="text-xs font-black text-red-500 uppercase mb-2">Counterweight:</p>
                        <p className="font-mono text-2xl font-bold tracking-tighter">m₂g - T = m₂a</p>
                      </div>

                      {/* Insight: Safety */}
                      <div className="bg-white border text-slate-600 p-6 rounded-2xl shadow-lg shadow-slate-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-pink-500"></div>
                        <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase tracking-widest mb-3">
                          <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">🛑</span>
                          Engineering Insight: Safety
                        </h4>
                        <p className="text-sm font-medium leading-relaxed pl-8 text-slate-500">
                          If the counterweight or motor fails, the forces predicted by Newton’s laws help determine how brakes and safety clamps should engage to stop the car safely.
                          Tension sensors and governors constantly monitor acceleration — if it exceeds the safe limit, emergency brakes automatically activate.
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-2xl border-4 border-slate-800">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Calculated Result</span>
                      <p className="text-5xl font-mono font-black text-emerald-400 mb-2">{state.a.toFixed(2)}<span className="text-xl ml-2">m/s²</span></p>
                      <p className="text-2xl font-mono font-bold text-blue-300">T = {state.T.toFixed(0)} N</p>
                    </div>
                  </div>
                  <button onClick={() => setStep(TutorialStep.SIMULATE)} className="w-full py-5 bg-blue-600 text-white font-extrabold rounded-2xl text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all">
                    Next: Launch Simulation &rarr;
                  </button>
                </div>
              )}

              {step === TutorialStep.SIMULATE && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-700">
                  <div className="flex-1 flex flex-col">
                    <SimulationCanvas state={state} />
                  </div>
                  <div className="mt-8 flex justify-center">
                    <button onClick={() => setStep(TutorialStep.SETUP)} className="px-12 py-5 bg-slate-900 text-white text-lg font-black rounded-2xl uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all">
                      Restart Simulation
                    </button>
                  </div>
                </div>
              )}


            </div>

            {/* Step Navigation Bar */}
            <div className="px-10 py-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 disabled:opacity-0 transition-all"
              >
                &larr; Back
              </button>
              <div className="flex gap-3">
                {[0, 1, 2, 3].map(i => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-3 w-3 rounded-full ${step === i ? 'bg-blue-600 scale-125' : 'bg-slate-200'} transition-all`}
                  ></button>
                ))}
              </div>
              <button
                onClick={() => setStep(s => Math.min(3, s + 1))}
                disabled={step === 3}
                className="text-sm font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 disabled:opacity-0 transition-all"
              >
                Continue &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Controls - Simplified & Focused */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <Controls
            state={state}
            setState={setState}
            onReset={resetSim}
            step={step}
          />

          {step === TutorialStep.SIMULATE && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
              {/* Insight: Control */}
              <div className="bg-white border text-slate-600 p-5 rounded-2xl shadow-md shadow-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h4 className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-widest mb-2">
                  <span className="text-emerald-500">⚡</span> Controlling Acceleration
                </h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed pl-6">
                  Using F=ma, engineers predict the required motor torque and cable tension so the elevator accelerates gently (usually less than 1.5 m/s²).
                  Smooth acceleration prevents sudden jerks that could make passengers lose balance.
                </p>
              </div>

              {/* Insight: Efficiency */}
              <div className="bg-white border text-slate-600 p-5 rounded-2xl shadow-md shadow-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h4 className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-widest mb-2">
                  <span className="text-blue-500">🌱</span> Energy Efficiency
                </h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed pl-6">
                  A balanced system means the motor doesn’t need to lift the full weight of the elevator — it only needs to overcome the small unbalanced force.
                  This greatly reduces power use, which is why modern elevators are both smooth and energy-efficient.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
        <p className="text-sm text-slate-400 font-black text-center uppercase tracking-[0.4em]">
          app updated as {publishDate}
        </p>
      </footer>
    </div>
  );
};

export default App;
