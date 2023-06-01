import React, { PropsWithChildren } from 'react';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryModel } from '@/models/category.model';
import { ItemModel } from '@/models/item.model';

// Use higher number to demonstrate how app will behave on a slow network
const FAKE_API_DELAY = 0;

export type CategoryContextType = {
  categories: CategoryModel[];
  addCategory: UseMutationResult<Response, unknown, Partial<CategoryModel>>;
  addExpense: UseMutationResult<Response, unknown, Partial<ItemModel>>;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
};
export const CategoryContext = React.createContext<CategoryContextType | null>(null);

function CategoryProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      return new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY)).then(async () => {
        const response = await fetch(`/api/category`);

        if (response.status !== 200) {
          throw new Error('Error loading expenses!');
        }

        return response.json();
      });
    },
  });

  const addCategory = useMutation({
    mutationFn: async (category: Partial<CategoryModel>) => {
      return new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY)).then(async () => {
        const response = await fetch(`/api/category`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: category.id || undefined,
            name: category.name || undefined,
            description: category.description || undefined,
          }),
        });

        if (response.status !== 200) {
          throw new Error('Error creating new expense category!');
        }

        return response;
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['category'] }),
  });

  const addExpense = useMutation({
    mutationFn: async (expense: Partial<ItemModel>) => {
      return new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY)).then(async () => {
        const response = await fetch(`/api/expense`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: expense.name || undefined,
            description: expense.description || undefined,
            categoryId: expense.categoryId || undefined,
            amount: expense.amount,
            date: expense.date,
          }),
        });

        if (response.status !== 200) {
          throw new Error('Error creating new expense!');
        }

        return response;
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['category'] }),
  });

  const isLoading = status === 'loading';

  return (
    <CategoryContext.Provider value={{ categories: data, addCategory, addExpense, isLoading, error, isFetching }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
