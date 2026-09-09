/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeaderSection } from './components/HeaderSection';
import { ProblemSection } from './components/ProblemSection';
import { DistributionExplorer } from './components/DistributionExplorer';
import { GraphsSection } from './components/GraphsSection';
import { VisualComparisonSection } from './components/VisualComparisonSection';
import { SimulationSection } from './components/SimulationSection';
import { Footer } from './components/Footer';

export default function App() {
  const [minTime, setMinTime] = useState<number>(1);
  const [maxTime, setMaxTime] = useState<number>(5);
  const [selectedX, setSelectedX] = useState<number>(3);

  // Probability calculation
  const prob = (selectedX - minTime) / (maxTime - minTime);
  const clampedProb = Math.max(0, Math.min(1, prob));
  const probPercent = clampedProb * 100;

  const handleSelectX = (val: number) => {
    const clamped = Math.min(maxTime, Math.max(minTime, Number(val.toFixed(2))));
    setSelectedX(clamped);
  };

  const handleMinTimeChange = (newMin: number) => {
    setMinTime(newMin);
    if (selectedX < newMin) {
      setSelectedX(newMin);
    }
  };

  const handleMaxTimeChange = (newMax: number) => {
    setMaxTime(newMax);
    if (selectedX > newMax) {
      setSelectedX(newMax);
    }
  };

  const handleResetDefaults = () => {
    setMinTime(1);
    setMaxTime(5);
    setSelectedX(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Sticky top navigation bar */}
      <Navbar selectedX={selectedX} probPercent={probPercent} />

      <main className="flex-1 space-y-4 pb-12">
        {/* Section 3: Header */}
        <HeaderSection />

        {/* Section 4: Problem Statement */}
        <ProblemSection />

        {/* Section 5: Main Interactive Control Panel */}
        <DistributionExplorer
          minTime={minTime}
          maxTime={maxTime}
          selectedX={selectedX}
          onChangeSelectedX={handleSelectX}
          onChangeMinTime={handleMinTimeChange}
          onChangeMaxTime={handleMaxTimeChange}
          onResetDefaults={handleResetDefaults}
        />

        {/* Sections 6 & 7: Density f(x) and Cumulative F(x) Graphs */}
        <GraphsSection
          minTime={minTime}
          maxTime={maxTime}
          selectedX={selectedX}
          onSelectX={handleSelectX}
        />

        {/* Section 10: Visual Comparison Shortcuts */}
        <VisualComparisonSection
          selectedX={selectedX}
          onSelectX={handleSelectX}
        />

        {/* Section 12: Request Simulation & Monte Carlo Histogram */}
        <SimulationSection
          minTime={minTime}
          maxTime={maxTime}
          selectedX={selectedX}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
