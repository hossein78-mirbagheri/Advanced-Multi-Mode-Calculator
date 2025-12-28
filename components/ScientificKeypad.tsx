
import React from 'react';

interface KeypadProps {
  onInput: (val: string) => void;
}

const ScientificKeypad: React.FC<KeypadProps> = ({ onInput }) => {
  const buttons = [
    { label: 'sin', type: 'func', val: 'sin(' },
    { label: 'cos', type: 'func', val: 'cos(' },
    { label: 'tan', type: 'func', val: 'tan(' },
    { label: 'π', type: 'func', val: 'pi' },
    { label: 'e', type: 'func', val: 'e' },
    
    { label: 'log', type: 'func', val: 'log10(' },
    { label: 'ln', type: 'func', val: 'log(' },
    { label: '√', type: 'func', val: 'sqrt(' },
    { label: '^', type: 'func', val: '^' },
    { label: '!', type: 'func', val: '!' },

    { label: 'C', type: 'special', val: 'C' },
    { label: '(', type: 'op', val: '(' },
    { label: ')', type: 'op', val: ')' },
    { label: '/', type: 'op', val: '/' },
    { label: 'DEL', type: 'special', val: 'DEL' },

    { label: '7', type: 'num', val: '7' },
    { label: '8', type: 'num', val: '8' },
    { label: '9', type: 'num', val: '9' },
    { label: '*', type: 'op', val: '*' },
    { label: '%', type: 'op', val: '%' },

    { label: '4', type: 'num', val: '4' },
    { label: '5', type: 'num', val: '5' },
    { label: '6', type: 'num', val: '6' },
    { label: '-', type: 'op', val: '-' },
    { label: 'Exp', type: 'func', val: 'exp(' },

    { label: '1', type: 'num', val: '1' },
    { label: '2', type: 'num', val: '2' },
    { label: '3', type: 'num', val: '3' },
    { label: '+', type: 'op', val: '+' },
    { label: '=', type: 'action', val: '=', span: 1, rowSpan: 2 },

    { label: '0', type: 'num', val: '0', span: 2 },
    { label: '.', type: 'num', val: '.' },
    { label: 'ans', type: 'func', val: 'ans' },
  ];

  const getClass = (type: string) => {
    switch(type) {
      case 'num': return 'bg-slate-800 hover:bg-slate-700 text-slate-100';
      case 'op': return 'bg-slate-800/50 hover:bg-slate-700/50 text-indigo-400 font-bold';
      case 'func': return 'bg-indigo-900/20 hover:bg-indigo-900/40 text-indigo-300 italic text-sm';
      case 'special': return 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm';
      case 'action': return 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 h-full">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={() => onInput(btn.val)}
          className={`py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center ${getClass(btn.type)} ${btn.span ? `col-span-${btn.span}` : ''}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default ScientificKeypad;
