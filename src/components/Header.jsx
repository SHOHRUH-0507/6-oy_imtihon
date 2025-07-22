import TrolleyDialog from "./TrolleyDialog"
import useAutoStore from "@/store/useAutoStore"
import { Select } from "@/components/ui/select"

export default function Header() {
  const { lang, setLang, Trolley, cars } = useAutoStore()

  const TrolleyItems = cars.filter((car) => Trolley[car.id])
  const totalPrice = TrolleyItems.reduce(
    (acc, car) => acc + car.price * Trolley[car.id],
    0
  )

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-50">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store-icon lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
      <h1 className="text-2xl font-bold">mini store cars</h1>

      <div className="flex items-center gap-4">
        <Select
          value={lang}
          onChange={setLang}
          options={[
            { value: "uz", label: "UZ" },
            { value: "ru", label: "RU" },
            { value: "en", label: "EN" },
          ]}
          placeholder="Tilni tanlang"
        />
        <TrolleyDialog />

        <span className="text-sm font-medium text-green-700">
          ${totalPrice}
        </span>
      </div>
    </header>
  )
}
