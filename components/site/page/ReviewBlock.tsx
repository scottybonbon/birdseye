import Image from "next/image";

export type ReviewBlockProps = {
  eyebrow?: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
};

export function ReviewBlock({
  eyebrow,
  quote,
  name,
  role,
  image,
  imageAlt = "Review imagery",
}: ReviewBlockProps) {
  return (
    <div className="bg-birdseye-surface border border-birdseye-cream/[0.10] rounded-3xl overflow-hidden">
      <div className="grid md:grid-cols-[1fr_0.8fr] items-stretch min-h-[480px]">
        {/* Left column: text */}
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          {eyebrow && (
            <span className="system-label text-birdseye-electric">{eyebrow}</span>
          )}
          <blockquote className="mt-6 text-[clamp(1.25rem,2.5vw,1.625rem)] leading-[1.4] font-normal text-birdseye-cream">
            "{quote}"
          </blockquote>
          <footer className="mt-8">
            <p className="text-[14px] font-medium text-birdseye-cream">
              {name}
            </p>
            <p className="text-[13px] text-birdseye-cream/65 mt-1">{role}</p>
          </footer>
        </div>

        {/* Right column: image */}
        <div className="relative hidden md:block overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
