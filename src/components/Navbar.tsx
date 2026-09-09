import React, { useState } from 'react';
import { Server, BarChart2, Activity, Menu, X, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  selectedX: number;
  probPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({ selectedX, probPercent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Problema', href: '#problema' },
    { label: 'Distribución', href: '#distribucion' },
    { label: 'Interacción', href: '#interaccion' },
    { label: 'Simulación', href: '#simulacion' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#inicio');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <span>Probabilidad & Estadística</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  U(1,5)
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium hidden sm:block">
                Variable Aleatoria Continua: Tiempo de Servidor
              </div>
            </div>
          </a>

          {/* Navigation links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Live quick badge & mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-slate-100/90 border border-slate-200 rounded-full px-3.5 py-1 text-xs font-semibold text-slate-700">
              <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>x = <strong className="text-blue-700">{selectedX.toFixed(2)}s</strong></span>
              <span className="text-slate-300">|</span>
              <span>P(X ≤ x) = <strong className="text-emerald-700">{probPercent.toFixed(1)}%</strong></span>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="mb-3 px-3 py-2 bg-blue-50/80 rounded-lg text-xs font-semibold text-blue-900 flex items-center justify-between">
            <span>Tiempo: {selectedX.toFixed(2)}s</span>
            <span>Probabilidad: {probPercent.toFixed(1)}%</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
