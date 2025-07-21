import toast from "react-hot-toast";
import { create } from "zustand";

const urls = {
  uz: "https://json-api.uz/api/project/fn38-6-exam/uz",
  ru: "https://json-api.uz/api/project/fn38-6-exam/ru",
  en: "https://json-api.uz/api/project/fn38-6-exam/en",
};

const useCarStore = create((set, get) => ({
  lang: "uz",
  cars: [],
  Trolley: {},
  error: false,
  loading: false,

  fetchCars: () => {
    const lang = get().lang;

    set({ loading: true, error: null });

    fetch(urls[lang])
      .then((res) => res.json())
      .then((data) => {
        set({ cars: data.data });
      })
      .catch((err) => {
        set({ error: err.message });
        toast.error("404: " + err.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  setLang: (lang) => {
    set({ lang });
    toast.success("til o'zgartirildi: " + lang);
    get().fetchCars();
  },

  addToTrolley: (id) => {
    const Trolley = { ...get().Trolley };
    Trolley[id] = 1;
    set({ Trolley });
    toast.success("Korzinaga qo'shildi");
  },

  increment: (id) => {
    const Trolley = { ...get().Trolley };
    Trolley[id]++;
    set({ Trolley });
  },

  decrement: (id) => {
    const Trolley = { ...get().Trolley };
    Trolley[id]--;
    if (Trolley[id] <= 0) {
      delete Trolley[id];
      toast("Olib tashlandi");
    }
    set({ Trolley });
  },

  removeFromTrolley: (id) => {
    const Trolley = { ...get().Trolley };
    delete Trolley[id];
    set({ Trolley });
    toast("Olib tashlandi");
  },

  clearTrolley: () => {
    set({ Trolley: {} });
    toast("Korzina tozalandi");
  },
}));

export default useCarStore;