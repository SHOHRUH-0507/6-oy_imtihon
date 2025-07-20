import { create } from "zustand";
import toast from "react-hot-toast";

const urls = {
  uz: "https://json-api.uz/api/project/fn38-6-exam/uz",
  ru: "https://json-api.uz/api/project/fn38-6-exam/ru",
  en: "https://json-api.uz/api/project/fn38-6-exam/en",
};

const useCarStore = create((set, get) => ({
  lang: "uz",
  cars: [],
  cart: {},
  loading: false,
  error: false,

  setLang: (lang) => {
    set({ lang });
    toast.success("Til o'zgartirildi: " + lang);
    get().fetchCars();
  },

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
        toast.error("Xatolik: " + err.message);
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  addToCart: (id) => {
    const cart = { ...get().cart };
    cart[id] = 1;
    set({ cart });
    toast.success("Savatga qo'shildi");
  },

  increment: (id) => {
    const cart = { ...get().cart };
    cart[id]++;
    set({ cart });
  },

  decrement: (id) => {
    const cart = { ...get().cart };
    cart[id]--;
    if (cart[id] <= 0) {
      delete cart[id];
      toast("Olib tashlandi");
    }
    set({ cart });
  },

  removeFromCart: (id) => {
    const cart = { ...get().cart };
    delete cart[id];
    set({ cart });
    toast("Olib tashlandi");
  },

  clearCart: () => {
    set({ cart: {} });
    toast("Savat tozalandi");
  },
}));

export default useCarStore;