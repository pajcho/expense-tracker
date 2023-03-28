import { ExpenseItem } from '@/models/expenseItem';

export interface ExpenseCategory {
  id: string;
  name: string;
  projected: number;
  expenses: ExpenseItem[];
}
