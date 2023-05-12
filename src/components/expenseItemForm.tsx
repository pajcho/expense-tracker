import React, { PropsWithChildren } from 'react';
import { ExpenseTableForm } from '@/components/expenseTableForm';
import { CategoryModel } from '@/models/category.model';

export function ExpenseItemForm({ name, id }: PropsWithChildren<CategoryModel>) {
  return (
    <ExpenseTableForm placeholder="Expense name..." type="expense" categoryId={id}>
      New expense in {name}
    </ExpenseTableForm>
  );
}
