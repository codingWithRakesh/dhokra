import { create } from "zustand";
import axios from "axios";

const fixImageStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    addInFixImage: async (image) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/fiximage/add`,
                image,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to add image to gallery" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    deleteFixImage: async (imageId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/fiximage/delete/${imageId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to delete image from gallery" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    allFixImages: [],
    setAllFixImages: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/fiximage/getAll`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allFixImages: response.data.data });
            } else {
                set({ error: "Failed to fetch images from gallery" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    currentImage: null,
    setCurrentImage: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/fiximage/getCurrent`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false, currentImage: response.data.data });
            } else {
                set({ error: "Failed to fetch current image" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    setDisplayImage: async (imageId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/fiximage/setDisplay/${imageId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to set display image" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    }
}));

export default fixImageStore;