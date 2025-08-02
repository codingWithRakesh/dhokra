import { create } from "zustand";
import axios from "axios";

const productStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    addProduct: async (productData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/products/create`,
                productData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to add product" });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    allProducts: [],
    setAllProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getAllProducts`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allProducts: response.data.data });
            } else {
                set({ error: "Failed to fetch products" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    productById: null,
    setProductById: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getProductById/${productId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, productById: response.data.data });
            } else {
                set({ error: "Failed to fetch product by ID" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    productByName: null,
    setProductByName: async (productName) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getProductByName/${productName}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, productByName: response.data.data });
            } else {
                set({ error: "Failed to fetch product by name" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    availableProductByName: null,
    setAvailableProductByName: async (productName) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getAvailableProductByName/${productName}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, availableProductByName: response.data.data });
            } else {
                set({ error: "Failed to fetch available product by name" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    productByCategory: [],
    setProductByCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getProductsByCategory/${category}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, productByCategory: response.data.data });
            } else {
                set({ error: "Failed to fetch products by category" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    availableProductByCategory: [],
    setAvailableProductByCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getAvailableProductsByCategory/${category}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, availableProductByCategory: response.data.data });
            } else {
                set({ error: "Failed to fetch available products by category" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    updateProduct: async (productId, productData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/products/update/${productId}`,
                productData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to update product" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    toogleInStock: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/products/toggleAvailability/${productId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, message: response.data.message });
            } else {
                set({ error: "Failed to toggle product in stock status" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    totalProductCount: 0,
    setTotalProductCount: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getTotalProductsCount`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, totalProductCount: response.data.data });
            } else {
                set({ error: "Failed to fetch total product count" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    productCountCategory: {},
    setProductCountCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getProductCountByCategory/${category}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set((state) => ({
                    isLoading: false,
                    productCountCategory: {
                        ...state.productCountCategory,
                        [category]: response.data.data.count
                    }
                }));
            } else {
                set({ error: "Failed to fetch product count by category" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    },
    deleteProductImage: async (productId, imageUrl) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/products/deleteImage/${productId}`,
                {
                    data: { imageUrl },
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                return response.data; // Return the updated product
            } else {
                throw new Error("Failed to delete image");
            }
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || error.message
            });
            throw error;
        }
    },
    deleteProduct: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/products/delete/${productId}`,
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
                set({ error: "Failed to fetch total product count" });
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw error;
        }
    }
}));

export default productStore;