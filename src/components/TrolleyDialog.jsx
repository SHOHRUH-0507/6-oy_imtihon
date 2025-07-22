import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, X } from "lucide-react";
import useAutoStore from "@/store/useAutoStore";

export default function TrolleyDialog() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  const { Trolley, cars, removeFromTrolley, clearTrolley } = useAutoStore();
  const TrolleyItems = cars.filter((car) => Trolley[car.id]);
  const TrolleyCount = Object.values(Trolley).reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)} className="relative">
        <ShoppingCart className="w-6 h-6" />
        {TrolleyCount > 0 && (
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
            {TrolleyCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={dialogRef}
            className="bg-white w-full max-w-md p-6 rounded-md shadow-xl relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Korzina</h2>

            {TrolleyItems.length === 0 ? (
              <p className="text-sm text-red-500">Korzinani ichi bo'sh</p>
            ) : (
              <div className="space-y-4">
                {TrolleyItems.map((car) => (
                  <div
                    key={car.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <div>
                      <p className="font-semibold">{car.name}</p>
                      <p className="text-sm text-red-500">
                        {Trolley[car.id]} x ${car.price}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromTrolley(car.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={clearTrolley}
                  variant="destructive"
                  className="w-full"
                >
                  hammasini o'chirish
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}