import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCarStore from "@/store/useCarStore";

export default function CartDialog() {
  const [open, setOpen] = useState(false);
  const { cart, cars, removeFromCart, clearCart } = useCarStore();
  const cartItems = cars.filter((car) => cart[car.id]);
  const cartCount = Object.values(cart).reduce((acc, val) => acc + val, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>savat</DialogTitle>
        </DialogHeader>
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">savat hozircha bo'sh</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((car) => (
              <div
                key={car.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-semibold">{car.name}</p>
                  <p className="text-sm text-gray-500">
                    {cart[car.id]} x ${car.price}
                  </p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => removeFromCart(car.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button onClick={clearCart} variant="destructive" className="w-full">
              hammasini o'chirish
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}