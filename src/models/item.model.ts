export interface ItemModel {
  id: number;
  name: string;
  description: string | null;
  amount: number;
  categoryId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}
