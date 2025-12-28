import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as math from 'mathjs';
import { Info } from 'lucide-react';

const GraphingPanel: React.FC = () => {
  const [funcInput, setFuncInput] = useState('x^2');
  const [error, setError] = useState('');

  const data = useMemo(() => {
    const points = [];
    try {
      setError('');
      const compiled = math.compile(funcInput);
      for (let x = -10; x <= 10; x += 0.5) {
        const y = compiled.evaluate({ x });
        if (typeof y === 'number' && isFinite(y)) {
          points.push({ x, y: parseFloat(y.toFixed(4)) });
        }
      }
    } catch (e) {
      setError('Invalid function syntax');
    }
    return points;
  }, [funcInput]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-400">Function y = f(x)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={funcInput}
            onChange={(e) => setFuncInput(e.target.value)}
            placeholder="e.g. sin(x), x^2, exp(x)"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mono"
          />
        </div>
        {error && <span className="text-rose-500 text-xs">{error}</span>}
      </div>

      <div className="flex-1 bg-slate-950 rounded-2xl p-2 border border-slate-800 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="x" stroke="#475569" fontSize={12} tickCount={10} domain={[-10, 10]} type="number" />
            <YAxis stroke="#475569" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-3">
        <Info size={18} className="text-emerald-500 mt-0.5" />
        <p className="text-xs text-slate-400">
          Enter a function of <span className="text-emerald-400 font-bold">x</span>. 
          Use <span className="mono bg-slate-800 px-1 rounded">^</span> for powers, 
          <span className="mono bg-slate-800 px-1 rounded">sqrt()</span> for roots, and standard trigonometric functions like 
          <span className="mono bg-slate-800 px-1 rounded">sin(x)</span>.
        </p>
      </div>
    </div>
  );
};

export default GraphingPanel;