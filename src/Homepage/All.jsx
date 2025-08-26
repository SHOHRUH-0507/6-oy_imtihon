import { useEffect } from "react";
import useAutoStore from "@/store/useAutoStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import AutoCard from "@/components/AutoCard";


export default function All() {
  const { lang , fetchCars, loading, error, cars } = useAutoStore();

  useEffect(() => {
    fetchCars();
  }, [lang]);

  if (loading) {
    return (
      <div className="gap-4 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-6 w-8/12" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-5 w-2/10" />
            <Skeleton className="h-5 w-2/8" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">404 NOT FOUND: {error}</p>;

  return (
    <main className="space-y-6 p-6">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {cars.map((car) => (
          <AutoCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}