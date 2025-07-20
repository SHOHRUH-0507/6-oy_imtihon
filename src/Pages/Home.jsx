import { useEffect } from "react";
import useCarStore from "@/store/useCarStore";
import CarCard from "@/components/CarCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { fetchCars, loading, error, cars, lang } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [lang]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">hatolik: {error}</p>;

  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}