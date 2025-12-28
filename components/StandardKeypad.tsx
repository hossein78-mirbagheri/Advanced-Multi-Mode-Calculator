
import React from 'react';

interface KeypadProps {
  onInput: (val: string) => void;
}

const StandardKeypad: React.FC<KeypadProps> = ({ onInput }) => {
  const buttons = [
    { label: 'C', type: 'special' },
    { label: '(', type: 'operator' },
    { label: ')', type: 'operator' },
    { label: '/', type: 'operator' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '*', type: 'operator' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator' },
    { label: '0', type: 'number', span: 2 },
    { label: '.', type: 'number' },
    { label: '=', type: 'action' },
  ];

  const getClass = (type: string) => {
    switch(type) {
      case 'number': return 'bg-slate-800 hover:bg-slate-700 text-slate-100';
      case 'operator': return 'bg-slate-800/50 hover:bg-slate-700/50 text-blue-400 font-bold';
      case 'special': return 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 font-bold';
      case 'action': return 'bg-blue-600 hover:bg-blue-500 text-white font-bold';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => onInput(btn.label)}
          className={`py-6 rounded-2xl text-xl transition-all active:scale-95 flex items-center justify-center ${getClass(btn.type)} ${btn.span ? `col-span-${btn.span}` : ''}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default StandardKeypad;
