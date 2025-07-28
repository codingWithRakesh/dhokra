import { create } from "zustand";
import axios from "axios";

const gallaryStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    addImageToGallery: async (image) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/gallery/add`,
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
    allGalleryImages: [],
    setAllGalleryImages: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/gallery/getAll`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allGalleryImages: response.data.data });
            } else {
                set({ error: "Failed to fetch gallery images" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    deleteImageFromGallery: async (imageId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/gallery/delete/${imageId}`,
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
    imageGetById: null,
    setImageGetById : async (imageId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/gallery/getById/${imageId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, image: response.data.data });
            } else {
                set({ error: "Failed to fetch image by ID" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    }
}));

export default gallaryStore;