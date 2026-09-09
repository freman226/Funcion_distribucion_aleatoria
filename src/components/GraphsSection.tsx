import React, { useRef } from 'react';
import { AreaChart, TrendingUp, Info } from 'lucide-react';

interface GraphsSectionProps {
  minTime: number; // a, default 1
  maxTime: number; // b, default 5
  selectedX: number; // x, default 3
  onSelectX: (x: number) => void;
}

export const GraphsSection: React.FC<GraphsSectionProps> = ({
  minTime,
  maxTime,
  selectedX,
  onSelectX,
}) => {
  // Density height: 1 / (b - a)
  const densityHeight = maxTime > minTime ? 1 / (maxTime - minTime) : 0;
  
  // CDF value at selectedX
  const cdfValue =
    selectedX <= minTime
      ? 0
      : selectedX >= maxTime
      ? 1
      : (selectedX - minTime) / (maxTime - minTime);

  // SVG coordinate systems
  // ViewBox: 0 0 540 320
  const svgWidth = 540;
  const svgHeight = 300;
  const padding = { top: 35, right: 35, bottom: 50, left: 55 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Domain for X: e.g. [0, maxTime + 1.5]
  const xMinDomain = Math.max(0, minTime - 1);
  const xMaxDomain = maxTime + 1.5;

  // Scale functions
  const scaleX = (x: number) => {
    return padding.left + ((x - xMinDomain) / (xMaxDomain - xMinDomain)) * plotWidth;
  };

  const unscaleX = (pixelX: number) => {
    const norm = (pixelX - padding.left) / plotWidth;
    const rawVal = xMinDomain + norm * (xMaxDomain - xMinDomain);
    return Math.min(maxTime, Math.max(minTime, Number(rawVal.toFixed(2))));
  };

  // Y scale for Density f(x): [0, 0.40] or slightly above densityHeight
  const yMaxDensity = Math.max(0.35, densityHeight * 1.4);
  const scaleYDensity = (y: number) => {
    return padding.top + plotHeight - (y / yMaxDensity) * plotHeight;
  };

  // Y scale for CDF F(x): [0, 1.15]
  const yMaxCDF = 1.15;
  const scaleYCDF = (y: number) => {
    return padding.top + plotHeight - (y / yMaxCDF) * plotHeight;
  };

  // Handlers for click / drag on SVG
  const densitySvgRef = useRef<SVGSVGElement | null>(null);
  const cdfSvgRef = useRef<SVGSVGElement | null>(null);

  const handleSvgInteraction = (
    e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
    svgRef: React.RefObject<SVGSVGElement | null>
  ) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pixelX = ((clientX - rect.left) / rect.width) * svgWidth;
    const newX = unscaleX(pixelX);
    onSelectX(newX);
  };

  // Coordinates for density plot
  const xA = scaleX(minTime);
  const xB = scaleX(maxTime);
  const xSelected = scaleX(selectedX);
  const yZero = scaleYDensity(0);
  const yDensity = scaleYDensity(densityHeight);

  // Shaded area path for Density
  // From minTime to selectedX
  const shadedDensityPath = `
    M ${xA} ${yZero}
    L ${xA} ${yDensity}
    L ${xSelected} ${yDensity}
    L ${xSelected} ${yZero}
    Z
  `;

  // Entire uniform box path
  const fullDensityBox = `
    M ${xA} ${yZero}
    L ${xA} ${yDensity}
    L ${xB} ${yDensity}
    L ${xB} ${yZero}
    Z
  `;

  // Ticks for X axis (integer or 0.5 increments)
  const xTicks: number[] = [];
  const startTick = Math.ceil(xMinDomain);
  const endTick = Math.floor(xMaxDomain);
  for (let t = startTick; t <= endTick; t += 1) {
    xTicks.push(t);
  }

  // Ticks for Density Y axis
  const densityYTicks = [0, 0.1, 0.2, 0.25, 0.3];

  // Coordinates for CDF plot
  const yCDFZero = scaleYCDF(0);
  const yCDFOne = scaleYCDF(1);
  const yCDFSelected = scaleYCDF(cdfValue);

  // Ticks for CDF Y axis
  const cdfYTicks = [0, 0.25, 0.5, 0.75, 1.0];

  return (
    <section id="distribucion" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <AreaChart className="w-6 h-6 text-blue-600" />
              Gráficos de Densidad y Distribución Acumulada
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Arrastra o haz clic en cualquier gráfico para cambiar el valor de <strong>x</strong>
            </p>
          </div>
          <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 self-start sm:self-auto">
            <Info className="w-4 h-4" />
            <span>Sincronizados en tiempo real</span>
          </div>
        </div>

        {/* Two graphs side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ==================================================== */}
          {/* 1. DENSITY FUNCTION f(x) */}
          {/* ==================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    f(x)
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Función de densidad f(x)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Distribución uniforme continua U({minTime}, {maxTime})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                    f(x) = {densityHeight.toFixed(2)} (1/4)
                  </span>
                </div>
              </div>

              {/* Density SVG Chart */}
              <div className="relative select-none touch-none bg-slate-50/50 rounded-xl p-2 border border-slate-100">
                <svg
                  ref={densitySvgRef}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto cursor-ew-resize"
                  onClick={(e) => handleSvgInteraction(e, densitySvgRef)}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) handleSvgInteraction(e, densitySvgRef);
                  }}
                  onTouchMove={(e) => handleSvgInteraction(e, densitySvgRef)}
                >
                  <defs>
                    {/* Pattern for shaded probability area */}
                    <pattern
                      id="densityAreaPattern"
                      width="12"
                      height="12"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y1="0" x2="0" y2="12" stroke="#3b82f6" strokeWidth="2.5" opacity="0.25" />
                    </pattern>
                    <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {densityYTicks.map((yVal) => {
                    const yPos = scaleYDensity(yVal);
                    return (
                      <g key={yVal}>
                        <line
                          x1={padding.left}
                          y1={yPos}
                          x2={svgWidth - padding.right}
                          y2={yPos}
                          stroke="#e2e8f0"
                          strokeDasharray={yVal === 0 ? undefined : '3,3'}
                          strokeWidth={yVal === 0 ? '1.5' : '1'}
                        />
                        <text
                          x={padding.left - 8}
                          y={yPos + 4}
                          textAnchor="end"
                          fontSize="11"
                          fontFamily="monospace"
                          fill="#64748b"
                        >
                          {yVal.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Grid lines and X Ticks */}
                  {xTicks.map((xVal) => {
                    const xPos = scaleX(xVal);
                    return (
                      <g key={xVal}>
                        <line
                          x1={xPos}
                          y1={padding.top}
                          x2={xPos}
                          y2={padding.top + plotHeight}
                          stroke="#f1f5f9"
                          strokeWidth="1"
                        />
                        <line
                          x1={xPos}
                          y1={padding.top + plotHeight}
                          x2={xPos}
                          y2={padding.top + plotHeight + 5}
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                        />
                        <text
                          x={xPos}
                          y={padding.top + plotHeight + 18}
                          textAnchor="middle"
                          fontSize="11"
                          fontFamily="monospace"
                          fontWeight={xVal === minTime || xVal === maxTime ? 'bold' : 'normal'}
                          fill={xVal === minTime || xVal === maxTime ? '#1e293b' : '#64748b'}
                        >
                          {xVal}s
                        </text>
                      </g>
                    );
                  })}

                  {/* Full Uniform Rectangle Outline (Ghost) */}
                  <path
                    d={fullDensityBox}
                    fill="#f8fafc"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />

                  {/* Shaded Area from a to x */}
                  <path d={shadedDensityPath} fill="url(#densityGradient)" />
                  <path d={shadedDensityPath} fill="url(#densityAreaPattern)" />
                  <path
                    d={shadedDensityPath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  {/* Outer active density line f(x) = 1/4 */}
                  <line
                    x1={xA}
                    y1={yDensity}
                    x2={xB}
                    y2={yDensity}
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  {/* Drop lines at a and b */}
                  <line x1={xA} y1={yDensity} x2={xA} y2={yZero} stroke="#2563eb" strokeWidth="2" />
                  <line x1={xB} y1={yDensity} x2={xB} y2={yZero} stroke="#94a3b8" strokeWidth="1.5" />

                  {/* Dynamic Vertical Line for Selected x */}
                  <line
                    x1={xSelected}
                    y1={padding.top - 5}
                    x2={xSelected}
                    y2={yZero}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeDasharray="5,3"
                  />

                  {/* Top marker label for selected x on density */}
                  <g transform={`translate(${xSelected}, ${padding.top - 12})`}>
                    <rect
                      x="-36"
                      y="-16"
                      width="72"
                      height="20"
                      rx="6"
                      fill="#dc2626"
                    />
                    <text
                      x="0"
                      y="-2"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#ffffff"
                      fontFamily="monospace"
                    >
                      x = {selectedX.toFixed(2)}s
                    </text>
                  </g>

                  {/* Shaded Area Label inside rectangle if there is enough space */}
                  {selectedX - minTime >= 0.7 && (
                    <g transform={`translate(${(xA + xSelected) / 2}, ${(yZero + yDensity) / 2})`}>
                      <rect
                        x="-48"
                        y="-12"
                        width="96"
                        height="24"
                        rx="6"
                        fill="#ffffff"
                        opacity="0.95"
                        stroke="#bfdbfe"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#1d4ed8"
                        fontFamily="monospace"
                      >
                        Área = {cdfValue.toFixed(2)}
                      </text>
                    </g>
                  )}

                  {/* Axes labels */}
                  <text
                    x={svgWidth / 2}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#475569"
                  >
                    Tiempo de respuesta (segundos)
                  </text>
                  <text
                    x={-((padding.top + plotHeight) / 2)}
                    y="16"
                    textAnchor="middle"
                    transform="rotate(-90)"
                    fontSize="11"
                    fontWeight="600"
                    fill="#475569"
                  >
                    f(x) (Densidad)
                  </text>
                </svg>
              </div>
            </div>

            {/* Density Explanation Footer */}
            <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-blue-900 flex items-center justify-between">
                <span>Área sombreada = Base × Altura:</span>
                <span className="font-mono font-bold text-blue-700">
                  P(X ≤ {selectedX.toFixed(2)}) = {cdfValue.toFixed(2)} ({ (cdfValue * 100).toFixed(1) }%)
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Base = ({selectedX.toFixed(2)} - {minTime}) = <strong>{(selectedX - minTime).toFixed(2)}s</strong> | Altura f(x) = <strong>1/4 = 0.25</strong>. 
                El área del rectángulo azul es exactamente la probabilidad acumulada.
              </p>
            </div>
          </div>

          {/* ==================================================== */}
          {/* 2. CUMULATIVE DISTRIBUTION FUNCTION F(x) */}
          {/* ==================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    F(x)
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Función de distribución acumulada F(x)
                    </h3>
                    <p className="text-xs text-slate-500">
                      F(x) = P(X ≤ x) — Crecimiento lineal en [1, 5]
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    F({selectedX.toFixed(2)}) = {cdfValue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CDF SVG Chart */}
              <div className="relative select-none touch-none bg-slate-50/50 rounded-xl p-2 border border-slate-100">
                <svg
                  ref={cdfSvgRef}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto cursor-ew-resize"
                  onClick={(e) => handleSvgInteraction(e, cdfSvgRef)}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) handleSvgInteraction(e, cdfSvgRef);
                  }}
                  onTouchMove={(e) => handleSvgInteraction(e, cdfSvgRef)}
                >
                  {/* Horizontal Grid lines */}
                  {cdfYTicks.map((yVal) => {
                    const yPos = scaleYCDF(yVal);
                    return (
                      <g key={yVal}>
                        <line
                          x1={padding.left}
                          y1={yPos}
                          x2={svgWidth - padding.right}
                          y2={yPos}
                          stroke="#e2e8f0"
                          strokeDasharray={yVal === 0 ? undefined : '3,3'}
                          strokeWidth={yVal === 0 ? '1.5' : '1'}
                        />
                        <text
                          x={padding.left - 8}
                          y={yPos + 4}
                          textAnchor="end"
                          fontSize="11"
                          fontFamily="monospace"
                          fill="#64748b"
                        >
                          {yVal === 1 ? '1.00 (100%)' : yVal.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Grid lines and X Ticks */}
                  {xTicks.map((xVal) => {
                    const xPos = scaleX(xVal);
                    return (
                      <g key={xVal}>
                        <line
                          x1={xPos}
                          y1={padding.top}
                          x2={xPos}
                          y2={padding.top + plotHeight}
                          stroke="#f1f5f9"
                          strokeWidth="1"
                        />
                        <line
                          x1={xPos}
                          y1={padding.top + plotHeight}
                          x2={xPos}
                          y2={padding.top + plotHeight + 5}
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                        />
                        <text
                          x={xPos}
                          y={padding.top + plotHeight + 18}
                          textAnchor="middle"
                          fontSize="11"
                          fontFamily="monospace"
                          fontWeight={xVal === minTime || xVal === maxTime ? 'bold' : 'normal'}
                          fill={xVal === minTime || xVal === maxTime ? '#1e293b' : '#64748b'}
                        >
                          {xVal}s
                        </text>
                      </g>
                    );
                  })}

                  {/* CDF Curve piecewise */}
                  {/* Segment 1: x < a => F(x) = 0 */}
                  <line
                    x1={scaleX(xMinDomain)}
                    y1={yCDFZero}
                    x2={xA}
                    y2={yCDFZero}
                    stroke="#059669"
                    strokeWidth="3.5"
                  />

                  {/* Segment 2: a <= x <= b => linear ramp from (a, 0) to (b, 1) */}
                  <line
                    x1={xA}
                    y1={yCDFZero}
                    x2={xB}
                    y2={yCDFOne}
                    stroke="#059669"
                    strokeWidth="3.5"
                  />

                  {/* Segment 3: x > b => F(x) = 1 */}
                  <line
                    x1={xB}
                    y1={yCDFOne}
                    x2={scaleX(xMaxDomain)}
                    y2={yCDFOne}
                    stroke="#059669"
                    strokeWidth="3.5"
                  />

                  {/* Drop line from (x, F(x)) down to x axis */}
                  <line
                    x1={xSelected}
                    y1={yCDFSelected}
                    x2={xSelected}
                    y2={yCDFZero}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeDasharray="5,3"
                  />

                  {/* Horizontal line from (x, F(x)) to Y axis */}
                  <line
                    x1={padding.left}
                    y1={yCDFSelected}
                    x2={xSelected}
                    y2={yCDFSelected}
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />

                  {/* Prominent Highlighted Point at (x, F(x)) */}
                  <circle
                    cx={xSelected}
                    cy={yCDFSelected}
                    r="8"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="3"
                    className="filter drop-shadow-md"
                  />
                  <circle
                    cx={xSelected}
                    cy={yCDFSelected}
                    r="3"
                    fill="#ffffff"
                  />

                  {/* Callout box next to the point */}
                  <g
                    transform={`translate(${
                      xSelected > svgWidth - 140 ? xSelected - 130 : xSelected + 15
                    }, ${Math.max(padding.top + 10, yCDFSelected - 25)})`}
                  >
                    <rect
                      x="0"
                      y="0"
                      width="120"
                      height="38"
                      rx="8"
                      fill="#064e3b"
                      opacity="0.95"
                      stroke="#34d399"
                      strokeWidth="1.5"
                    />
                    <text
                      x="10"
                      y="16"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#a7f3d0"
                      fontFamily="monospace"
                    >
                      ({selectedX.toFixed(2)}, {cdfValue.toFixed(2)})
                    </text>
                    <text
                      x="10"
                      y="30"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#ffffff"
                      fontFamily="monospace"
                    >
                      P(X ≤ {selectedX.toFixed(1)}) = {(cdfValue * 100).toFixed(0)}%
                    </text>
                  </g>

                  {/* Axes labels */}
                  <text
                    x={svgWidth / 2}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#475569"
                  >
                    Tiempo de respuesta (segundos)
                  </text>
                  <text
                    x={-((padding.top + plotHeight) / 2)}
                    y="16"
                    textAnchor="middle"
                    transform="rotate(-90)"
                    fontSize="11"
                    fontWeight="600"
                    fill="#475569"
                  >
                    F(x) = P(X ≤ x)
                  </text>
                </svg>
              </div>
            </div>

            {/* CDF Explanation Footer */}
            <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-emerald-950 flex items-center justify-between">
                <span>Punto exacto (x, F(x)):</span>
                <span className="font-mono font-bold text-emerald-700">
                  F({selectedX.toFixed(2)}) = {cdfValue.toFixed(2)} → {(cdfValue * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Empieza en 0 (antes de 1s), asciende con pendiente constante <strong>1/4 = 0.25</strong> hasta alcanzar 1.0 (en 5s), y permanece en 1 para todo tiempo posterior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
