import { Container } from "@/components/ui/Container";
import { Nav } from "@/components/site/Nav";

export function ResourceArchiveSkeleton() {
  return (
    <div className="min-h-screen bg-birdseye-black">
      <Nav />

      {/* Hero skeleton */}
      <section className="section-dark py-20 border-b border-birdseye-cream/10">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="h-4 bg-birdseye-cream/[0.05] rounded w-32 mb-6 animate-pulse" />
            <div className="h-16 bg-birdseye-cream/[0.05] rounded w-full mb-4 animate-pulse" />
            <div className="h-6 bg-birdseye-cream/[0.05] rounded w-2/3 animate-pulse" />
          </div>
        </Container>
      </section>

      {/* Grid skeleton */}
      <section className="section-dark py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="h-48 bg-birdseye-cream/[0.05] rounded animate-pulse" />
                <div className="h-4 bg-birdseye-cream/[0.05] rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-birdseye-cream/[0.05] rounded w-full animate-pulse" />
                <div className="h-3 bg-birdseye-cream/[0.05] rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-birdseye-cream/[0.05] rounded w-1/3 mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
