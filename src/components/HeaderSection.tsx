import React from 'react';
import { Sparkles, Gauge, BookOpen, Clock } from 'lucide-react';

export const HeaderSection: React.FC = () => {
  return (
    <section id="inicio" className="pt-8 pb-6 sm:pt-12 sm:pb-8">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Academic tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-4 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Probabilidad & Estadística Aplicada a la Computación</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Función de distribución de una variable aleatoria continua
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-lg sm:text-xl font-semibold text-blue-600">
          Ejemplo interactivo: tiempo de respuesta de un servidor web
        </p>

        {/* Brief Explanation */}
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Explora cómo cambia la probabilidad acumulada al modificar el tiempo de respuesta. 
          Descubre de manera gráfica e intuitiva la relación entre la función de densidad <span className="font-mono font-bold text-slate-800">f(x)</span> y la función de distribución acumulada <span className="font-mono font-bold text-slate-800">F(x) = P(X ≤ x)</span>.
        </p>

        {/* Quick concept cards / badges */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Intervalo continuo: <strong>[1, 5] s</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span>Distribución: <strong>Uniforme U(1,5)</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Área bajo la curva = <strong>Probabilidad</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
