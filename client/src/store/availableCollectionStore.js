import { create } from "zustand";
import axios from "axios";

const availableCollectionStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    addToAvailableCollection: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/availablecollections/add`,
                { productId },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to add product to available collection" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    allAvailableCollection: [],
    setAllAvailableCollection: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/availablecollections/getAll`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allAvailableCollection: response.data.data });
            } else {
                set({ error: "Failed to fetch available collection" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    countAvailableCollection: 0,
    setCountAvailableCollection: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/availablecollections/getCount`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, countAvailableCollection: response.data.data });
            } else {
                set({ error: "Failed to fetch available collection count" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    removeFromAvailableCollection: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/availablecollections/remove/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to remove product from available collection" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
}));

export default availableCollectionStore;