import { Button } from "@/components/ui/button";
import CartDialog from "./CartDialog";
import useCarStore from "@/store/useCarStore";

export default function Header() {
  const { lang, setLang, cart, cars } = useCarStore();

  const cartItems = cars.filter((car) => cart[car.id]);
  const totalPrice = cartItems.reduce(
    (acc, car) => acc + car.price * cart[car.id],
    0
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Mini store app</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          ${totalPrice}
        </span>
        <CartDialog />
      </div>
      <div className="flex gap-2">
        {["uz", "ru", "en"].map((lng) => (
          <Button
            key={lng}
            onClick={() => setLang(lng)}
            variant={lang === lng ? "default" : "outline"}
          >
            {lng.toUpperCase()}
          </Button>
        ))}
      </div>
    </header>
  );
}