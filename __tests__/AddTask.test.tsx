import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AddTaskScreen from '@/app/tasks/add';
import { useTaskStore } from '@/stores/taskStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { router } from 'expo-router';

// Mock des stores
jest.mock('@/stores/taskStore');
jest.mock('@/stores/categoryStore');
jest.mock('expo-router');

describe('AddTaskScreen', () => {
  const mockCategories = [
    { id: '1', title: 'Work', description: 'Work tasks', createdAt: '2026-01-01' },
    { id: '2', title: 'Personal', description: 'Personal tasks', createdAt: '2026-01-01' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le formulaire d\'ajout de tâche', () => {
    useTaskStore.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: null,
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    });

    useCategoryStore.mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      fetchCategories: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<AddTaskScreen />);

    expect(getByText('Ajouter une tâche')).toBeTruthy();
    expect(getByPlaceholderText('Entrez le titre de la tâche')).toBeTruthy();
    expect(getByPlaceholderText('Entrez la description de la tâche')).toBeTruthy();
  });

  it('crée une tâche avec les données du formulaire', async () => {
    const mockCreateTask = jest.fn();
    useTaskStore.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: null,
      createTask: mockCreateTask,
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    });

    useCategoryStore.mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      fetchCategories: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(<AddTaskScreen />);

    const titleInput = getByPlaceholderText('Entrez le titre de la tâche');
    const descriptionInput = getByPlaceholderText('Entrez la description de la tâche');

    fireEvent.changeText(titleInput, 'Nouvelle tâche');
    fireEvent.changeText(descriptionInput, 'Description de la tâche');

    fireEvent.press(getByText('Ajouter'));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'Nouvelle tâche',
        description: 'Description de la tâche',
        color: '',
        category: '',
        dueDate: '',
        completed: false,
      });
    });

    expect(router.back).toHaveBeenCalled();
  });

  it('retour en arrière quand l\'utilisateur clique sur Retour', () => {
    useTaskStore.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: null,
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    });

    useCategoryStore.mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      fetchCategories: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    });

    const { getByText } = render(<AddTaskScreen />);

    fireEvent.press(getByText('Retour'));

    expect(router.back).toHaveBeenCalled();
  });

  it('affiche les catégories disponibles dans le sélecteur', () => {
    useTaskStore.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: null,
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    });

    useCategoryStore.mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      fetchCategories: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    });

    const { getByText } = render(<AddTaskScreen />);

    fireEvent.press(getByText('Sélectionnez une catégorie'));

    expect(getByText('Work')).toBeTruthy();
    expect(getByText('Personal')).toBeTruthy();
  });

  it('sélectionne une catégorie et ferme le picker', () => {
    useTaskStore.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: null,
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    });

    useCategoryStore.mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      fetchCategories: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    });

    const { getByText, queryByText } = render(<AddTaskScreen />);

    // Ouvre le picker de catégorie
    fireEvent.press(getByText('Sélectionnez une catégorie'));

    // Sélectionne une catégorie
    fireEvent.press(getByText('Work'));

    // Vérifie que le bouton affiche maintenant "Work"
    expect(getByText('Work')).toBeTruthy();
  });
});
