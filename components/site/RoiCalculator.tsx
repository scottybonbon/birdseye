"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Birdseye ROI Calculator, inspired by the team's Figma Make calculator.
 * Inputs reflect typical inputs an operator would understand; outputs
 * highlight time saved, labor saved, and annual ROI.
 *
 * Math:
 *   Time saved per truck = (current process minutes) × 0.75   (75% faster claim)
 *   Trucks per year = trucks/day × 365
 *   Hours saved per year = trucks/year × time saved / 60
 *   Labor savings = hours saved × labor rate
 *   Net annual savings = labor savings - estimated annual program cost
 */

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const NUM = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function RoiCalculator() {
  const [trucksPerDay, setTrucksPerDay] = useState(120);
  const [currentMinutes, setCurrentMinutes] = useState(8);
  const [laborRate, setLaborRate] = useState(28);
  const [annualCost, setAnnualCost] = useState(60_000);

  const results = useMemo(() => {
    const minutesSaved = currentMinutes * 0.75; // Birdseye's 75% faster claim
    const trucksPerYear = trucksPerDay * 365;
    const hoursSaved = (trucksPerYear * minutesSaved) / 60;
    const laborSavings = hoursSaved * laborRate;
    const netSavings = laborSavings - annualCost;
    const roi = annualCost > 0 ? (netSavings / annualCost) * 100 : 0;
    return {
      minutesSaved,
      trucksPerYear,
      hoursSaved,
      laborSavings,
      netSavings,
      roi,
    };
  }, [trucksPerDay, currentMinutes, laborRate, annualCost]);

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-birdseye-border bg-birdseye-surface/40 p-6 md:p-8">
        <p className="text-eyebrow text-brand-500 uppercase">ROI Calculator</p>
        <h3 className="mt-2 font-sans text-[28px] leading-[34px] md:text-[34px] md:leading-[40px] text-birdseye-cream font-medium">
          See your numbers.
        </h3>
        <p className="mt-3 text-body text-birdseye-cream/55">
          Slide the inputs to match your operation. Results update live.
        </p>

        <div className="mt-8 space-y-6">
          <Slider
            label="Trucks per day"
            value={trucksPerDay}
            onChange={setTrucksPerDay}
            min={20}
            max={500}
            step={10}
            format={(v) => NUM.format(v)}
          />
          <Slider
            label="Current minutes per gate event"
            value={currentMinutes}
            onChange={setCurrentMinutes}
            min={3}
            max={20}
            step={1}
            format={(v) => `${v} min`}
          />
          <Slider
            label="Labor rate ($/hour, fully loaded)"
            value={laborRate}
            onChange={setLaborRate}
            min={18}
            max={60}
            step={1}
            format={(v) => CURRENCY.format(v)}
          />
          <Slider
            label="Estimated Birdseye program cost / year"
            value={annualCost}
            onChange={setAnnualCost}
            min={20_000}
            max={250_000}
            step={5_000}
            format={(v) => CURRENCY.format(v)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="relative rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/[0.08] via-ink-800/60 to-ink-900 p-6 md:p-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />

        <p className="text-eyebrow text-brand-500 uppercase">Annual impact</p>
        <h3 className="mt-2 font-sans text-[28px] leading-[34px] md:text-[34px] md:leading-[40px] text-birdseye-cream font-medium">
          Your projected savings.
        </h3>

        <div className="mt-8 space-y-6">
          <Stat
            label="Hours saved per year"
            value={NUM.format(results.hoursSaved)}
            unit="hours"
          />
          <Stat
            label="Trucks processed per year"
            value={NUM.format(results.trucksPerYear)}
          />
          <Stat
            label="Gross labor savings"
            value={CURRENCY.format(results.laborSavings)}
            tone="positive"
          />
          <Stat
            label="Net annual savings"
            value={CURRENCY.format(results.netSavings)}
            unit={`${results.roi.toFixed(0)}% ROI`}
            tone="positive"
            big
          />
        </div>

        <p className="mt-8 text-[12px] leading-[18px] text-birdseye-cream/40">
          Estimates only. Actual savings depend on your current setup, hours of
          operation, and which Birdseye cores you deploy. Talk to us for a
          tailored model.
        </p>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[12.5px] uppercase tracking-[0.14em] text-birdseye-cream/55">
          {label}
        </label>
        <span className="font-sans text-[18px] text-birdseye-cream tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-1.5 rounded-full appearance-none cursor-pointer bg-ink-700 outline-none accent-brand-500"
        style={{
          background: `linear-gradient(to right, rgb(46 75 255) 0%, rgb(46 75 255) ${pct}%, rgb(34 50 74) ${pct}%, rgb(34 50 74) 100%)`,
        }}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  tone,
  big,
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "positive";
  big?: boolean;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.5, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASE_OUT }}
      className="flex items-baseline justify-between gap-3 border-b border-birdseye-border/50 pb-4 last:border-0"
    >
      <span className="text-body-sm text-birdseye-cream/60">{label}</span>
      <span className="text-right">
        <span
          className={
            big
              ? "font-sans text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] text-birdseye-cream font-medium tabular-nums"
              : "font-sans text-[20px] md:text-[24px] text-birdseye-cream tabular-nums"
          }
        >
          {value}
        </span>
        {unit && (
          <span className={`ml-2 ${tone === "positive" ? "text-success" : "text-birdseye-cream/45"} text-body-sm`}>
            {unit}
          </span>
        )}
      </span>
    </motion.div>
  );
}
