import React from 'react';
import { Sliders, RotateCcw, Clock, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';

interface DistributionExplorerProps {
  minTime: number;
  maxTime: number;
  selectedX: number;
  onChangeSelectedX: (val: number) => void;
  onChangeMinTime: (val: number) => void;
  onChangeMaxTime: (val: number) => void;
  onResetDefaults: () => void;
}

export const DistributionExplorer: React.FC<DistributionExplorerProps> = ({
  minTime,
  maxTime,
  selectedX,
  onChangeSelectedX,
  onChangeMinTime,
  onChangeMaxTime,
  onResetDefaults,
}) => {
  const prob = (selectedX - minTime) / (maxTime - minTime);
  const clampedProb = Math.max(0, Math.min(1, prob));
  const probPercent = clampedProb * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSelectedX(parseFloat(e.target.value));
  };

  const stepAdjust = (delta: number) => {
    const nextVal = Math.min(maxTime, Math.max(minTime, Number((selectedX + delta).toFixed(2))));
    onChangeSelectedX(nextVal);
  };

  return (
    <section id="interaccion" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
          {/* Top banner / header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Explora la distribución
                </h2>
                <p className="text-xs sm:text-sm text-blue-100">
                  Modifica el valor de x en tiempo real y observa el cálculo inmediato
                </p>
              </div>
            </div>

            <button
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-colors"
              title="Restablecer valores iniciales (1s, 5s, x=3s)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer por defecto</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Grid with limits inputs and prominent live outcome */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Min and Max parameter controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tiempo mínimo (a):
                    </label>
                    <div className="relative rounded-xl border border-slate-300 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
                      <input
                        type="number"
                        min={0}
                        max={maxTime - 0.5}
                        step={0.5}
                        value={minTime}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v) && v < maxTime) {
                            onChangeMinTime(v);
                          }
                        }}
                        className="w-full px-3 py-2.5 bg-transparent font-mono text-base font-bold text-slate-900 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">seg</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tiempo máximo (b):
                    </label>
                    <div className="relative rounded-xl border border-slate-300 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
                      <input
                        type="number"
                        min={minTime + 0.5}
                        max={20}
                        step={0.5}
                        value={maxTime}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v) && v > minTime) {
                            onChangeMaxTime(v);
                          }
                        }}
                        className="w-full px-3 py-2.5 bg-transparent font-mono text-base font-bold text-slate-900 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">seg</span>
                    </div>
                  </div>
                </div>

                {/* Main Interactive Slider */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Tiempo seleccionado (x):
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => stepAdjust(-0.1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-sm transition-colors"
                        title="-0.1s"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-300 text-sm font-mono font-bold text-blue-700">
                        {selectedX.toFixed(2)} s
                      </span>
                      <button
                        onClick={() => stepAdjust(0.1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-sm transition-colors"
                        title="+0.1s"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Range input */}
                  <div className="pt-2">
                    <input
                      type="range"
                      min={minTime}
                      max={maxTime}
                      step={0.05}
                      value={selectedX}
                      onChange={handleSliderChange}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500 mt-2 font-medium">
                      <span>Mínimo: {minTime.toFixed(1)} s</span>
                      <span className="text-blue-600 font-bold">x = {selectedX.toFixed(2)} s</span>
                      <span>Máximo: {maxTime.toFixed(1)} s</span>
                    </div>
                  </div>

                  {/* Quick shortcuts / Preset buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold mr-1">Accesos rápidos:</span>
                    {[
                      { val: 2, label: 'x = 2 (25%)' },
                      { val: 3, label: 'x = 3 (50%)' },
                      { val: 4, label: 'x = 4 (75%)' },
                      { val: 5, label: 'x = 5 (100%)' },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        onClick={() => onChangeSelectedX(preset.val)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          Math.abs(selectedX - preset.val) < 0.05
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Prominent Results Display Column */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-white border border-blue-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="text-xs font-bold tracking-wider uppercase text-blue-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Cálculo Instantáneo
                </div>

                {/* Big x display */}
                <div className="border-b border-blue-100 pb-4">
                  <div className="text-xs text-slate-500 font-medium">Tiempo seleccionado:</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                    x = {selectedX.toFixed(2)}{' '}
                    <span className="text-lg font-semibold text-slate-600">segundos</span>
                  </div>
                </div>

                {/* P(X <= x) calculation */}
                <div className="py-4 border-b border-blue-100 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Probabilidad calculada:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">
                    P(X ≤ {selectedX.toFixed(2)}) = {clampedProb.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-600 font-mono">
                    F({selectedX.toFixed(2)}) = ({selectedX.toFixed(2)} - {minTime.toFixed(1)}) / ({maxTime.toFixed(1)} - {minTime.toFixed(1)})
                  </div>
                </div>

                {/* Probabilidad acumulada percentage badge */}
                <div className="pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Probabilidad acumulada:</span>
                    <span className="text-emerald-700 font-bold text-sm font-mono">
                      {probPercent.toFixed(1)}%
                    </span>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full h-3.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-150"
                      style={{ width: `${probPercent}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    El <strong>{probPercent.toFixed(1)}%</strong> de todas las solicitudes enviadas al servidor recibirán respuesta en un tiempo no mayor a <strong>{selectedX.toFixed(2)} segundos</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
