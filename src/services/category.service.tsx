import axios from 'axios';
import toast from 'react-hot-toast';
import queryString from 'query-string';
import { ItemModel } from '@/models/item.model';
import { CategoryModel } from '@/models/category.model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface FilterMap {
  [key: string]: string | string[] | undefined;
}

export const fetchCategories = async (filters?: FilterMap): Promise<CategoryModel[]> => {
  const res = await axios.get('api/category', {
    params: filters,
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: 'none' }),
  });

  return res.data;
};

export const useFetchCategories = (filters?: FilterMap) => {
  return useQuery({
    queryKey: ['categories', filters],
    queryFn: () => fetchCategories(filters),
  });
};

export const upsertCategory = async (category: Partial<CategoryModel>): Promise<CategoryModel[]> => {
  const res = await axios.post(`/api/category`, {
    id: category.id || undefined,
    name: category.name || undefined,
    description: category.description || undefined,
  });
  return res.data;
};

export const useUpsertCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Partial<CategoryModel>) => upsertCategory(category),
    onError: () => {
      toast.error('Error saving expense category.');
    },
    onSuccess: () => {
      toast.success('Expense category successfully saved.');
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['categories']);
    },
  });
};

export const upsertExpense = async (expense: Partial<ItemModel>): Promise<ItemModel[]> => {
  const res = await axios.post(`/api/expense`, {
    id: expense.id || undefined,
    name: expense.name || undefined,
    description: expense.description || undefined,
    categoryId: expense.categoryId || undefined,
    amount: expense.amount,
    date: expense.date,
  });
  return res.data;
};

export const useUpsertExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expense: Partial<ItemModel>) => upsertExpense(expense),
    onError: () => {
      toast.error('Error saving expense.');
    },
    onSuccess: () => {
      toast.success('Expense successfully saved.');
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['categories']);
    },
  });
};
