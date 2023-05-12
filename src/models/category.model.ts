import { ItemModel } from '@/models/item.model';

export interface CategoryModel {
  id: number;
  name: string;
  description: string | null;
  // projected: number; // Might add this in the future
  expenses: ItemModel[];
  createdAt: string;
  updatedAt: string;
}
