import SneakerGrid from '@/components/SneakerGrid';

export default function FeaturedSneakers() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Sneakers</h2>
      <SneakerGrid limit={6} featuredOnly={true} />
    </section>
  );
}