import FeaturedSneakers from '@/components/FeaturedSneakers';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedSneakers />
    </div>
  );
}