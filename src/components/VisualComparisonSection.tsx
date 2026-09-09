import React from 'react';
import { ArrowRight, Compass, Zap, Check, Sparkles } from 'lucide-react';

interface VisualComparisonSectionProps {
  selectedX: number;
  onSelectX: (val: number) => void;
}

export const VisualComparisonSection: React.FC<VisualComparisonSectionProps> = ({
  selectedX,
  onSelectX,
}) => {
  const comparisonBenchmarks = [
    {
      x: 2,
      prob: '25%',
      label: 'Respuesta Rápida',
      badge: '1/4 de las peticiones',
      desc: 'Solo el 25% de los usuarios experimentan este tiempo súper veloz de 2 segundos o menos.',
      theme: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-900',
      activeTheme: 'ring-2 ring-blue-600 bg-blue-50 border-blue-400',
    },
    {
      x: 3,
      prob: '50%',
      label: 'Mediana / Promedio',
      badge: 'La mitad exacta (1/2)',
      desc: 'El 50% de las solicitudes se completan en 3 segundos o menos. Es el valor central simétrico de U(1,5).',
      theme: 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-900',
      activeTheme: 'ring-2 ring-indigo-600 bg-indigo-50 border-indigo-400',
    },
    {
      x: 4,
      prob: '75%',
      label: 'Mayoría de Tráfico',
      badge: '3/4 de las peticiones',
      desc: 'Tres cuartas partes de los usuarios han recibido su respuesta al cabo de 4 segundos.',
      theme: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900',
      activeTheme: 'ring-2 ring-emerald-600 bg-emerald-50 border-emerald-400',
    },
    {
      x: 5,
      prob: '100%',
      label: 'Límite Superior',
      badge: 'Totalidad (4/4)',
      desc: 'En 5 segundos, el 100% de las peticiones han sido resueltas. F(5) = 1.',
      theme: 'border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-purple-900',
      activeTheme: 'ring-2 ring-purple-600 bg-purple-50 border-purple-400',
    },
  ];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  ¿Qué ocurre al cambiar x?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Compara los puntos clave de la distribución uniforme y haz clic para mover el slider
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Haz clic sobre cualquier tarjeta</span>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonBenchmarks.map((item) => {
              const isSelected = Math.abs(selectedX - item.x) < 0.05;
              return (
                <button
                  key={item.x}
                  type="button"
                  onClick={() => onSelectX(item.x)}
                  className={`text-left rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected ? item.activeTheme : item.theme
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        {item.label}
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full shadow-2xs">
                          <Check className="w-3 h-3" /> Seleccionado
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded">
                          Clic para ver
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2 mb-2 font-mono">
                      <span className="text-2xl font-extrabold text-slate-900">
                        x = {item.x}s
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-2xl font-extrabold text-blue-600">
                        {item.prob}
                      </span>
                    </div>

                    <div className="inline-block text-[11px] font-semibold text-slate-600 bg-white/70 px-2 py-0.5 rounded-md mb-2">
                      {item.badge}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>F({item.x}) = {( (item.x - 1) / 4 ).toFixed(2)}</span>
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
