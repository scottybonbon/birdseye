import { DUR, EASE_OUT } from "@/_design/motion";

export type CustomerStoryPanelProps = {
  stat: { value: string; eyebrow: string; label: string };
  story: { eyebrow: string; quote: string; name: string; role: string };
};

export function CustomerStoryPanel({ stat, story }: CustomerStoryPanelProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-stretch">
      {/* Left: stat card */}
      <div className="bg-birdseye-surface border border-birdseye-cream/[0.10] rounded-3xl p-8 md:p-10 flex flex-col justify-between">
        <div>
          <span className="system-label text-birdseye-electric">{stat.eyebrow}</span>
          <div className="mt-8 md:mt-12">
            <div className="text-[clamp(3.5rem,8vw,5rem)] leading-[1] font-bold text-birdseye-electric tracking-[-0.025em]">
              {stat.value}
            </div>
          </div>
        </div>
        <p className="mt-6 text-body text-birdseye-cream/65 leading-[1.6]">
          {stat.label}
        </p>
      </div>

      {/* Right: story card (electric bg) */}
      <div className="bg-birdseye-electric rounded-3xl p-8 md:p-10 flex flex-col justify-between">
        <div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/60">
            {story.eyebrow}
          </span>
          <blockquote className="mt-6 text-[clamp(1.125rem,2vw,1.375rem)] leading-[1.5] font-normal text-birdseye-cream">
            "{story.quote}"
          </blockquote>
        </div>
        <footer className="mt-8">
          <p className="text-[14px] font-medium text-birdseye-cream">
           , {story.name}
          </p>
          <p className="text-[13px] text-birdseye-cream/70 mt-1">{story.role}</p>
        </footer>
      </div>
    </div>
  );
}
