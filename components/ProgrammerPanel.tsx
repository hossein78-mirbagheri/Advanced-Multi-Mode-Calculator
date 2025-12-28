
import React from 'react';

interface ProgrammerPanelProps {
  onInput: (val: string) => void;
  currentVal: string;
}

const ProgrammerPanel: React.FC<ProgrammerPanelProps> = ({ onInput, currentVal }) => {
  const num = parseInt(currentVal) || 0;

  const bases = [
    { label: 'HEX', val: num.toString(16).toUpperCase() },
    { label: 'DEC', val: num.toString(10) },
    { label: 'OCT', val: num.toString(8) },
    { label: 'BIN', val: num.toString(2).padStart(8, '0') },
  ];

  const ops = [
    { label: 'AND', val: '&' },
    { label: 'OR', val: '|' },
    { label: 'XOR', val: '^' },
    { label: 'NOT', val: '~' },
    { label: 'Lsh', val: '<<' },
    { label: 'Rsh', val: '>>' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 gap-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
        {bases.map(b => (
          <div key={b.label} className="flex items-center gap-4">
            <span className="text-xs font-bold text-amber-500 w-8">{b.label}</span>
            <span className="mono text-slate-300 break-all">{b.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        {/* Bitwise Ops Row */}
        {ops.map(op => (
          <button key={op.label} onClick={() => onInput(op.val)} className="py-3 bg-amber-900/20 hover:bg-amber-900/30 text-amber-300 rounded-xl text-sm font-bold">
            {op.label}
          </button>
        ))}
        
        {/* Standard pad mixed with A-F */}
        {['A', 'B', 'C', 'D', 'E', 'F'].map(char => (
           <button key={char} onClick={() => onInput(char)} className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold">
             {char}
           </button>
        ))}

        <button onClick={() => onInput('C')} className="py-3 bg-rose-500/20 text-rose-400 rounded-xl font-bold">CLR</button>
        <button onClick={() => onInput('DEL')} className="py-3 bg-rose-500/20 text-rose-400 rounded-xl font-bold">DEL</button>

        {[7,8,9,4,5,6,1,2,3,0].map(n => (
          <button key={n} onClick={() => onInput(n.toString())} className="py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold">
            {n}
          </button>
        ))}
        <button onClick={() => onInput('=')} className="col-span-2 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold">=</button>
      </div>
    </div>
  );
};

export default ProgrammerPanel;
