export default function Loading() {
  return (
    <div className="min-h-screen bg-birdseye-black flex flex-col items-center justify-center gap-6">
      {/* Wordmark */}
      <h1 className="font-sans font-bold tracking-[-0.01em] text-birdseye-cream text-2xl">
        BIRDSEYE
      </h1>

      {/* Pulsing loading line */}
      <div className="w-20 h-[2px] bg-birdseye-electric animate-pulse" />

      {/* Optional label */}
      <p className="system-label text-birdseye-cream/40 mt-4">
        Loading
      </p>
    </div>
  );
}
