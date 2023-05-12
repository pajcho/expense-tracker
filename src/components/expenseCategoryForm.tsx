import { ExpenseTableForm } from '@/components/expenseTableForm';
import React from 'react';

export function ExpenseCategoryForm() {
  return (
    <ExpenseTableForm placeholder="Enter category name..." type="category">
      New category
    </ExpenseTableForm>
  );
}
