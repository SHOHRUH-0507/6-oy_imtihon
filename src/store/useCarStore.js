import { create } from "zustand";
import toast from "react-hot-toast";

const API_BASE = "https://json-api.uz/api/project/fn38-6-exam";

const useCarStore = create((set, get) => {
  const initialState = {
    lang: "uz",
    cars: [],
    Trolley: {},
    loading: false,
    error: null,
  };

  const getUrl = () => `${API_BASE}/${get().lang}`;

  return {
    ...initialState,

    setLang: (lang) => {
      set({ lang }, false, "SET_LANG");
      toast.success(`Til o'zgartirildi: ${lang}`);
      get().fetchCars();
    },

    fetchCars: async () => {
      set({ loading: true, error: null }, false, "FETCH_CARS_START");

      try {
        const res = await fetch(getUrl());
        if (!res.ok) throw new Error("Ma'lumotlar olinmadi");

        const data = await res.json();
        set({ cars: data.data }, false, "FETCH_CARS_SUCCESS");
      } catch (err) {
        set({ error: err.message }, false, "FETCH_CARS_ERROR");
        toast.error("Xatolik: " + err.message);
      } finally {
        set({ loading: false }, false, "FETCH_CARS_END");
      }
    },

    addToTrolley: (id) => {
      set((state) => ({
        Trolley: { ...state.Trolley, [id]: 1 },
      }), false, "ADD_TO_TROLLEY");

      toast.success("Korzinga qo'shildi");
    },

    increment: (id) => {
      set((state) => ({
        Trolley: {
          ...state.Trolley,
          [id]: (state.Trolley[id] || 0) + 1,
        },
      }), false, "INCREMENT_TROLLEY");
    },

    decrement: (id) => {
      set((state) => {
        const updated = { ...state.Trolley };
        if (updated[id] > 1) {
          updated[id]--;
        } else {
          delete updated[id];
          toast("Olib tashlandi");
        }
        return { Trolley: updated };
      }, false, "DECREMENT_TROLLEY");
    },

    removeFromTrolley: (id) => {
      set((state) => {
        const updated = { ...state.Trolley };
        delete updated[id];
        return { Trolley: updated };
      }, false, "REMOVE_FROM_TROLLEY");

      toast("Olib tashlandi");
    },

    clearTrolley: () => {
      set({ Trolley: {} }, false, "CLEAR_TROLLEY");
      toast("Korzina tozalandi");
    },
  };
});

export default useCarStore;
