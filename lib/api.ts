import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: string;
  title: string;
  description: string;
  color: string;
  category: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const TasksAPI = {
  getTasks: () => api.get<Task[]>('/tasks'),
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Task>('/tasks', task),
  updateTask: (id: string, task: Partial<Task>) => 
    api.patch<Task>(`/tasks/${id}`, task),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};

export const CategoriesAPI = {
  getCategories: () => api.get<Category[]>('/categories'),
  createCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Category>('/categories', category),
  updateCategory: (id: string, category: Partial<Category>) => 
    api.patch<Category>(`/categories/${id}`, category),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};

export default api;