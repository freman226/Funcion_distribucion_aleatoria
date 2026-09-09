import React from 'react';
import { Server, GraduationCap, Github, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            <Server className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-800">
            Probabilidad & Estadística | V.A. Continua U(1,5)
          </span>
        </div>

        <div className="text-center sm:text-right text-slate-500">
          <p>Herramienta interactiva para estudiantes y docentes universitarios.</p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            F(x) = P(X ≤ x) = (x - 1) / 4 para 1 ≤ x ≤ 5.
          </p>
        </div>
      </div>
    </footer>
  );
};
