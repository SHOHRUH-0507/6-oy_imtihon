import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCarStore from "@/store/useCarStore";

export default function CarCard({ car }) {
  const { cart, addToCart, increment, decrement } = useCarStore();
  const count = cart[car.id] || 0;

  return (
    <Card className="hover:shadow-lg transition ">
      <CardHeader>
        <CardTitle className="text-3xl">{car.name}</CardTitle>
        <CardDescription>
          {car.category} - {car.brand}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{car.description}</p>
        <p className="font-bold text-lg text-green-600">${car.price}</p>

        {count === 0 ? (
          <Button onClick={() => addToCart(car.id)} className="w-full">
            qo'shish
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => decrement(car.id)} variant="outline">−</Button>
            <span className="font-bold">{count}</span>
            <Button onClick={() => increment(car.id)} variant="outline">+</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}