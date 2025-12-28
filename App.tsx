
import React, { useState, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import { 
  Settings, 
  History, 
  Sparkles, 
  Calculator, 
  Zap, 
  TrendingUp, 
  Cpu,
  Delete,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { CalculatorMode, HistoryItem } from './types';
import { askMathAssistant } from './services/geminiService';
import StandardKeypad from './components/StandardKeypad';
import ScientificKeypad from './components/ScientificKeypad';
import ProgrammerPanel from './components/ProgrammerPanel';
import GraphingPanel from './components/GraphingPanel';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);

  // Evaluate mathematical expression
  const evaluate = useCallback(() => {
    try {
      if (!expression) return;
      const result = math.evaluate(expression);
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        expression,
        result: formattedResult,
        timestamp: Date.now()
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 20));
      setDisplay(formattedResult);
      setExpression(formattedResult);
    } catch (error) {
      setDisplay('Error');
    }
  }, [expression]);

  const handleInput = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setExpression('');
      return;
    }
    if (val === '=') {
      evaluate();
      return;
    }
    if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
      return;
    }

    setExpression(prev => (prev === '0' ? val : prev + val));
  };

  useEffect(() => {
    if (expression === '') {
        setDisplay('0');
    } else {
        setDisplay(expression);
    }
  }, [expression]);

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    setExpression('');
    setDisplay('0');
  };

  const askAI = async () => {
    if (!assistantQuery.trim()) return;
    setIsAssistantLoading(true);
    const res = await askMathAssistant(assistantQuery, expression);
    setAssistantResponse(res || '');
    setIsAssistantLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
      {/* Sidebar - Mode Switcher */}
      <aside className="w-full md:w-20 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-4 flex md:flex-col items-center justify-around md:justify-start gap-6">
        <div className="hidden md:block mb-8 text-blue-500">
          <Calculator size={32} />
        </div>
        
        <button 
          onClick={() => handleModeChange(CalculatorMode.STANDARD)}
          className={`p-3 rounded-2xl transition-all ${mode === CalculatorMode.STANDARD ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          title="Standard"
        >
          <Zap size={24} />
        </button>

        <button 
          onClick={() => handleModeChange(CalculatorMode.SCIENTIFIC)}
          className={`p-3 rounded-2xl transition-all ${mode === CalculatorMode.SCIENTIFIC ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          title="Scientific"
        >
          <Sparkles size={24} />
        </button>

        <button 
          onClick={() => handleModeChange(CalculatorMode.GRAPHING)}
          className={`p-3 rounded-2xl transition-all ${mode === CalculatorMode.GRAPHING ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          title="Graphing"
        >
          <TrendingUp size={24} />
        </button>

        <button 
          onClick={() => handleModeChange(CalculatorMode.PROGRAMMER)}
          className={`p-3 rounded-2xl transition-all ${mode === CalculatorMode.PROGRAMMER ? 'bg-amber-600 shadow-lg shadow-amber-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          title="Programmer"
        >
          <Cpu size={24} />
        </button>

        <div className="md:mt-auto flex md:flex-col gap-4">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-3 rounded-2xl hover:bg-slate-800 text-slate-400"
          >
            <History size={24} />
          </button>
          <button 
            onClick={() => setShowAssistant(!showAssistant)}
            className="p-3 rounded-2xl hover:bg-slate-800 text-blue-400"
          >
            <Sparkles size={24} />
          </button>
        </div>
      </aside>

      {/* Main Calculator Area */}
      <main className="flex-1 flex flex-col gap-4 max-w-4xl mx-auto w-full">
        {/* Header Display */}
        <header className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col items-end justify-center min-h-[160px] relative overflow-hidden">
          <div className="absolute top-4 left-6 text-slate-500 font-medium tracking-widest uppercase text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            {mode} Mode
          </div>
          
          <div className="text-slate-400 text-lg mb-2 mono h-8 truncate w-full text-right">
            {expression || ' '}
          </div>
          <div className="text-white text-5xl md:text-6xl font-semibold mono truncate w-full text-right">
            {display}
          </div>
        </header>

        {/* Dynamic Panel based on mode */}
        <section className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 overflow-y-auto">
          {mode === CalculatorMode.STANDARD && <StandardKeypad onInput={handleInput} />}
          {mode === CalculatorMode.SCIENTIFIC && <ScientificKeypad onInput={handleInput} />}
          {mode === CalculatorMode.PROGRAMMER && <ProgrammerPanel onInput={handleInput} currentVal={display} />}
          {mode === CalculatorMode.GRAPHING && <GraphingPanel />}
        </section>
      </main>

      {/* Slide-out Panels */}
      {(showHistory || showAssistant) && (
        <aside className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 flex items-center gap-2">
              {showAssistant ? <Sparkles size={18} className="text-blue-400" /> : <History size={18} />}
              {showAssistant ? 'Math Assistant' : 'History'}
            </h2>
            <button onClick={() => { setShowHistory(false); setShowAssistant(false); }} className="p-2 hover:bg-slate-800 rounded-xl">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showHistory && (
              history.length > 0 ? (
                history.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors group cursor-pointer" onClick={() => setExpression(item.expression)}>
                    <div className="text-xs text-slate-500 mb-1">{new Date(item.timestamp).toLocaleTimeString()}</div>
                    <div className="text-slate-300 text-sm mono">{item.expression}</div>
                    <div className="text-blue-400 font-bold mono mt-1">= {item.result}</div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 opacity-50">
                  <History size={48} />
                  <p>No history yet</p>
                </div>
              )
            )}

            {showAssistant && (
              <div className="flex flex-col h-full gap-4">
                <div className="flex-1 bg-slate-800/30 rounded-2xl p-4 text-slate-300 text-sm overflow-y-auto">
                  {assistantResponse ? (
                    <div className="prose prose-invert max-w-none prose-sm">
                      {assistantResponse.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Ask me anything about math, like "How to calculate the area of a circle?" or "Explain the quadratic formula".</p>
                  )}
                  {isAssistantLoading && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="relative mt-auto">
                  <textarea 
                    value={assistantQuery}
                    onChange={(e) => setAssistantQuery(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 pr-12 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-24"
                  />
                  <button 
                    onClick={askAI}
                    disabled={isAssistantLoading}
                    className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
};

export default App;
