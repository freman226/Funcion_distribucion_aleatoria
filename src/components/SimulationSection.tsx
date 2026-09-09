import React, { useState, useEffect } from 'react';
import { Play, RotateCw, BarChart3, TrendingUp, HelpCircle, Layers, CheckCircle } from 'lucide-react';
import { runSimulation } from '../utils/math';
import { SimulationResult } from '../types';

interface SimulationSectionProps {
  minTime: number;
  maxTime: number;
  selectedX: number;
}

export const SimulationSection: React.FC<SimulationSectionProps> = ({
  minTime,
  maxTime,
  selectedX,
}) => {
  const [sampleSize, setSampleSize] = useState<number>(100);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Initial simulation on mount
  useEffect(() => {
    handleRunSimulation(sampleSize);
  }, []);

  // When selectedX changes, update the simulation stats without regenerating times
  useEffect(() => {
    if (simulation && simulation.times.length > 0) {
      const underCount = simulation.times.filter((t) => t <= selectedX).length;
      const theoreticalProb = Math.min(1, Math.max(0, (selectedX - minTime) / (maxTime - minTime)));
      setSimulation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          countUnderOrEqualX: underCount,
          observedProbability: underCount / prev.count,
          theoreticalProbability: theoreticalProb,
        };
      });
    }
  }, [selectedX, minTime, maxTime]);

  const handleRunSimulation = (n: number) => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = runSimulation(n, minTime, maxTime, selectedX);
      setSimulation(result);
      setIsSimulating(false);
    }, 120);
  };

  const theoreticalPercent = simulation ? (simulation.theoreticalProbability * 100).toFixed(1) : '0';
  const observedPercent = simulation ? (simulation.observedProbability * 100).toFixed(1) : '0';
  const errorPercent = simulation
    ? Math.abs(parseFloat(observedPercent) - parseFloat(theoreticalPercent)).toFixed(1)
    : '0';

  return (
    <section id="simulacion" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Simulación de solicitudes
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Comprueba empíricamente cómo la frecuencia observada converge a la probabilidad teórica
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
                {[100, 500, 1000].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setSampleSize(count);
                      handleRunSimulation(count);
                    }}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      sampleSize === count
                        ? 'bg-white text-blue-700 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {count} sol.
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleRunSimulation(sampleSize)}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Simular nuevamente</span>
              </button>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* 1. Solicitudes generadas */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Número de solicitudes</div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {simulation?.count ?? 0}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Muestra generada U({minTime}, {maxTime})</div>
            </div>

            {/* 2. Media aproximada */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Media muestral (x̄)</div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {simulation?.mean.toFixed(2) ?? '0.00'} s
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Media teórica = {((minTime + maxTime) / 2).toFixed(2)} s
              </div>
            </div>

            {/* 3. Probabilidad Teórica */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <div className="text-xs text-blue-800 font-bold">Probabilidad teórica</div>
              <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
                {theoreticalPercent}%
              </div>
              <div className="text-[11px] text-blue-700 mt-1 font-mono">
                P(X ≤ {selectedX.toFixed(2)})
              </div>
            </div>

            {/* 4. Probabilidad Observada */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="text-xs text-emerald-800 font-bold">Resultado de la simulación</div>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
                {observedPercent}%
              </div>
              <div className="text-[11px] text-emerald-800 mt-1">
                {simulation?.countUnderOrEqualX ?? 0} de {simulation?.count ?? 0} solicitudes ≤ {selectedX.toFixed(2)}s
              </div>
            </div>
          </div>

          {/* Histogram Visualization */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" />
                Histograma de tiempos de respuesta generados:
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-3 h-3 bg-emerald-500 rounded-xs inline-block" />
                  Solicitudes ≤ {selectedX.toFixed(2)}s
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-3 h-3 bg-slate-300 rounded-xs inline-block" />
                  Solicitudes &gt; {selectedX.toFixed(2)}s
                </span>
              </div>
            </div>

            {/* Bars container */}
            <div className="h-44 flex items-end gap-2 sm:gap-3 pt-6 pb-2 px-2 border-b border-slate-300">
              {simulation?.bins.map((bin, index) => {
                const isUnderX = bin.rangeEnd <= selectedX;
                const isPartiallyUnderX = bin.rangeStart < selectedX && bin.rangeEnd > selectedX;
                const maxBinCount = Math.max(...(simulation?.bins.map((b) => b.count) || [1]));
                const barHeightPercent = Math.max(8, (bin.count / (maxBinCount || 1)) * 100);

                return (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                      {bin.count} solicitudes ({bin.percentage.toFixed(1)}%)
                    </div>

                    {/* Bar count number */}
                    <span className="text-[10px] font-mono text-slate-500 mb-1">
                      {bin.count}
                    </span>

                    {/* Bar body */}
                    <div
                      style={{ height: `${barHeightPercent}%` }}
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isUnderX
                          ? 'bg-emerald-500 shadow-xs'
                          : isPartiallyUnderX
                          ? 'bg-gradient-to-t from-emerald-400 to-slate-400'
                          : 'bg-slate-300'
                      }`}
                    />

                    {/* X axis interval label */}
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-600 mt-2 text-center truncate w-full">
                      {bin.rangeStart.toFixed(1)}-{bin.rangeEnd.toFixed(1)}s
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Conclusion */}
          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-purple-950 leading-relaxed">
              <strong>Conclusión Estadística (Ley de los Grandes Números):</strong> La probabilidad teórica es de <strong>{theoreticalPercent}%</strong> y la frecuencia observada fue del <strong>{observedPercent}%</strong> (diferencia de solo <strong>{errorPercent}%</strong>). A medida que el número de solicitudes simuladas crece (e.g. 500 o 1,000), la proporción empírica converge casi perfectamente al valor teórico de la función de distribución acumulada <span className="font-mono font-bold">F(x)</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
