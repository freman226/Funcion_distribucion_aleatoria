import React from 'react';
import { Server, Globe, ArrowRight, Zap, CheckCircle, HelpCircle, HardDrive } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Section title & badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Problema
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Definición formal y modelado del tiempo de respuesta
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span>Caso Práctico: Servidor Web HTTP</span>
            </div>
          </div>

          {/* Illustration and text layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual server illustration */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-inner relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  servidor-cluster-01.local
                </span>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/40">
                  HTTP GET /api/v1/data
                </span>
              </div>

              {/* Server diagram animation */}
              <div className="flex items-center justify-between gap-3 py-4">
                {/* Client node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-sm">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold mt-2 text-slate-300">Cliente</span>
                  <span className="text-[10px] text-slate-400">Navegador Web</span>
                </div>

                {/* Animated data transmission arrows */}
                <div className="flex-1 flex flex-col items-center px-2">
                  <div className="w-full flex items-center justify-center gap-1 text-[11px] font-mono text-slate-300 mb-1">
                    <span className="text-amber-400 font-bold">X</span>
                    <span>= Latencia</span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-pulse w-3/4" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span>Respuesta en [1, 5] s</span>
                  </div>
                </div>

                {/* Web Server node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/90 border border-blue-400/40 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold mt-2 text-white">Servidor</span>
                  <span className="text-[10px] text-blue-200">Backend API</span>
                </div>
              </div>

              {/* Latency meter banner */}
              <div className="mt-2 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Rango posible:
                </span>
                <span className="font-mono font-semibold text-emerald-300">
                  1.0s ≤ X ≤ 5.0s
                </span>
              </div>
            </div>

            {/* Problem statement text and distribution specifications */}
            <div className="lg:col-span-7 space-y-4">
              <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed bg-blue-50/50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                “Un sistema web recibe solicitudes de los usuarios. En condiciones normales, el tiempo de respuesta del servidor puede variar entre 1 y 5 segundos. Para simplificar el análisis, suponemos que el tiempo de respuesta <strong>X</strong> sigue una distribución uniforme entre 1 y 5 segundos.”
              </blockquote>

              <p className="text-sm text-slate-600">
                “Supongamos que el tiempo de respuesta de un servidor web se encuentra entre 1 y 5 segundos y que cualquier valor dentro de este intervalo es igualmente probable.”
              </p>

              {/* Key variables highlighted */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                  <div className="text-xs text-slate-500 font-medium">Distribución</div>
                  <div className="text-lg font-extrabold text-blue-700 font-mono mt-0.5">
                    X ~ U(1, 5)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Uniforme continua</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                  <div className="text-xs text-slate-500 font-medium">Tiempo Mínimo (a)</div>
                  <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                    1 segundo
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Límite inferior</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                  <div className="text-xs text-slate-500 font-medium">Tiempo Máximo (b)</div>
                  <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                    5 segundos
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Límite superior</div>
                </div>
              </div>

              {/* Formulas summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                {/* Density function f(x) */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <div className="font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>Función de Densidad f(x)</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      1 / (b - a)
                    </span>
                  </div>
                  <div className="font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-0.5">
                    <div>f(x) = 1/4, si 1 ≤ x ≤ 5</div>
                    <div>f(x) = 0, en otro caso</div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    La altura es constante en <strong>0.25</strong>. El área total bajo la curva en [1, 5] es 4 × 0.25 = 1.
                  </p>
                </div>

                {/* Cumulative distribution function F(x) */}
                <div className="border border-blue-200 rounded-xl p-3.5 bg-blue-50/40">
                  <div className="font-bold text-blue-900 mb-1.5 flex items-center justify-between">
                    <span>Función Acumulada F(x)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                      P(X ≤ x)
                    </span>
                  </div>
                  <div className="font-mono text-slate-700 bg-white p-2 rounded-lg border border-blue-100 space-y-0.5 text-[11px]">
                    <div>F(x) = 0, si x &lt; 1</div>
                    <div>F(x) = (x - 1) / 4, si 1 ≤ x ≤ 5</div>
                    <div>F(x) = 1, si x &gt; 5</div>
                  </div>
                  <p className="text-[11px] text-blue-800 mt-1.5 font-medium">
                    <strong>F(x) = P(X ≤ x):</strong> probabilidad de que el servidor responda en ≤ x segundos.
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
