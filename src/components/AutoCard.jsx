import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAutoStore from "@/store/useAutoStore";

export default function AutoCard({ car }) {
  const { increment, decrement, Trolley, addToTrolley,  } = useAutoStore();
  const count = Trolley[car.id] || 0;

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
          <Button onClick={() => addToTrolley(car.id)} className="w-20">
            buy
          </Button> 
        ) : (
          <div className="flex items-center gap-2">
            <Button onClick={() => decrement(car.id)} variant="outline">−</Button>
            <span className="font-bold">{count}</span>
            <Button onClick={() => increment(car.id)} variant="outline">+</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
