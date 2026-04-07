import { create } from 'zustand';
import { Category, CategoriesAPI } from '../lib/api';

interface CategoryStore {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,
    fetchCategories: async () => {
        set({ isLoading: true, error: null });

        try {
        const response = await CategoriesAPI.getCategories();
        set({ categories: response.data });
        } catch {

        set({ error: 'Failed to fetch categories' });
        } finally {
        set({ isLoading: false });
        }
    },
    createCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
        const response = await CategoriesAPI.createCategory(category);
        set({ categories: [...get().categories, response.data] });
        } catch {
        set({ error: 'Failed to create category' });
        } finally {
        set({ isLoading: false });
        }
    },
    updateCategory: async (id, category) => {
        set({ isLoading: true, error: null });
        try {
        const response = await CategoriesAPI.updateCategory(id, category);
        set({
            categories: get().categories.map((c) => (c.id === id ? response.data : c)),
        });
        } catch  {
        set({ error: 'Failed to update category' });
        } finally {
        set({ isLoading: false });
        }
    },
    deleteCategory: async (id) => {
        set({ isLoading: true, error: null });
        try {
        await CategoriesAPI.deleteCategory(id);
        set({ categories: get().categories.filter((c) => c.id !== id) });
        } catch  {
        set({ error: 'Failed to delete category' });
        } finally {
        set({ isLoading: false });
        }
    },
}));
