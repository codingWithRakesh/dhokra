import { create } from "zustand";
import axios from "axios";

const videoStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    addVideo: async (video) => {
         set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/video/add`,
                video,
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
    deleteVideo: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/video/delete/${videoId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to delete video" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    allVideos: [],
    setAllVideos: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/video/getAll`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allVideos: response.data.data });
            } else {
                set({ error: "Failed to fetch videos" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    videoById: null,
    setVideoById: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/video/getById/${videoId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, videoById: response.data.data });
            } else {
                set({ error: "Failed to fetch video" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },

}));

export default videoStore;