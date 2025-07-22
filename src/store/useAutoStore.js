import { create } from "zustand";
import toast from "react-hot-toast";

const API_URLS = {
  uz: "https://json-api.uz/api/project/fn38-6-exam/uz",
  ru: "https://json-api.uz/api/project/fn38-6-exam/ru",
  en: "https://json-api.uz/api/project/fn38-6-exam/en",
};

const useAutoStore = create((set, get) => ({
  lang: "uz",
  cars: [],
  Trolley: {},
  loading: false,
  error: null,

  setLang(lang) {
    set({ lang });
    toast.success(`Til o'zgardi: ${lang}`);
    get().fetchCars();
  },

  async fetchCars() {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API_URLS[get().lang]);
      const data = await res.json();
      set({ cars: data.data });
    } catch (err) {
      toast.error("Xatolik: " + err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addToTrolley(id) {
    set(state => ({
      Trolley: { ...state.Trolley, [id]: 1 }
    }));
    toast.success("Korzinga qo'shildi");
  },

  increment(id) {
    set(state => ({
      Trolley: { ...state.Trolley, [id]: (state.Trolley[id] || 0) + 1 }
    }));
  },

  decrement(id) {
    set(state => {
      const cart = { ...state.Trolley };
      if (cart[id] > 1) cart[id]--;
      else delete cart[id];
      return { Trolley: cart };
    });
    toast("Olib tashlandi");
  },

  removeFromTrolley(id) {
    set(state => {
      const cart = { ...state.Trolley };
      delete cart[id];
      return { Trolley: cart };
    });
    toast("Olib tashlandi");
  },

  clearTrolley() {
    set({ Trolley: {} });
    toast("Korzina tozalandi");
  }
}));

export default useAutoStore;
