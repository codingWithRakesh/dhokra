import { create } from "zustand";
import axios from "axios";

const giftStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    allgift: [],
    setAllGift: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/gift/getAll`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allTrending: response.data.data });
            } else {
                set({ error: "Failed to fetch trending products" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
}));

export default giftStore;