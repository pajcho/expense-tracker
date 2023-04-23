import { ItemModel } from '@/models/item.model';

export interface CategoryModel {
  id: string;
  name: string;
  projected: number;
  expenses: ItemModel[];
}
