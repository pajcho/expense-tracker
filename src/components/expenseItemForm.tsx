import React, { PropsWithChildren } from 'react';
import { ExpenseTableForm } from '@/components/expenseTableForm';
import { CategoryModel } from '@/models/category.model';

export function ExpenseItemForm({ name }: PropsWithChildren<CategoryModel>) {
  return (
    <ExpenseTableForm placeholder="Expense name..." type="expense">
      New expense in {name}
    </ExpenseTableForm>
  );
}
